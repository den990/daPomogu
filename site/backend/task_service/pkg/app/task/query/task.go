package query

import (
	organizationmodel "backend/task_service/pkg/app/organization/model"
	"backend/task_service/pkg/app/organization/query"
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"log"
)

type TaskQueryInterface interface {
	Get(ctx context.Context, id uint) (*model.TaskModel, error)
	Show(
		ctx context.Context,
		user uint,
	) ([]model.TaskModel, error)
	GetCurrentTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error)
	GetFinishedTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error)
}

type TaskQuery struct {
	readRepository    model.TaskReadRepositoryInterface
	organizationQuery query.OrganizationQueryInterface
	taskstatusService TaskStatusServiceInterface
}

func NewTaskQuery(
	readRepository model.TaskReadRepositoryInterface,
	organizationQuery query.OrganizationQueryInterface,
	taskstatus TaskStatusServiceInterface,
) *TaskQuery {
	return &TaskQuery{
		readRepository:    readRepository,
		organizationQuery: organizationQuery,
		taskstatusService: taskstatus,
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
	org, _ := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(user))

	if org != (organizationmodel.OrganizationModel{}) {
		tasks, err := t.readRepository.GetAll(ctx, user, true, []organizationmodel.OrganizationModel{org})
		if err != nil {
			return nil, err
		}

		return tasks, nil

	} else {
		organizations, err := t.organizationQuery.GetOrganizationsByUserID(ctx, uint64(user))
		if err != nil {
			return nil, err
		}

		tasks, err := t.readRepository.GetAll(ctx, user, false, organizations)
		if err != nil {
			return nil, err
		}

		return tasks, nil
	}
}

func (t *TaskQuery) GetCurrentTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error) {
	status, err := t.taskstatusService.Get(ctx, "В работе")
	if err != nil {
		return paginate.Pagination{}, err
	}
	log.Println("status:", status)
	tasks, err := t.readRepository.GetTasksByUserIDWithStatuses(
		ctx,
		user,
		[]uint{status.ID},
		dto.Page,
		dto.Limit,
	)
	log.Println("tasks:", tasks)
	if err != nil {
		return paginate.Pagination{}, err
	}

	return paginate.Pagination{Page: dto.Page, Limit: dto.Limit, Rows: tasks}, nil
}

func (t *TaskQuery) GetFinishedTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error) {
	statusNotFinished, err := t.taskstatusService.Get(ctx, "Не выполнено")
	if err != nil {
		return paginate.Pagination{}, err
	}
	statusFinished, err := t.taskstatusService.Get(ctx, "Выполнено")
	if err != nil {
		return paginate.Pagination{}, err
	}

	tasks, err := t.readRepository.GetTasksByUserIDWithStatuses(
		ctx,
		user,
		[]uint{statusFinished.ID, statusNotFinished.ID},
		dto.Page,
		dto.Limit,
	)
	if err != nil {
		return paginate.Pagination{}, err
	}

	return paginate.Pagination{Page: dto.Page, Limit: dto.Limit, Rows: tasks}, nil
}
