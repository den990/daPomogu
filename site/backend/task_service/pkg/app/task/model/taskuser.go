package model

import (
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
)

type TaskUserReadRepositoryInterface interface {
	GetUsers(
		ctx context.Context,
		taskID uint,
		page int,
		limit int,
		isCoordinators *bool, // получить либо координаторов либо волонтеров
	) (*paginate.Pagination, error)
	GetCountUserWithoutCoordinators(ctx context.Context, taskId uint) (count int, err error)
	IsRecorded(ctx context.Context, taskId, userId uint) (bool, error)
}

type TaskUserRepositoryInterface interface {
	TaskUserReadRepositoryInterface
	Add(ctx context.Context, userID, taskID uint, isCoordinator bool) error
	Delete(ctx context.Context, userID, taskID uint) error
	DeleteAllByUserID(ctx context.Context, userID uint) error
}

type TaskUser struct {
	ID            uint `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	TaskID        uint `gorm:"column:task_id;type:INTEGER;not null;index"`
	UserID        uint `gorm:"column:user_id;type:INTEGER;not null;index"`
	IsCoordinator bool `gorm:"column:is_coordinator;type:BOOLEAN;default:false"`
}

func (TaskUser) TableName() string {
	return "task_user"
}
