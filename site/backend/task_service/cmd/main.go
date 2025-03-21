package main

import (
	"backend/task_service/appconfig"
	"backend/task_service/pkg/infrastructure/jwt"
	"backend/task_service/pkg/infrastructure/transport/handler"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"backend/task_service/pkg/infrastructure"
	"backend/task_service/pkg/infrastructure/config"
	"backend/task_service/pkg/infrastructure/server"
)

// go run ./cmd/main.go --config="./config.yaml"

func main() {
	appconfig.LoadEnv()
	fmt.Println(jwt.GenerateToken(2, os.Getenv("JWT_SECRET_KEY")))
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
	)

	fmt.Println("Client started")
	serve := new(server.Server)
	go func() {
		if err := serve.Run("8080", hand.Init(appconfig.GetJwtSecretKey())); err != nil {
			log.Fatal(err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	return
}
