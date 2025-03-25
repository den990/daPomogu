package service

import (
	"backend/task_service/pkg/app/notification/model"
	"context"
)

type NotificationServiceInterface interface {
	Send(ctx context.Context, notification model.Notification) error
}

type NotificationServiceClientInterface interface {
	Send(ctx context.Context, notification model.Notification) error
}

type NotificationServiceClient struct {
	client NotificationServiceClientInterface
}

func NewNotificationService(client NotificationServiceClientInterface) *NotificationServiceClient {
	return &NotificationServiceClient{
		client: client,
	}
}

func (s *NotificationServiceClient) Send(ctx context.Context, notification model.Notification) error {
	return s.client.Send(ctx, notification)
}
