package cmd

import (
	"backend/notification_service/pkg/app/service"
	"backend/task_service/pkg/infrastructure/postgres"
	"backend/task_service/pkg/infrastructure/server"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"backend/notification_service/pkg/infra/config"
	postgresnotification "backend/notification_service/pkg/infra/db/postgres"
	grpc "backend/notification_service/pkg/infra/transport/internalapi"
	handler "backend/notification_service/pkg/infra/transport/publicapi"
)

func main() {
	cfg := config.NewConfig()

	db, err := postgres.NewPostgresGormDB(postgres.Config{
		Host:     cfg.DBConfig.Host,
		Port:     cfg.DBConfig.Port,
		Username: cfg.DBConfig.Username,
		Password: cfg.DBConfig.Password,
		DBName:   cfg.DBConfig.DBName,
		SSLMode:  cfg.DBConfig.SSLMode,
	})
	if err != nil {
		panic(err)
	}

	rep := postgresnotification.NewNotificationPostgres(db)
	srv := service.NewNotificationService(rep)
	hnd := handler.NewHandler(srv)

	fmt.Println("Client started")
	serve := new(server.Server)
	go func() {
		if err := serve.Run(cfg.HandlerPort, hnd.Init("")); err != nil {
			log.Fatal(err)
		}
	}()

	go func() {
		grpc.InitServer(cfg.ServerPort)
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	return
}
