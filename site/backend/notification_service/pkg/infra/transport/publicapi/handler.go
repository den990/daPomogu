package publicapi

import (
	_interface "backend/notification_service/pkg/app/interface"
	"backend/task_service/pkg/infrastructure/jwt"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"

	"backend/notification_service/pkg/app/service"
)

const (
	writeWait  = 10 * time.Second
	pongWait   = 60 * time.Second
	pingPeriod = (pongWait * 9) / 10
)

type Handler struct {
	service service.NotificationServiceInterface
	puller  _interface.PullerInterface
}

func NewHandler(service service.NotificationServiceInterface, puller _interface.PullerInterface) *Handler {
	return &Handler{
		service: service,
		puller:  puller,
	}
}

func (h *Handler) Init(jwtSecret string) *gin.Engine {
	router := gin.New()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
	}))
	router.GET("/get", func(c *gin.Context) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
	})
	//router.Use(auth.UserIdentity(jwtSecret))
	router.GET("/notificationsws", func(ctx *gin.Context) {
		/*authID, err := auth.GetUserId(ctx)
		if err != nil {
			fmt.Println("Ошибка WebSocket:", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}*/
		// todo: при подключении нужно сделать выборку в бд
		fmt.Println("notificationsws")
		token := ctx.Query("token")
		userId, err := jwt.ValidateToken(token, jwtSecret)
		if err != nil {
			fmt.Println(token, "-  token error:", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}
		ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			fmt.Println("Ошибка WebSocket:", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		client := NewClient(uint64(userId.UserID), h.puller, ws)

		h.puller.RegisterClient(client)

		go client.Read()
		go client.Write()
	})

	return router
}
