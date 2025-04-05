package main

import (
	pb "backend/proto-functions/task"
	"backend/task_service/appconfig"
	"backend/task_service/pkg/app/file/model"
	"backend/task_service/pkg/app/task/query"
	"backend/task_service/pkg/infrastructure/jwt"
	"backend/task_service/pkg/infrastructure/transport/handler"
	ServerTaskService "backend/task_service/server"
	"fmt"
	"google.golang.org/grpc"
	"gorm.io/gorm"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	"backend/task_service/pkg/infrastructure"
	"backend/task_service/pkg/infrastructure/config"
	"backend/task_service/pkg/infrastructure/server"
)

// go run ./cmd/main.go --config="./config.yaml"

func main() {
	appconfig.LoadEnv()
	fmt.Println(jwt.GenerateToken(1, os.Getenv("JWT_SECRET_KEY")))
	cfg := config.MustLoad()
	container := infrastructure.NewContainer(*cfg)

	hand := handler.NewTaskHandler(
		container.ResponseQuery,
		container.ResponseService,
		container.CommentQuery,
		container.CommentService,
		container.TaskQuery,
		container.TaskService,
		container.ApproveService,
		container.CategoryQuery,
		container.CategoryService,
		container.TaskUserService,
		container.TaskUserQuery,
		container.TaskCategoryService,
		container.TaskCategoryQuery,
		container.OrganizationQuery,
	)

	fmt.Println("Client started")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	go updateTaskStatuses(container.DB)

	go func() {
		serve := new(server.Server)
		if err := serve.Run("8080", hand.Init(appconfig.GetJwtSecretKey())); err != nil {
			log.Fatal(err)
		}
	}()

	go startGRPCServer(&container.TaskQuery, container.TaskUserQuery, container.FileQuery)
	<-quit

	fmt.Println("Shutting down gracefully...")

}

func startGRPCServer(taskquery *query.TaskQueryInterface, taskuserquery query.TaskUserQueryInterface, filequery model.FileModelRepositoryInterface) {
	port, exists := os.LookupEnv("PORT")
	if !exists {
		port = "50501"
	}

	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("Error in Listen: %v", err)
	}

	s := grpc.NewServer()
	newServer := ServerTaskService.NewServer(*taskquery, taskuserquery, filequery)
	pb.RegisterTaskServiceServer(s, newServer)

	log.Printf("gRPC Server listening at: %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve gRPC: %v", err)
	}
}

func updateTaskStatuses(DB *gorm.DB) {
	for {
		now := time.Now()

		result := DB.Exec(`UPDATE "task" SET "status_id" = 3 WHERE "task_date" <= ? AND "status_id" = 4`, now)
		if result.Error != nil {
			log.Println("Ошибка обновления статусов:", result.Error)
		} else if result.RowsAffected > 0 {
			log.Printf("Обновлено задач: %d\n", result.RowsAffected)
		}

		time.Sleep(1 * time.Minute)
	}
}
