package service

import (
	"backend/task_service/pkg/app/organization/query"
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/app/task/model"
	"context"
	"fmt"
)

type TaskServiceInterface interface {
	Update(ctx context.Context, task *data.UpdateTask, id uint) error
	Delete(ctx context.Context, id uint) error
	Create(ctx context.Context, task *data.CreateTask, userId uint) (uint, error)
	Complete(ctx context.Context, id, userId uint) error
}

type TaskService struct {
	taskRepository    model.TaskRepositoryInterface
	organizationQuery query.OrganizationQueryInterface
}

func NewTaskService(
	rep model.TaskRepositoryInterface,
	organizationQuery query.OrganizationQueryInterface,
) *TaskService {
	return &TaskService{
		taskRepository:    rep,
		organizationQuery: organizationQuery,
	}
}

func (t *TaskService) Update(ctx context.Context, task *data.UpdateTask, id uint) error {
	err := t.taskRepository.Update(ctx, task, id)

	return err
}

func (t *TaskService) Delete(ctx context.Context, id uint) error {
	err := t.taskRepository.Delete(ctx, id)
	return err
}

func (t *TaskService) Create(ctx context.Context, task *data.CreateTask, userId uint) (uint, error) {
	organization, err := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(userId))
	fmt.Printf("Organization id %d", organization.ID)
	if err != nil {
		return 0, err
	}

	task.OrganizationId = organization.ID
	_, err = t.organizationQuery.GetOrganization(ctx, uint64(organization.ID))
	if err != nil {
		return 0, err
	}

	return t.taskRepository.Create(ctx, task)
}

func (t *TaskService) Complete(ctx context.Context, id, userId uint) error {
	err := t.taskRepository.Complete(ctx, id, userId)

	return err
}
