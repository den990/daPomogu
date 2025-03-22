package model

import (
	"context"
	"time"
)

type Notification struct {
	ID        uint64    `json:"id"`
	UserID    uint64    `json:"user_id"`
	Message   string    `json:"message"`
	IsRead    bool      `json:"is_read"`
	CreatedAt time.Time `json:"created_at"`
}

type NotificationRepositoryInterface interface {
	GetMessages(ctx context.Context, id uint, page int, limit int) ([]Notification, error)
	CreateMessage(ctx context.Context, notification Notification) error
	SetIsRead(ctx context.Context, id uint) error
}
