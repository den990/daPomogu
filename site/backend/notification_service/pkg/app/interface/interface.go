package _interface

import (
	"backend/notification_service/pkg/app/model"
	"context"
)

type ClientInterface interface {
	SendNotification(ctx context.Context, n model.Notification)
	GetID() uint
}

type PullerInterface interface {
	GetNotifications(ctx context.Context, n model.Notification)
	SendNotification(ctx context.Context, n model.Notification)
	RegisterClient(client ClientInterface)
	UnregisterClient(client ClientInterface)
	SetIsRead(ctx context.Context, n model.Notification)
}
