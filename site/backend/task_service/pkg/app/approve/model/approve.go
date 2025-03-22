package model

import (
	"backend/task_service/pkg/app/approve/data"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"time"
)

type ApproveTaskStatusModel struct {
	ID   uint    `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	Name *string `gorm:"column:name;type:TEXT;not null"`
}

func (ApproveTaskStatusModel) TableName() string {
	return "approve_task_status"
}

type ApproveTaskModel struct {
	ID        uint      `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	TaskID    uint      `gorm:"column:task_id;type:INTEGER;not null;index"`
	UserID    uint      `gorm:"column:user_id;type:INTEGER;not null;index"`
	StatusID  uint      `gorm:"column:status_id;type:INTEGER;not null;index"`
	Score     uint      `gorm:"column:score;type:INTEGER;not null;index"`
	Approved  *uint     `gorm:"column:approved;type:INTEGER;index"`
	CreatedAt time.Time `gorm:"column:created_at;type:TIMESTAMP;not null"`
}

func (ApproveTaskModel) TableName() string {
	return "approve_task"
}

type ApproveReadRepositoryInterface interface {
	Show(ctx context.Context, dto data.ShowApproves, status uint) ([]data.ApproveFile, int, error)
	Get(ctx context.Context, id uint) (ApproveTaskModel, error)
	GetByParams(ctx context.Context, taskID uint, userID uint) (ApproveTaskModel, error)
}

type ApproveRepositoryInterface interface {
	ApproveReadRepositoryInterface
	Create(ctx context.Context, dto data.CreateApprove, status uint) (uint, error)
	Update(ctx context.Context, dto data.SetStatusApprove) error
}

type ApproveTaskStatusReadRepositoryInterface interface {
	Get(ctx context.Context, status string) (uint, error)
}

type FileReadRepositoryInterface interface {
	Show(ctx context.Context, dto data.ShowApproves) (paginate.Pagination, error)
}
