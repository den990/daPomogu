package postgres

import (
	"backend/task_service/pkg/app/task/model"
	"context"
	"gorm.io/gorm"
)

type TaskStatus struct {
	db *gorm.DB
}

func NewTaskStatus(db *gorm.DB) *TaskStatus {
	return &TaskStatus{db: db}
}

func (t *TaskStatus) Get(ctx context.Context, statusName string) (*model.TaskStatusModel, error) {
	taskstatus := &model.TaskStatusModel{}
	err := t.db.WithContext(ctx).
		Model(&taskstatus).
		Where("name = ?", statusName).
		First(taskstatus).Error
	if err != nil {
		return nil, err
	}
	return taskstatus, nil
}
