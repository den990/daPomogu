package publicapi

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"

	"backend/notification_service/pkg/app/service"
	"backend/task_service/pkg/infrastructure/middleware/auth"
)

const (
	writeWait  = 10 * time.Second
	pongWait   = 60 * time.Second
	pingPeriod = (pongWait * 9) / 10
)

type Handler struct {
	service service.NotificationServiceInterface
	puller  service.PullerInterface
}

func NewHandler(service service.NotificationServiceInterface, puller service.PullerInterface) *Handler {
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
	router.Use(auth.UserIdentity(jwtSecret))
	router.GET("/notificationsws", func(ctx *gin.Context) {
		authID, err := auth.GetUserId(ctx)
		if err != nil {
			fmt.Println("Ошибка WebSocket:", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		// todo: при подключении нужно сделать выборку в бд

		ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
		if err != nil {
			fmt.Println("Ошибка WebSocket:", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		client := NewClient(uint64(authID), h.puller, ws)

		h.puller.RegisterClient(client)

		go client.Read()
		go client.Write()
	})

	return router
}
