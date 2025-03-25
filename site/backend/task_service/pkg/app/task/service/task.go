package service

import (
	"backend/task_service/pkg/app/organization/query"
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/app/task/model"
	taskuser "backend/task_service/pkg/app/task/query"
	userquery "backend/task_service/pkg/app/user/query"
	"context"
	"errors"
	"fmt"
)

type TaskServiceInterface interface {
	Update(ctx context.Context, task *data.UpdateTask, id, userId uint) error
	Delete(ctx context.Context, id, userId uint) error
	Create(ctx context.Context, task *data.CreateTask, userId uint) (uint, error)
	Complete(ctx context.Context, id, userId uint) error
}

type TaskService struct {
	taskRepository    model.TaskRepositoryInterface
	organizationQuery query.OrganizationQueryInterface
	userQuery         userquery.UserQuery
	taskuserQuery     taskuser.TaskUserQuery
}

func NewTaskService(
	rep model.TaskRepositoryInterface,
	organizationQuery query.OrganizationQueryInterface,
	userQuery userquery.UserQuery,
	taskuserQuery taskuser.TaskUserQuery,
) *TaskService {
	return &TaskService{
		taskRepository:    rep,
		organizationQuery: organizationQuery,
		userQuery:         userQuery,
		taskuserQuery:     taskuserQuery,
	}
}

func (t *TaskService) Update(ctx context.Context, task *data.UpdateTask, id, userId uint) error {
	organization, err := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(userId))
	if err != nil {
		return errors.New("Not found organization")
	}
	taskRepository, err := t.taskRepository.Get(ctx, id)
	if organization.ID != taskRepository.OrganizationID {
		return errors.New("You are not owner this task")
	}
	err = t.taskRepository.Update(ctx, task, id)

	return err
}

func (t *TaskService) Delete(ctx context.Context, id, userId uint) error {
	organization, err := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(userId))
	if err != nil {
		return errors.New("Not found organization")
	}
	task, err := t.taskRepository.Get(ctx, id)
	if organization.ID != task.OrganizationID {
		isAdmin, err := t.userQuery.IsAdmin(ctx, uint64(userId))
		if err != nil {
			return errors.New("Not found organization")
		}
		if !isAdmin {
			return errors.New("You are not owner this task")
		}
	}

	err = t.taskRepository.Delete(ctx, id)
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
	task, err := t.taskRepository.Get(ctx, id)
	organization, err := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(userId))
	if err != nil {
		if task.OrganizationID != organization.ID {
			isCoordinator, _ := t.taskuserQuery.IsCoordinatorByTaskId(ctx, id, userId)
			if !isCoordinator {
				return errors.New("You are not coordinator or ownerr this task")
			}
		}
	}

	err = t.taskRepository.Complete(ctx, id, userId)

	return err
}
