package infrastructure

import (
	categorymodel "backend/client/pkg/app/category/model"
	categoryquery "backend/client/pkg/app/category/query"
	categoryservice "backend/client/pkg/app/category/service"
	responsemodel "backend/client/pkg/app/response/model"
	responsequery "backend/client/pkg/app/response/query"
	responseservice "backend/client/pkg/app/response/service"
	"backend/client/pkg/infrastructure/transport/grpc"

	taskmodel "backend/client/pkg/app/task/model"
	taskquery "backend/client/pkg/app/task/query"
	taskservice "backend/client/pkg/app/task/service"

	organizationquery "backend/client/pkg/app/organization/query"

	commentmodel "backend/client/pkg/app/comment/model"
	commentquery "backend/client/pkg/app/comment/query"
	commentservice "backend/client/pkg/app/comment/service"
	userquery "backend/client/pkg/app/user/query"

	approvemodel "backend/client/pkg/app/approve/model"
	approveservice "backend/client/pkg/app/approve/service"

	"backend/client/pkg/infrastructure/config"
	"backend/client/pkg/infrastructure/postgres"
)

type Container struct {
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

	Client            grpc.ClientInterface
	UserQuery         userquery.UserQueryInterface
	OrganizationQuery organizationquery.OrganizationQueryInterface

	categoryRepository categorymodel.CategoryRepositoryInterface
	CategoryQuery      categoryquery.CategoryQueryInterface
	CategoryService    categoryservice.CategoryServiceInterface
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

	responseRepository := postgres.NewResponsePostgresRepository(db)
	responseQuery := responsequery.NewResponseQuery(responseRepository)
	responseService := responseservice.NewResponseService(responseRepository)

	commentResponse := postgres.NewCommentsRepository(db)
	commentQuery := commentquery.NewCommentQuery(commentResponse)
	commentService := commentservice.NewCommentService(commentResponse)

	approveRepository := postgres.NewApproveRepository(db)
	approveService := approveservice.NewApproveService(approveRepository)

	categoryRepository := postgres.NewCategoryRepository(db)
	categoryQuery := categoryquery.NewCategoryQuery(categoryRepository)
	categoryService := categoryservice.NewCategoryService(categoryRepository)

	grpcClient, err := grpc.NewGrpcClient(config.Address)
	if err != nil {
		panic(err)
	}

	organizationQuery := organizationquery.NewOrganization(grpcClient)

	taskRepository := postgres.NewTaskPostgresRepository(db)
	taskQuery := taskquery.NewTaskQuery(taskRepository, organizationQuery)
	taskService := taskservice.NewTaskService(taskRepository, organizationQuery)

	userQuery := userquery.NewUserQuery(grpcClient)

	taskUserRepository := postgres.NewTaskUserPostgresRepository(db)
	taskUserQuery := taskquery.NewTaskUserQuery(taskUserRepository)
	taskUserService := taskservice.NewTaskUserService(taskUserRepository)

	return &Container{
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

		Client:            grpcClient,
		UserQuery:         userQuery,
		OrganizationQuery: organizationQuery,

		categoryRepository: categoryRepository,
		CategoryQuery:      categoryQuery,
		CategoryService:    categoryService,
	}
}
