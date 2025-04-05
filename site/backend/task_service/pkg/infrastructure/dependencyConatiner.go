package infrastructure

import (
	categorymodel "backend/task_service/pkg/app/category/model"
	categoryquery "backend/task_service/pkg/app/category/query"
	categoryservice "backend/task_service/pkg/app/category/service"
	"backend/task_service/pkg/app/file/model"
	notificationservice "backend/task_service/pkg/app/notification/service"
	responsemodel "backend/task_service/pkg/app/response/model"
	responsequery "backend/task_service/pkg/app/response/query"
	responseservice "backend/task_service/pkg/app/response/service"
	taskmodel "backend/task_service/pkg/app/task/model"
	taskquery "backend/task_service/pkg/app/task/query"
	taskservice "backend/task_service/pkg/app/task/service"
	"backend/task_service/pkg/infrastructure/transport/grpc"
	notificationclient "backend/task_service/pkg/infrastructure/transport/grpc"
	"gorm.io/gorm"

	organizationquery "backend/task_service/pkg/app/organization/query"

	commentmodel "backend/task_service/pkg/app/comment/model"
	commentquery "backend/task_service/pkg/app/comment/query"
	commentservice "backend/task_service/pkg/app/comment/service"
	userquery "backend/task_service/pkg/app/user/query"

	approvemodel "backend/task_service/pkg/app/approve/model"
	approveservice "backend/task_service/pkg/app/approve/service"

	"backend/task_service/pkg/infrastructure/config"
	"backend/task_service/pkg/infrastructure/postgres"
)

type Container struct {
	DB                 *gorm.DB
	taskReadRepository taskmodel.TaskReadRepositoryInterface
	taskRepository     taskmodel.TaskRepositoryInterface
	TaskQuery          taskquery.TaskQueryInterface
	TaskService        taskservice.TaskServiceInterface

	responseReadRepository responsemodel.ResponseRepositoryReadInterface
	responseRepository     responsemodel.ResponseRepositoryInterface
	ResponseQuery          responsequery.ResponseQueryInterface
	ResponseService        responseservice.ResponseServiceInterface

	commentReadRepository commentmodel.CommentReadRepositoryInterface
	commentRepository     commentmodel.CommentRepositoryInterface
	CommentQuery          commentquery.CommentQueryInterface
	CommentService        commentservice.CommentServiceInterface

	approveReadRepository approvemodel.ApproveRepositoryInterface
	ApproveService        approveservice.ApproveServiceInterface

	TaskUserReadRepository taskmodel.TaskUserReadRepositoryInterface
	TaskUserRepository     taskmodel.TaskUserRepositoryInterface
	TaskUserQuery          taskquery.TaskUserQueryInterface
	TaskUserService        taskservice.TaskUserServiceInterface

	TaskCategoryReadRepository taskmodel.TaskCategoryReadRepositoryInterface
	TaskCategoryRepository     taskmodel.TaskCategoryRepositoryInterface
	TaskCategoryQuery          taskquery.TaskCategoryQueryInterface
	TaskCategoryService        taskservice.TaskCategoryServiceInterface

	Client            grpc.ClientInterface
	UserQuery         userquery.UserQueryInterface
	OrganizationQuery organizationquery.OrganizationQueryInterface

	categoryRepository categorymodel.CategoryRepositoryInterface
	CategoryQuery      categoryquery.CategoryQueryInterface
	CategoryService    categoryservice.CategoryServiceInterface

	FileQuery model.FileModelRepositoryInterface
}

