package model

import (
	"context"
)

type TaskCategoryReadRepositoryInterface interface {
	GetCategories(
		ctx context.Context,
		taskID uint,
	) ([]TaskViewCategory, error)
	GetUserIDs(ctx context.Context,
		taskID uint) ([]int, error)
}

type TaskCategoryRepositoryInterface interface {
	TaskCategoryReadRepositoryInterface
	Add(ctx context.Context, categoryID, taskID uint) error
	Delete(ctx context.Context, categoryID, taskID uint) error
	DeleteAllByTaskID(ctx context.Context, taskId uint) error
}

type TaskCategory struct {
	ID         uint `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	TaskID     uint `gorm:"column:task_id;type:INTEGER;not null;index"`
	CategoryID uint `gorm:"column:category_id;type:INTEGER;not null;index"`
}

func (TaskCategory) TableName() string {
	return "task_category"
}
