package publicapi

import (
	_interface "backend/notification_service/pkg/app/interface"
	"context"
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"time"

	"backend/notification_service/pkg/app/model"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Client struct {
	ClientID uint64
	Conn     *websocket.Conn
	send     chan model.Notification
	puller   _interface.PullerInterface
}

func NewClient(clientID uint64, puller _interface.PullerInterface, conn *websocket.Conn) *Client {
	return &Client{
		ClientID: clientID,
		Conn:     conn,
		send:     make(chan model.Notification, 256),
		puller:   puller,
	}
}

func (c *Client) SendNotification(ctx context.Context, notification model.Notification) {
	c.send <- notification
}

func (c *Client) GetID() uint {
	return uint(c.ClientID)
}

func (c *Client) Read() {
	defer func() {
		c.puller.UnregisterClient(c)
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
		c.puller.RegisterClient(c)
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
