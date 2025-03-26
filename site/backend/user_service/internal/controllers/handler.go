package controllers

import (
	"backend/user_service/grpc"
)

type Handler struct {
	grpcClient         grpc.Client
	notificationClient grpc.NotificationServiceClient
}

func NewHandler(grpcClient grpc.Client, notificationClient grpc.NotificationServiceClient) *Handler {
	return &Handler{
		grpcClient:         grpcClient,
		notificationClient: notificationClient,
	}
}
