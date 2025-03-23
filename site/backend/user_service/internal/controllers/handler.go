package controllers

import (
	"backend/user_service/grpc"
)

type Handler struct {
	grpcClient grpc.Client
}

func NewHandler(grpcClient grpc.Client) *Handler {
	return &Handler{
		grpcClient: grpcClient,
	}
}
