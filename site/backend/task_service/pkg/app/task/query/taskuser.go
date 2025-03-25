package query

import (
	"backend/task_service/pkg/app/task/model"
	usermodel "backend/task_service/pkg/app/user/model"
	userquery "backend/task_service/pkg/app/user/query"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	userlib "backend/task_service/pkg/infrastructure/lib/user"
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
	IsRecorded(ctx context.Context, taskId, userId uint) (bool, error)
	IsCoordinatorByTaskId(ctx context.Context, taskId, userId uint) (bool, error)
	GetByParams(ctx context.Context, taskId, userId uint) (model.TaskUser, error)
}

type TaskUserQuery struct {
	repo      model.TaskUserReadRepositoryInterface
	userquery userquery.UserQueryInterface
}

func NewTaskUserQuery(
	repo model.TaskUserReadRepositoryInterface,
	userquery userquery.UserQueryInterface,
) *TaskUserQuery {
	return &TaskUserQuery{
		repo:      repo,
		userquery: userquery,
	}
}

func (tu *TaskUserQuery) GetUsers(
	ctx context.Context,
	taskID uint,
	page int,
	limit int,
	isCoordinators *bool,
) (*paginate.Pagination, error) {
	tasksuseres, total, err := tu.repo.GetUsers(ctx, taskID, page, limit, isCoordinators)
	if err != nil {
		return nil, err
	}
	usersIDs := make([]uint64, len(tasksuseres))
	for _, taskuser := range tasksuseres {
		usersIDs = append(usersIDs, uint64(taskuser.UserID))
	}
	users, err := tu.userquery.GetUsersByIDS(ctx, usersIDs)
	if err != nil {
		return nil, err
	}
	var result []struct {
		ID   uint
		User usermodel.UserModel
	}
	for _, taskuser := range tasksuseres {
		user, err := userlib.FindUser(users, taskuser.UserID)
		if err != nil {
			return nil, err
		}

		result = append(result, struct {
			ID   uint
			User usermodel.UserModel
		}{ID: taskuser.ID, User: user})
	}
	return &paginate.Pagination{Page: page, Limit: limit, TotalPages: total, Rows: result}, nil
}

func (tu *TaskUserQuery) GetCountUserWithoutCoordinators(ctx context.Context, taskId uint) (count int, err error) {
	return tu.repo.GetCountUserWithoutCoordinators(ctx, taskId)
}

func (tu *TaskUserQuery) IsRecorded(ctx context.Context, taskId, userId uint) (bool, error) {
	return tu.repo.IsRecorded(ctx, taskId, userId)
}

func (tu *TaskUserQuery) IsCoordinatorByTaskId(ctx context.Context, taskId, userId uint) (bool, error) {
	return tu.repo.IsCoordinatorByTaskId(ctx, taskId, userId)
}

func (tu *TaskUserQuery) GetByParams(ctx context.Context, taskId, userId uint) (model.TaskUser, error) {
	return tu.repo.GetByParams(ctx, taskId, userId)
}
