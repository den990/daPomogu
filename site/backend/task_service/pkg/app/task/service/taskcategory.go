package service

import (
	"backend/task_service/pkg/app/task/model"
	"context"
)

type TaskCategoryServiceInterface interface {
	Add(ctx context.Context, categoryID, taskID uint) error
	Delete(ctx context.Context, categoryID, taskID uint) error
}

type TaskCategoryService struct {
	taskcategoryrepo model.TaskCategoryRepositoryInterface
}

func NewTaskCategoryService(taskcategoryrepo model.TaskCategoryRepositoryInterface) *TaskCategoryService {
	return &TaskCategoryService{
		taskcategoryrepo: taskcategoryrepo,
	}
}

func (tc *TaskCategoryService) Add(ctx context.Context, categoryID, taskID uint) error {
	return tc.taskcategoryrepo.Add(ctx, categoryID, taskID)
}

func (tc *TaskCategoryService) Delete(ctx context.Context, categoryID, taskID uint) error {
	return tc.taskcategoryrepo.Delete(ctx, categoryID, taskID)
}
