package query

import (
	"backend/client/pkg/app/organization/query"
	"backend/client/pkg/app/task/model"
	"context"
)

type TaskQueryInterface interface {
	Get(ctx context.Context, id uint) (*model.TaskModel, error)
	Show(
		ctx context.Context,
		user uint,
	) ([]model.TaskModel, error)
}

type TaskQuery struct {
	readRepository    model.TaskReadRepositoryInterface
	organizationQuery query.OrganizationQueryInterface
}

func NewTaskQuery(
	readRepository model.TaskReadRepositoryInterface,
	organizationQuery query.OrganizationQueryInterface,
) *TaskQuery {
	return &TaskQuery{
		readRepository:    readRepository,
		organizationQuery: organizationQuery,
	}
}

func (t *TaskQuery) Get(ctx context.Context, id uint) (*model.TaskModel, error) {
	task, err := t.readRepository.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return task, nil
}

func (t *TaskQuery) Show(ctx context.Context, user uint) ([]model.TaskModel, error) {

	organizations, err := t.organizationQuery.GetOrganizationsByUserID(ctx, uint64(user))
	if err != nil {
		return nil, err
	}

	tasks, err := t.readRepository.GetAll(ctx, user, organizations)
	if err != nil {
		return nil, err
	}

	return tasks, nil
}
