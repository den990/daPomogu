package handler

import (
	approveservice "backend/task_service/pkg/app/approve/service"
	categoryquery "backend/task_service/pkg/app/category/query"
	categoryservice "backend/task_service/pkg/app/category/service"
	commentquery "backend/task_service/pkg/app/comment/query"
	commentservice "backend/task_service/pkg/app/comment/service"
	organizationquery "backend/task_service/pkg/app/organization/query"
	responsequery "backend/task_service/pkg/app/response/query"
	responseservice "backend/task_service/pkg/app/response/service"
	taskquery "backend/task_service/pkg/app/task/query"
	taskservice "backend/task_service/pkg/app/task/service"
	"backend/task_service/pkg/infrastructure/middleware/auth"
	"backend/task_service/pkg/infrastructure/transport/handler/hub"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

const (
	InvalidInputBodyErr = "invalid input body"
)

type Handler struct {
	responseQuery       responsequery.ResponseQueryInterface
	responseService     responseservice.ResponseServiceInterface
	commentQuery        commentquery.CommentQueryInterface
	commentService      commentservice.CommentServiceInterface
	taskQuery           taskquery.TaskQueryInterface
	taskService         taskservice.TaskServiceInterface
	approveService      approveservice.ApproveServiceInterface
	categoryQuery       categoryquery.CategoryQueryInterface
	categoryService     categoryservice.CategoryServiceInterface
	taskuserService     taskservice.TaskUserServiceInterface
	taskuserQuery       taskquery.TaskUserQueryInterface
	taskcategoryService taskservice.TaskCategoryServiceInterface
	taskcategoryQuery   taskquery.TaskCategoryQueryInterface
	organizationQuery   organizationquery.OrganizationQueryInterface
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
	taskuserService taskservice.TaskUserServiceInterface,
	takuserQuery taskquery.TaskUserQueryInterface,
	taskcategoryService taskservice.TaskCategoryServiceInterface,
	taskcategoryQuery taskquery.TaskCategoryQueryInterface,
	organizationquery organizationquery.OrganizationQueryInterface,
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
		taskuserService,
		takuserQuery,
		taskcategoryService,
		taskcategoryQuery,
		organizationquery,
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

	httphands := router.Group("/api")
	{
		httphands.Use(auth.UserIdentity(jwtSecret))
		httphands.Static("/uploads", "./uploads")

		tasksUsers := httphands.Group("/tasks-users")
		{
			tasksUsers.GET("/byTaskID/:id", h.getTasksUsers)
			tasksUsers.POST("/add/:id", h.addTasksUsers)
			tasksUsers.DELETE("/delete", h.deleteTasksUsers)
		}

		tasks := httphands.Group("/tasks")
		{
			tasks.GET("/page/:page", h.getTasks)
			tasks.GET("/myOpenedTasks", h.getOpenedTasks)
			tasks.GET("/myClosedTasks", h.getClosedTasks)
			tasks.GET("/:id", h.getTask)
			tasks.POST("/", h.createTask)
			tasks.PUT("/:id", h.updateTask)
			tasks.DELETE("/:id", h.deleteTask)
			tasks.PUT("/complete/:id", h.completeTask)
		}

		responses := httphands.Group("/responses")
		{
			responses.GET("/all", h.getResponses)
			responses.POST("/create", h.createResponse)
			responses.PUT("/reject", h.rejectResponse)
			responses.PUT("/confirm", h.confirmResponse)
		}

		categories := httphands.Group("/category")
		{
			categories.GET("/", h.getCategories)
			categories.GET("/search", h.searchCategoriesByName)
			categories.POST("/", h.createCategory)
			categories.PUT("/:id", h.updateCategory)
		}

		approves := httphands.Group("/approves")
		{
			approves.GET("/allByTaskID/:id", h.getAllByTaskID)
			approves.POST("/create", h.addApproves)
			approves.PUT("/reject", h.rejectApproves)
			approves.PUT("/confirm", h.confirmApproves)
		}
	}

	wsHub := hub.NewHub(h.commentService, h.commentQuery)
	go wsHub.Run()

	router.GET("/ws", func(c *gin.Context) {
		roomIDParam := c.Query("roomID")

		if roomIDParam == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}

		roomID, err := strconv.ParseUint(roomIDParam, 10, 64)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		}

		hub.ServeWS(c, uint(roomID), wsHub)
	})

	return router
}
