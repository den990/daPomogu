package model

import "context"

type TaskStatusModel struct {
	ID   uint    `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement" json:"id"`
	Name *string `gorm:"column:name;type:VARCHAR(255)" json:"name"`
}

func (TaskStatusModel) TableName() string {
	return "task_status"
}

type TaskStatusReadRepositoryInterface interface {
	Get(ctx context.Context, statusName string) (*TaskStatusModel, error)
}
