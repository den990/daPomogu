package internalapi

import (
	_interface "backend/notification_service/pkg/app/interface"
	"context"
	"fmt"
	"google.golang.org/grpc"
	"log"
	"net"

	"backend/notification_service/pkg/app/model"
	pb "backend/proto-functions/notification"
)

type Server struct {
	pb.UnsafeNotificationServiceServer
	puller _interface.PullerInterface
}

func (s Server) SendNotification(ctx context.Context, request *pb.NotificationRequest) (*pb.NotificationResponse, error) {
	notification := model.Notification{
		ID:      request.UserID,
		UserID:  request.UserID,
		Message: request.Data,
		IsRead:  false,
	}

	s.puller.SendNotification(ctx, notification)

	return &pb.NotificationResponse{
		Status: "ok",
	}, nil
}

func NewServer(puller _interface.PullerInterface) *Server {
	return &Server{
		puller: puller,
	}
}

func InitServer(port string, puller _interface.PullerInterface) {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("Error in Listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterNotificationServiceServer(s, NewServer(puller))
	log.Printf("listening at: %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
