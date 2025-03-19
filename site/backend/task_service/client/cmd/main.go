package main

import (
	"backend/appconfig"
	"backend/client/pkg/infrastructure/jwt"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"backend/client/cmd/handler"
	"backend/client/pkg/infrastructure"
	"backend/client/pkg/infrastructure/config"
	"backend/client/pkg/infrastructure/server"
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
