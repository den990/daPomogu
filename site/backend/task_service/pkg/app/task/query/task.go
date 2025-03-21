package query

import (
	organizationmodel "backend/task_service/pkg/app/organization/model"
	"backend/task_service/pkg/app/organization/query"
	"backend/task_service/pkg/app/task/model"
	"context"
	"fmt"
)

type TaskQueryInterface interface {
	Get(ctx context.Context, id uint) (*model.TaskModel, error)
	Show(ctx context.Context, user uint) ([]model.TasksView, error)
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

func (t *TaskQuery) Show(ctx context.Context, user uint) ([]model.TasksView, error) {
	org, _ := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(user))
	var taskView []model.TasksView
	if org != (organizationmodel.OrganizationModel{}) {
		tasks, err := t.readRepository.GetAll(ctx, user, true, []organizationmodel.OrganizationModel{org})

		for _, task := range tasks {
			organization, err := t.organizationQuery.GetOrganization(ctx, uint64(task.OrganizationID))
			if err != nil {
				fmt.Println("Organization not found in Show query task")
				continue
			}
			taskView = append(taskView, model.TasksView{OrganizationName: organization.Name, Task: task})
		}
		if err != nil {
			return nil, err
		}

		return taskView, nil

	} else {
		organizations, err := t.organizationQuery.GetOrganizationsByUserID(ctx, uint64(user))
		if err != nil {
			return nil, err
		}

		tasks, err := t.readRepository.GetAll(ctx, user, false, organizations)

		if err != nil {
			return nil, err
		}

		for _, task := range tasks {
			organization, err := t.organizationQuery.GetOrganization(ctx, uint64(task.OrganizationID))
			if err != nil {
				fmt.Println("Organization not found in Show query task")
				continue
			}
			taskView = append(taskView, model.TasksView{OrganizationName: organization.Name, Task: task})
		}
		if err != nil {
			return nil, err
		}

		return taskView, nil

	}
}
