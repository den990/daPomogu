package query

import (
	"backend/task_service/pkg/app/task/model"
	usermodel "backend/task_service/pkg/app/user/model"
	"context"
)

type TaskCategoryQueryInterface interface {
	GetCategories(
		ctx context.Context,
		taskID uint,
	) ([]model.TaskViewCategory, error)
	GetUserIDs(ctx context.Context,
		taskID uint) ([]int, error)
	GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]usermodel.UserModel, error)
}

type ClientTaskCategoryInterface interface {
	GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]usermodel.UserModel, error)
}

type TaskCategoryQuery struct {
	repo   model.TaskCategoryReadRepositoryInterface
	client ClientTaskCategoryInterface
}

func NewTaskCategoryQuery(repo model.TaskCategoryReadRepositoryInterface, client ClientTaskCategoryInterface) *TaskCategoryQuery {
	return &TaskCategoryQuery{
		repo:   repo,
		client: client,
	}
}

func (tc *TaskCategoryQuery) GetCategories(
	ctx context.Context,
	taskID uint,
) ([]model.TaskViewCategory, error) {

	return tc.repo.GetCategories(ctx, taskID)
}

func (tc *TaskCategoryQuery) GetUserIDs(ctx context.Context, taskID uint) ([]int, error) {
	return tc.repo.GetUserIDs(ctx, taskID)
}

func (tc *TaskCategoryQuery) GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]usermodel.UserModel, error) {
	return tc.client.GetUsersByIDS(ctx, userIDS)
}
