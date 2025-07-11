package query

import (
	organizationmodel "backend/task_service/pkg/app/organization/model"
	"backend/task_service/pkg/app/organization/query"
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"fmt"
)

type TaskQueryInterface interface {
	Get(ctx context.Context, id uint) (*model.TaskModel, error)
	Show(ctx context.Context, user uint, page int) ([]model.TasksView, int, error)
	ShowByOrganizationId(ctx context.Context, orgId uint) ([]model.TaskModel, error)
	GetCurrentTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error)
	GetFinishedTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error)
	GetCountTasksCompletedByUserId(ctx context.Context, userId uint) (int, error)
	GetCountTasksCompleted(ctx context.Context) (int, error)
	GetCountActiveTasks(ctx context.Context) (int, error)
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
	taskcategoryQuery TaskCategoryQuery,
	taskuserQuery TaskUserQuery,
) TaskQueryInterface {
	return &TaskQuery{
		readRepository:    readRepository,
		organizationQuery: organizationQuery,
		taskstatusService: taskstatus,
		taskcategoryquery: taskcategoryQuery,
		taskuserquery:     taskuserQuery,
	}
}

func (t *TaskQuery) Get(ctx context.Context, id uint) (*model.TaskModel, error) {
	task, err := t.readRepository.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	return task, nil
}

func (t *TaskQuery) Show(ctx context.Context, user uint, page int) ([]model.TasksView, int, error) {
	org, _ := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(user))
	var taskView []model.TasksView
	if org != (organizationmodel.OrganizationModel{}) {
		tasks, total, err := t.readRepository.GetAll(ctx, user, true, []organizationmodel.OrganizationModel{org}, page)

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
			return nil, 0, err
		}

		return taskView, total, nil

	} else {
		organizations, err := t.organizationQuery.GetOrganizationsByUserID(ctx, uint64(user))
		if err != nil {
			return nil, 0, err
		}

		tasks, total, err := t.readRepository.GetAll(ctx, user, false, organizations, page)

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
			return nil, 0, err
		}

		return taskView, total, nil

	}
}
func (t *TaskQuery) ShowByOrganizationId(ctx context.Context, orgId uint) ([]model.TaskModel, error) {
	return t.readRepository.ShowByOrganizationId(ctx, orgId)
}

func (t *TaskQuery) GetCurrentTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error) {
	status, err := t.taskstatusService.Get(ctx, "В работе")
	status2, err := t.taskstatusService.Get(ctx, "Не начато")
	if err != nil {
		return paginate.Pagination{}, err
	}
	org, _ := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(user))

	if org != (organizationmodel.OrganizationModel{}) {
		tasks, total, err := t.readRepository.ShowByOrganizationIdWithStatuses(ctx, org.ID, []uint{status.ID, status2.ID}, dto.Page, dto.Limit)
		if err != nil {
			return paginate.Pagination{}, err
		}
		return paginate.Pagination{Page: 1, Limit: len(tasks), Rows: tasks, TotalPages: total}, nil
	}
	tasks, total, err := t.readRepository.GetTasksByUserIDWithStatuses(
		ctx,
		user,
		[]uint{status.ID, status2.ID},
		dto.Page,
		dto.Limit,
	)
	if err != nil {
		return paginate.Pagination{}, err
	}

	return paginate.Pagination{Page: dto.Page, Limit: dto.Limit, Rows: tasks, TotalPages: total}, nil

}

func (t *TaskQuery) GetFinishedTasks(ctx context.Context, dto data.GetTasksByUser, user uint) (paginate.Pagination, error) {
	statusFinished, err := t.taskstatusService.Get(ctx, "Выполнено")
	if err != nil {
		return paginate.Pagination{}, err
	}
	org, _ := t.organizationQuery.GetOrganizationByOwnerUserID(ctx, uint64(user))

	if org != (organizationmodel.OrganizationModel{}) {
		tasks, total, err := t.readRepository.ShowByOrganizationIdWithStatuses(ctx, org.ID, []uint{statusFinished.ID}, dto.Page, dto.Limit)
		if err != nil {
			return paginate.Pagination{}, err
		}
		return paginate.Pagination{Page: 1, Limit: len(tasks), Rows: tasks, TotalPages: total}, nil
	}
	tasks, total, err := t.readRepository.GetTasksByUserIDWithStatuses(
		ctx,
		user,
		[]uint{statusFinished.ID},
		dto.Page,
		dto.Limit,
	)

	if err != nil {
		return paginate.Pagination{}, err
	}

	return paginate.Pagination{Page: dto.Page, Limit: dto.Limit, Rows: tasks, TotalPages: total}, nil
}

func (t *TaskQuery) GetCountTasksCompletedByUserId(ctx context.Context, userId uint) (int, error) {
	return t.readRepository.GetCountTasksCompletedByUserId(ctx, userId)
}
func (t *TaskQuery) GetCountTasksCompleted(ctx context.Context) (int, error) {
	return t.readRepository.GetCountTasksCompleted(ctx)
}

func (t *TaskQuery) GetCountActiveTasks(ctx context.Context) (int, error) {
	return t.readRepository.GetCountActiveTasks(ctx)
}
