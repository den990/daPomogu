package cmd

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"backend/notification_service/pkg/app/service"
	"backend/notification_service/pkg/infra/config"
	postgresnotification "backend/notification_service/pkg/infra/db/postgres"
	grpc "backend/notification_service/pkg/infra/transport/internalapi"
	handler "backend/notification_service/pkg/infra/transport/publicapi"
	"backend/task_service/pkg/infrastructure/postgres"
	"backend/task_service/pkg/infrastructure/server"
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
	puller := service.NewPuller(srv)
	go func() {
		puller.Run()
	}()

	hnd := handler.NewHandler(srv, puller)

	// запустить вебсокет севрер который принимает что уведомление прочитано и отдает уведомления не прочитанные
	// запустить грпс сервер принимающий новые уведомления отдает их в пулер
	// запустить пуллер сообщений который смотрит клиентов
	//		которые к нему подключились по вебсокет соединению ищет тех
	// 		кто подключен и отдает им новые уведомления

	fmt.Println("Client started")
	serve := new(server.Server)
	go func() {
		if err := serve.Run(cfg.HandlerPort, hnd.Init(cfg.JWTSecret)); err != nil {
			log.Fatal(err)
		}
	}()

	go func() {
		grpc.InitServer(cfg.ServerPort, puller)
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	return
}
