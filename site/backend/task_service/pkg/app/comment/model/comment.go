package model

import (
	"backend/task_service/pkg/app/comment/data"
	"context"
	"time"
)

type CommentModel struct {
	ID        uint      `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	TaskID    uint      `gorm:"column:task_id;type:INTEGER;not null;index"`
	UserID    uint      `gorm:"column:user_id;type:INTEGER;not null;index"`
	Comment   string    `gorm:"column:comment;type:TEXT;type:text;not null"`
	CreatedAt time.Time `gorm:"column:created_at;type:TIMESTAMP;autoCreateTime"`
}

func (CommentModel) TableName() string {
	return "comment"
}

type CommentReadRepositoryInterface interface {
	Show(
		ctx context.Context,
		taskId uint,
		page int,
		limit int,
	) ([]CommentModel, int, error)
}

type CommentRepositoryInterface interface {
	CommentReadRepositoryInterface
	Create(ctx context.Context, comment data.CreateComment, userId uint) (CommentModel, error)
}
