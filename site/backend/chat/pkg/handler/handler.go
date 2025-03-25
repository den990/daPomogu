package handler

import (
	"backend/chat/pkg/handler/hub"
	"backend/chat/pkg/model"
	"backend/chat/pkg/paginate"
	"backend/task_service/pkg/infrastructure/jwt"
	"context"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type ChatServiceInterface interface {
	CreateChat(ctx context.Context, chat model.Chat) (model.Chat, error)
	CreateMessage(ctx context.Context, mess model.Message) (model.Message, error)
	ShowChats(ctx context.Context, userID uint, page, limit uint) (paginate.Pagination, error)
	ShowMessages(ctx context.Context, chatID uint, page, limit uint) (paginate.Pagination, error)
}

type ChatHandler struct {
	service ChatServiceInterface
}

func NewChatHandler(service ChatServiceInterface) *ChatHandler {
	return &ChatHandler{
		service: service,
	}
}

func (h *ChatHandler) Init() {
	router := gin.New()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
	}))

	wsHub := hub.NewHub()
	go wsHub.Run()

	router.GET("/ws", func(c *gin.Context) {
		token := c.Query("token")
		userId, err := jwt.ValidateToken(token, jwtSecret)
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
}
