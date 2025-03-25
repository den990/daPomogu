package handler

import (
	"backend/chat/pkg/handler/hub"
	"backend/task_service/pkg/infrastructure/jwt"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type ChatHandler struct {
	service hub.ChatServiceInterface
}

func NewChatHandler(service hub.ChatServiceInterface) *ChatHandler {
	return &ChatHandler{
		service: service,
	}
}

func (h *ChatHandler) Init(secret string) *gin.Engine {
	router := gin.New()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
	}))

	wsHub := hub.NewHub(h.service)
	go wsHub.Run()

	router.GET("/ws", func(c *gin.Context) {
		token := c.Query("token")
		userId, err := jwt.ValidateToken(token, secret)
		if err != nil {
			fmt.Println(token, "-  token error:", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}
		roomIDParam := c.Query("roomID")

		if roomIDParam == "" {
			fmt.Println("room error:", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing room"})
			return
		}

		roomID, err := strconv.ParseUint(roomIDParam, 10, 64)
		if err != nil {
			fmt.Println("roomID error:", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		hub.ServeWS(c, uint(roomID), userId.UserID, wsHub)
	})

	return router
}
