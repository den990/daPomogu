package model

import (
	"context"
)

type ResponseModel struct {
	ID       uint `gorm:"column:id;primaryKey;type:SERIAL;autoIncrement"`
	TaskID   uint `gorm:"column:task_id;not null;type:INTEGER;index"`
	UserID   uint `gorm:"column:user_id;not null;type:INTEGER;index"`
	StatusID uint `gorm:"column:status_id;type:INTEGER;default:1"`
}

func (ResponseModel) TableName() string {
	return "response"
}

type ResponseStatusModel struct {
	ID   uint    `gorm:"column:id;primaryKey;type:SERIAL;autoIncrement"`
	Name *string `gorm:"column:name;type:VARCHAR(255)"`
}

func (ResponseStatusModel) TableName() string {
	return "response_status"
}

type ResponseRepositoryReadInterface interface {
	Show(
		ctx context.Context,
		taskId uint,
		page int,
		limit int,
	) ([]ResponseModel, int, error)
	IsResponsed(ctx context.Context, taskId, userId uint) (bool, error)
	GetByParam(ctx context.Context, taskId, userId uint) (ResponseModel, error)
}

type ResponseRepositoryInterface interface {
	ResponseRepositoryReadInterface
	Create(ctx context.Context, response ResponseModel) (uint, error)
	Update(ctx context.Context, id uint, status uint) (ResponseModel, error)
	Get(ctx context.Context, id uint) (*ResponseModel, error)
}

type ResponseStatusRepositoryInterface interface {
	GetStatus(ctx context.Context, name string) (*ResponseStatusModel, error)
}
