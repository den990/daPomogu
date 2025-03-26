package postgres

import (
	"context"
	"gorm.io/gorm"

	"backend/notification_service/pkg/app/model"
)

type NotificationPostgres struct {
	db *gorm.DB
}

func NewNotificationPostgres(db *gorm.DB) *NotificationPostgres {
	return &NotificationPostgres{
		db: db,
	}
}

func (r *NotificationPostgres) GetMessages(ctx context.Context, id uint, page int, limit int) ([]model.Notification, error) {
	var notifications []model.Notification

	offset := (page - 1) * limit

	if err := r.db.WithContext(ctx).
		Where("user_id = ?", id).
		Where("is_read = ?", false).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&notifications).
		Error; err != nil {
		return nil, err
	}

	return notifications, nil
}

func (r *NotificationPostgres) CreateMessage(ctx context.Context, notification model.Notification) error {
	notification.ID = 0
	return r.db.WithContext(ctx).Model(&notification).Create(&notification).Error
}

func (r *NotificationPostgres) SetIsRead(ctx context.Context, id uint) error {
	return r.db.WithContext(ctx).
		Model(&model.Notification{}).
		Where("id = ?", id).
		Update("is_read", true).Error
}
