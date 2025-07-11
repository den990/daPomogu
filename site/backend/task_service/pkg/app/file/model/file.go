package model

import (
	"backend/task_service/pkg/app/file/data"
	"context"
	"time"
)

type FileModel struct {
	ID         uint      `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	SRC        string    `gorm:"column:src;type:TEXT;not null"`
	UploadedAt time.Time `gorm:"column:uploaded_at;type:TIMESTAMP;not null"`
}

func (FileModel) TableName() string {
	return "file"
}

type FileModelQueryRepositoryInterface interface {
	Get(ctx context.Context, id uint) (FileModel, error)
	GetAll(ctx context.Context, ids []uint) ([]FileModel, error)
}

type FileModelRepositoryInterface interface {
	FileModelQueryRepositoryInterface
	Create(ctx context.Context, dto data.CreateFileModel) (uint, error)
}
