package service

import (
	"backend/notification_service/pkg/app/model"
	"context"
	"errors"
)

type NotificationServiceInterface interface {
	GetMessages(ctx context.Context, id uint, page int, limit int) ([]model.Notification, error)
	CreateMessage(ctx context.Context, notification model.Notification) error
	SetIsRead(ctx context.Context, id uint) error
}

type ClientSenderInterface interface {
	SendNotification(ctx context.Context, notification model.Notification) error
}

type NotificationService struct {
	repository model.NotificationRepositoryInterface
}

func NewNotificationService(repository model.NotificationRepositoryInterface) *NotificationService {
	return &NotificationService{
		repository: repository,
	}
}

func (s *NotificationService) GetMessages(
	ctx context.Context,
	id uint,
	page int,
	limit int,
) ([]model.Notification, error) {
	if id <= 0 || page <= 0 || limit <= 0 {
		return nil, errors.New("invalid params")
	}

	return s.repository.GetMessages(ctx, id, page, limit)
}

func (s *NotificationService) SetIsRead(ctx context.Context, id uint) error {
	if id <= 0 {
		return errors.New("invalid params")
	}

	return s.repository.SetIsRead(ctx, id)
}

func (s *NotificationService) CreateMessage(ctx context.Context, notification model.Notification) error {
	return s.repository.CreateMessage(ctx, notification)
}
