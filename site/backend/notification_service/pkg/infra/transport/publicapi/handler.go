package publicapi

import (
	"backend/notification_service/pkg/app/model"
	"backend/notification_service/pkg/app/service"
	"backend/task_service/pkg/infrastructure/middleware/auth"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"time"
)

const (
	writeWait  = 10 * time.Second
	pongWait   = 60 * time.Second
	pingPeriod = (pongWait * 9) / 10
)

type Handler struct {
	service service.NotificationServiceInterface
}

func NewHandler(service service.NotificationServiceInterface) *Handler {
	return &Handler{
		service: service,
	}
}

type Client struct {
	ClientID uint64
	Conn     *websocket.Conn
	send     chan model.Notification
}

func NewClient(clientID uint64, conn *websocket.Conn) *Client {
	return &Client{ClientID: clientID, Conn: conn, send: make(chan model.Notification, 256)}
}

func (c *Client) Read() {
	defer func() {
		c.Conn.Close()
	}()

	c.Conn.SetReadDeadline(time.Now().Add(pongWait))
	c.Conn.SetPongHandler(func(string) error { c.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		var msg model.Notification
		err := c.Conn.ReadJSON(&msg)
		if err != nil {
			fmt.Println("Ошибка чтения:", err)
			break
		}
		c.send <- msg
	}
}

func (c *Client) Write() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			err := c.Conn.WriteJSON(message)
			if err != nil {
				fmt.Println("Ошибка отправки:", err)
				return
			}
		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (h *Handler) Init(jwtSecret string) *gin.Engine {
	router := gin.New()

	router.Use(cors.Default())
	router.Use(auth.UserIdentity(jwtSecret))
	router.GET("/notificationsws", func(ctx *gin.Context) {
		authID, err := auth.GetUserId(ctx)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		// при подлкючении нужно сделать выборку в бд
		//clientIDParam := ctx.Query("roomID")

		/*if clientIDParam == "" {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}*/

		/*clientID, err := strconv.ParseUint(clientIDParam, 10, 64)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		}*/

		ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			fmt.Println("Ошибка WebSocket:", err)
			return
		}

		client := NewClient(uint64(authID), ws)
		go client.Read()
		go client.Write()
	})

	return router
}
