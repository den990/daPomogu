package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"backend/notification_service/pkg/app/service"
	"backend/notification_service/pkg/infra/config"
	"backend/notification_service/pkg/infra/db/postgres"
	postgresnotification "backend/notification_service/pkg/infra/db/postgres"
	"backend/notification_service/pkg/infra/server"
	grpc "backend/notification_service/pkg/infra/transport/internalapi"
	handler "backend/notification_service/pkg/infra/transport/publicapi"
)

func main() {
	cfg := config.NewConfig()
	fmt.Println("Starting notification service", cfg)
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
	email := service.NewEmailSender()
	puller := service.NewPuller(srv, email, "user-service:50501")
	go func() {
		fmt.Println("Puller started")
		puller.Run()
	}()

	hnd := handler.NewHandler(srv, puller)

	// запустить вебсокет севрер который принимает
	//		что уведомление прочитано и отдает уведомления не прочитанные
	// запустить грпс сервер принимающий новые уведомления отдает их в пулер
	// запустить пуллер сообщений который смотрит клиентов
	//		которые к нему подключились по вебсокет соединению ищет тех
	// 		кто подключен и отдает им новые уведомления

	fmt.Println("Client started")
	serve := new(server.Server)
	go func() {
		fmt.Println("Serve started", cfg.HandlerPort)
		if err := serve.Run(cfg.HandlerPort, hnd.Init(cfg.JWTSecret)); err != nil {
			log.Fatal(err)
		}
	}()

	go func() {
		fmt.Println("Server started")
		grpc.InitServer(cfg.ServerPort, puller)
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	return
}
