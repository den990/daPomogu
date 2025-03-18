package query

import (
	"backend/client/pkg/app/paginate"
	"backend/client/pkg/app/task/model"
	"context"
	"errors"
)

type TaskUserQueryInterface interface {
	GetUsers(
		ctx context.Context,
		taskID uint,
		pagination *paginate.Pagination,
		isCoordinators *bool,
	) (*paginate.Pagination, error)
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
	pagination *paginate.Pagination,
	isCoordinators *bool,
) (*paginate.Pagination, error) {
	if pagination == nil {
		return nil, errors.New("pagination is required")
	}

	return tu.repo.GetUsers(ctx, taskID, pagination, isCoordinators)
}
