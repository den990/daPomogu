package query

import (
	"backend/task_service/pkg/app/task/model"
	"context"
)

type TaskStatusServiceInterface interface {
	Get(ctx context.Context, statusName string) (*model.TaskStatusModel, error)
}

type TaskStatusService struct {
	repo model.TaskStatusReadRepositoryInterface
}

func NewTaskStatusService(repo model.TaskStatusReadRepositoryInterface) *TaskStatusService {
	return &TaskStatusService{repo: repo}
}

func (t *TaskStatusService) Get(ctx context.Context, statusName string) (*model.TaskStatusModel, error) {
	return t.repo.Get(ctx, statusName)
}
