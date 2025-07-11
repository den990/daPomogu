package model

import (
	"backend/task_service/pkg/app/approve/data"
	"context"
)

type ApproveFile struct {
	ID            uint `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	UserID        uint `gorm:"column:user_id;type:INTEGER;not null;index"`
	FileID        uint `gorm:"column:file_id;type:INTEGER;not null;index"`
	ApproveTaskID uint `gorm:"column:approve_task_id;type:INTEGER;not null;index"`
}

func (ApproveFile) TableName() string {
	return "approve_file"
}

type ApproveFileQueryRepositoryInterface interface {
	GetAll(ctx context.Context, approveTaskIDs []uint) ([]ApproveFile, error)
	Get(ctx context.Context, approveTaskId uint) (ApproveFile, error)
}

type ApproveFileRepositoryInterface interface {
	ApproveFileQueryRepositoryInterface
	Create(ctx context.Context, dto data.CreateApproveFile) (uint, error)
}
