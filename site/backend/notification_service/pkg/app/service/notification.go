package service

import (
	"backend/notification_service/pkg/app/data"
	"backend/notification_service/pkg/app/model"
	"context"
	"errors"
)

const (
	OrgAccountCreatedSuccess = iota
	OrgAccountCreatedRejected
	OrgAccountEditedSuccess
	OrgAccountEditedRejected
	VolunteerAttachedSuccess
	VolunteerAttachedRejected
	ResponseConfirmedSuccess
	ResponseConfirmedFailed
	TaskCompletedSuccess
	TaskCompletedFailed
)

type NotificationServiceInterface interface {
	GetMessages(ctx context.Context, id uint, page int, limit int) ([]model.Notification, error)
	CreateMessage(ctx context.Context, messType uint32, userID uint64) error
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

func (s *NotificationService) CreateMessage(ctx context.Context, messType uint32, userID uint64) error {
	messageTypes := map[uint32]data.CreateNotification{
		OrgAccountCreatedSuccess: data.CreateNotification{
			UserID:  userID,
			Message: "Заявка на создание аккаунта организации принята",
		},
		OrgAccountCreatedRejected: data.CreateNotification{
			UserID:  userID,
			Message: "Заявка на создание аккаунта организации отклонена",
		},
		OrgAccountEditedSuccess: data.CreateNotification{
			UserID:  userID,
			Message: "Заявка на редактирование аккаунта организации принята",
		},
		OrgAccountEditedRejected: data.CreateNotification{
			UserID:  userID,
			Message: "Заявка на редактирование аккаунта организации отклонена",
		},
		VolunteerAttachedSuccess: data.CreateNotification{
			UserID:  userID,
			Message: "Заявка на прикрепление к организации принята",
		},
		VolunteerAttachedRejected: data.CreateNotification{
			UserID:  userID,
			Message: "Заявка на прикрепление к организации отклонена",
		},
		ResponseConfirmedSuccess: data.CreateNotification{
			UserID:  userID,
			Message: "Отклик на выполнение задания принят",
		},
		ResponseConfirmedFailed: data.CreateNotification{
			UserID:  userID,
			Message: "Отклик на выполнение задания отклонен",
		},
		TaskCompletedSuccess: data.CreateNotification{
			UserID:  userID,
			Message: "Задание успешно выполнено",
		},
		TaskCompletedFailed: data.CreateNotification{
			UserID:  userID,
			Message: "Задание не выполнено",
		},
	}

	if el, exist := messageTypes[messType]; exist {
		return s.repository.CreateMessage(ctx, el)
	}

	return errors.New("invalid params")
}

func (s *NotificationService) SendNotification(ctx context.Context, notification model.Notification) error {

	return nil
}
