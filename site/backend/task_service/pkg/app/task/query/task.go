package query

import (
	organizationmodel "backend/task_service/pkg/app/organization/model"
	"backend/task_service/pkg/app/organization/query"
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"fmt"
	"log"
)

type TaskQueryInterface interface {
	Get(ctx context.Context, id uint) (*model.TaskModel, error)
	Show(ctx context.Context, user uint, page int) ([]model.TasksView, error)
	GetCurrentTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error)
	GetFinishedTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error)
}

type TaskQuery struct {
	readRepository    model.TaskReadRepositoryInterface
	organizationQuery query.OrganizationQueryInterface
	taskstatusService TaskStatusServiceInterface
	taskcategoryquery TaskCategoryQuery
	taskuserquery     TaskUserQuery
}

func NewTaskQuery(
	readRepository model.TaskReadRepositoryInterface,
	organizationQuery query.OrganizationQueryInterface,
	taskstatus TaskStatusServiceInterface,
) TaskQueryInterface {
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

func (t *TaskQuery) Show(ctx context.Context, user uint, page int) ([]model.TasksView, error) {
	org, _ := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(user))
	var taskView []model.TasksView
	if org != (organizationmodel.OrganizationModel{}) {
		tasks, err := t.readRepository.GetAll(ctx, user, true, []organizationmodel.OrganizationModel{org}, page)

		for _, task := range tasks {
			organization, err := t.organizationQuery.GetOrganization(ctx, uint64(task.OrganizationID))
			if err != nil {
				fmt.Println("Organization not found in Show query task")
				continue
			}
			categories, err := t.taskcategoryquery.GetCategories(ctx, task.ID)
			if err != nil {
				fmt.Println("Category not found in Show query task")
				continue
			}

			count, err := t.taskuserquery.repo.GetCountUserWithoutCoordinators(ctx, task.ID)
			if err != nil {
				fmt.Println("Count not found in Show query task")
				continue
			}

			taskView = append(taskView, model.TasksView{OrganizationName: organization.Name,
				Task:          task,
				Categories:    categories,
				CountApplying: count,
			})
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

		tasks, err := t.readRepository.GetAll(ctx, user, false, organizations, page)

		if err != nil {
			return nil, err
		}

		for _, task := range tasks {
			organization, err := t.organizationQuery.GetOrganization(ctx, uint64(task.OrganizationID))
			if err != nil {
				fmt.Println("Organization not found in Show query task")
				continue
			}

			categories, err := t.taskcategoryquery.GetCategories(ctx, task.ID)
			if err != nil {
				fmt.Println("Category not found in Show query task")
				continue
			}

			count, err := t.taskuserquery.repo.GetCountUserWithoutCoordinators(ctx, task.ID)
			if err != nil {
				fmt.Println("Count not found in Show query task")
				continue
			}

			taskView = append(taskView, model.TasksView{OrganizationName: organization.Name,
				Task:          task,
				Categories:    categories,
				CountApplying: count,
			})
		}
		if err != nil {
			return nil, err
		}

		return taskView, nil

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