func NewContainer(config config.Config) *Container {
	db, err := postgres.NewPostgresGormDB(postgres.Config{
		Host:     config.DBConfig.Host,
		Port:     config.DBConfig.Port,
		Username: config.DBConfig.Username,
		Password: config.DBConfig.Password,
		DBName:   config.DBConfig.DBName,
		SSLMode:  config.DBConfig.SSLMode,
	})
	if err != nil {
		panic(err)
	}

	grpcClient, err := grpc.NewGrpcClient(config.Address)
	if err != nil {
		panic(err)
	}
	userQuery := userquery.NewUserQuery(grpcClient)

	organizationQuery := organizationquery.NewOrganization(grpcClient)

	notificationClient, err := notificationclient.NewNotificationServiceClient("notification-service:50501")
	if err != nil {
		panic(err)
	}

	notificationService := notificationservice.NewNotificationService(notificationClient)

	taskUserRepository := postgres.NewTaskUserPostgresRepository(db)
	taskUserQuery := taskquery.NewTaskUserQuery(taskUserRepository, userQuery)
	taskUserService := taskservice.NewTaskUserService(taskUserRepository)

	taskCategoryRepository := postgres.NewTaskCategoryPostgresRepository(db)
	taskCategoryQuery := taskquery.NewTaskCategoryQuery(taskCategoryRepository, grpcClient)
	taskCategoryService := taskservice.NewTaskCategoryService(taskCategoryRepository)

	taskRepository := postgres.NewTaskPostgresRepository(db)
	taskstatusRepo := postgres.NewTaskStatus(db)
	taskstatusService := taskquery.NewTaskStatusService(taskstatusRepo)
	taskQuery := taskquery.NewTaskQuery(taskRepository, organizationQuery, taskstatusService, *taskCategoryQuery, *taskUserQuery)
	taskService := taskservice.NewTaskService(taskRepository, organizationQuery, *userQuery, *taskUserQuery)

	responseRepository := postgres.NewResponsePostgresRepository(db)
	responseQuery := responsequery.NewResponseQuery(responseRepository, userQuery)
	responsestatusRepo := postgres.NewResponseStatusRepository(db)
	responseService := responseservice.NewResponseService(
		responseRepository,
		responsestatusRepo,
		taskUserQuery,
		responseQuery,
		taskQuery,
		taskUserService,
		notificationService,
	)

	commentResponse := postgres.NewCommentsRepository(db)
	commentQuery := commentquery.NewCommentQuery(commentResponse, *userQuery)
	commentService := commentservice.NewCommentService(commentResponse)

	approveRepository := postgres.NewApproveRepository(db)
	approveStatusRepository := postgres.NewApproveStatusRepository(db)

	fileRepo := postgres.NewFileRepository(db)

	approveFileRepo := postgres.NewApproveFileRepository(db)
	approveFileService := approveservice.NewApproveFileService(approveFileRepo)
	approveService := approveservice.NewApproveService(
		approveRepository,
		approveStatusRepository,
		userQuery,
		fileRepo,
		approveFileService,
		organizationQuery,
		taskQuery,
		taskUserQuery,
		notificationService,
	)

	categoryRepository := postgres.NewCategoryRepository(db)
	categoryQuery := categoryquery.NewCategoryQuery(categoryRepository)
	categoryService := categoryservice.NewCategoryService(categoryRepository)

	fileQuery := postgres.NewFileRepository(db)

	return &Container{
		DB:                 db,
		taskReadRepository: taskRepository,
		taskRepository:     taskRepository,
		TaskQuery:          taskQuery,
		TaskService:        taskService,

		responseReadRepository: responseRepository,
		responseRepository:     responseRepository,
		ResponseQuery:          responseQuery,
		ResponseService:        responseService,

		commentReadRepository: commentResponse,
		commentRepository:     commentResponse,
		CommentQuery:          commentQuery,
		CommentService:        commentService,

		approveReadRepository: approveRepository,
		ApproveService:        approveService,

		TaskUserReadRepository: taskUserRepository,
		TaskUserRepository:     taskUserRepository,
		TaskUserQuery:          taskUserQuery,
		TaskUserService:        taskUserService,

		TaskCategoryReadRepository: taskCategoryRepository,
		TaskCategoryRepository:     taskCategoryRepository,
		TaskCategoryQuery:          taskCategoryQuery,
		TaskCategoryService:        taskCategoryService,

		Client:            grpcClient,
		UserQuery:         userQuery,
		OrganizationQuery: organizationQuery,

		categoryRepository: categoryRepository,
		CategoryQuery:      categoryQuery,
		CategoryService:    categoryService,

		FileQuery: fileQuery,
	}
}
