package query

import (
	"backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
)

type TaskUserQueryInterface interface {
	GetUsers(
		ctx context.Context,
		taskID uint,
		page int,
		limit int,
		isCoordinators *bool,
	) (*paginate.Pagination, error)
	GetCountUserWithoutCoordinators(ctx context.Context, taskId uint) (count int, err error)
}

type TaskUserQuery struct {
	repo model.TaskUserReadRepositoryInterface
}

func NewTaskUserQuery(repo model.TaskUserReadRepositoryInterface) *TaskUserQuery {
	return &TaskUserQuery{
		repo: repo,
	}
}

func (tu *TaskUserQuery) GetUsers(
	ctx context.Context,
	taskID uint,
	page int,
	limit int,
	isCoordinators *bool,
) (*paginate.Pagination, error) {

	return tu.repo.GetUsers(ctx, taskID, page, limit, isCoordinators)
}

func (tu *TaskUserQuery) GetCountUserWithoutCoordinators(ctx context.Context, taskId uint) (count int, err error) {
	return tu.repo.GetCountUserWithoutCoordinators(ctx, taskId)
}
