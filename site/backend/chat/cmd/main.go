package main

import (
	"backend/chat/pkg/conf"
	"backend/chat/pkg/handler"
	"backend/chat/pkg/repo"
	"backend/chat/pkg/server"
	"backend/chat/pkg/service"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	config := conf.MustLoad()
	db, err := repo.NewPostgresGormDB(repo.Config{
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
	rep := repo.NewChatRepository(db)
	grpc, err := service.NewGrpcClient(config.Address)
	if err != nil {
		panic(err)
	}
	srvv := service.NewChatService(rep, grpc)
	hand := handler.NewChatHandler(srvv)
	go func() {
		serve := new(server.Server)
		if err := serve.Run(config.SConfig.Port, hand.Init(config.JWTSecret)); err != nil {
			log.Fatal(err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	fmt.Println("Shutting down gracefully...")

}
