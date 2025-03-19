package handler

import (
	"backend/client/cmd/handler/hub"
	approveservice "backend/client/pkg/app/approve/service"
	categoryquery "backend/client/pkg/app/category/query"
	categoryservice "backend/client/pkg/app/category/service"
	commentquery "backend/client/pkg/app/comment/query"
	commentservice "backend/client/pkg/app/comment/service"
	responsequery "backend/client/pkg/app/response/query"
	responseservice "backend/client/pkg/app/response/service"
	taskquery "backend/client/pkg/app/task/query"
	taskservice "backend/client/pkg/app/task/service"
	"backend/client/pkg/infrastructure/middleware/auth"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"strconv"
)

const (
	InvalidInputBodyErr = "invalid input body"
)

type Handler struct {
	responseQuery   responsequery.ResponseQueryInterface
	responseService responseservice.ResponseServiceInterface
	commentQuery    commentquery.CommentQueryInterface
	commentService  commentservice.CommentServiceInterface
	taskQuery       taskquery.TaskQueryInterface
	taskService     taskservice.TaskServiceInterface
	approveService  approveservice.ApproveServiceInterface
	categoryQuery   categoryquery.CategoryQueryInterface
	categoryService categoryservice.CategoryServiceInterface
}

func NewTaskHandler(
	responseQuery responsequery.ResponseQueryInterface,
	responseService responseservice.ResponseServiceInterface,
	commentQuery commentquery.CommentQueryInterface,
	commentService commentservice.CommentServiceInterface,
	taskQuery taskquery.TaskQueryInterface,
	taskService taskservice.TaskServiceInterface,
	approveService approveservice.ApproveServiceInterface,
	categoryQuery categoryquery.CategoryQueryInterface,
	categoryService categoryservice.CategoryServiceInterface,
) *Handler {
	return &Handler{
		responseQuery,
		responseService,
		commentQuery,
		commentService,
		taskQuery,
		taskService,
		approveService,
		categoryQuery,
		categoryService,
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func ServeWS(ctx *gin.Context, roomID, userID uint, h *hub.Hub) {
	ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		fmt.Println("Ошибка WebSocket:", err)
		return
	}
	client := hub.NewClient(roomID, userID, ws, h)
	h.RegisterClient(client)

	go client.Write()
	go client.Read()
}

func (h *Handler) Init(jwtSecret string) *gin.Engine {
	router := gin.New()

	router.Use(cors.Default())
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
	}))
	router.Use(auth.UserIdentity(jwtSecret))

	tasks := router.Group("/tasks")
	{
		tasks.GET("/", h.getTasks)
		tasks.GET("/:id", h.getTask)
		tasks.POST("/", h.createTask)
		tasks.PUT("/:id", h.updateTask)
		tasks.DELETE("/:id", h.deleteTask)
	}

	responses := router.Group("/responses")
	{
		responses.GET("/", h.getResponses)
		responses.POST("/", h.createResponse)
		responses.PUT("/:id", h.updateResponse)
	}

	categories := router.Group("/category")
	{
		categories.GET("/", h.getCategories)
		categories.GET("/search", h.searchCategoriesByName)
		categories.POST("/", h.createCategory)
		categories.PUT("/:id", h.updateCategory)
	}

	wsHub := hub.NewHub(h.commentService, h.commentQuery)
	go wsHub.Run()

	router.GET("/ws/:roomId/:userId", func(c *gin.Context) {
		roomIdStr := c.Param("roomId")
		userIdStr := c.Param("userId")

		roomId, err := strconv.ParseUint(roomIdStr, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid roomId"})
			return
		}

		userId, err := strconv.ParseUint(userIdStr, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid userId"})
			return
		}

		ServeWS(c, uint(roomId), uint(userId), wsHub)
	})

	return router
}
