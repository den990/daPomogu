package grpc

import (
	pb "backend/proto-functions/notification"
	"backend/task_service/pkg/app/notification/model"
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type NotificationServiceClient struct {
	Conn   *grpc.ClientConn
	Client pb.NotificationServiceClient
}

func (n NotificationServiceClient) Send(ctx context.Context, notification model.Notification) error {
	_, err := n.Client.SendNotification(ctx, &pb.NotificationRequest{
		UserID: uint64(notification.UserId),
		Data:   notification.Data,
	})
	return err
}

func NewNotificationServiceClient(addr string) (*NotificationServiceClient, error) {
	conn, err := grpc.Dial(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}

	return &NotificationServiceClient{
		Conn:   conn,
		Client: pb.NewNotificationServiceClient(conn),
	}, nil
}
