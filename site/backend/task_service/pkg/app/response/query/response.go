package query

import (
	"backend/task_service/pkg/app/response/model"
	usermodel "backend/task_service/pkg/app/user/model"
	userquery "backend/task_service/pkg/app/user/query"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	userlib "backend/task_service/pkg/infrastructure/lib/user"
	"context"
	"errors"
)

type ResponseQueryInterface interface {
	Show(
		ctx context.Context,
		taskId uint,
		page int,
		limit int,
	) (*paginate.Pagination, error)
	IsResponsed(ctx context.Context, taskId, userId uint) (bool, error)
	Get(ctx context.Context, id uint) (model.ResponseModel, error)
}

type ResponseQuery struct {
	responseRepository model.ResponseRepositoryReadInterface
	userquery          userquery.UserQueryInterface
}

func NewResponseQuery(
	responseRepository model.ResponseRepositoryReadInterface,
	userquery userquery.UserQueryInterface,
) *ResponseQuery {
	return &ResponseQuery{
		responseRepository: responseRepository,
		userquery:          userquery,
	}
}

func (r *ResponseQuery) Show(
	ctx context.Context,
	taskId uint,
	page int,
	limit int,
) (*paginate.Pagination, error) {
	if taskId < 0 {
		return nil, errors.New("invalid task id")
	}

	responses, total, err := r.responseRepository.Show(ctx, taskId, page, limit)
	if err != nil {
		return nil, err
	}

	userIDs := make([]uint64, len(responses))
	for i, response := range responses {
		userIDs[i] = uint64(response.UserID)
	}

	users, err := r.userquery.GetUsersByIDS(ctx, userIDs)
	if err != nil {
		return nil, err
	}

	res := make([]struct {
		ID     uint
		TaskID uint
		User   usermodel.UserModel
	}, len(responses))
	for i, response := range responses {
		user, err := userlib.FindUser(users, response.UserID)
		if err != nil {
			continue
		}

		res[i] = struct {
			ID     uint
			TaskID uint
			User   usermodel.UserModel
		}{
			ID:     response.ID,
			TaskID: response.TaskID,
			User:   user,
		}
	}

	pagination := paginate.Pagination{
		Limit:      limit,
		Page:       page,
		Rows:       res,
		TotalPages: total,
	}

	return &pagination, nil
}

func (r *ResponseQuery) IsResponsed(ctx context.Context, taskId, userId uint) (bool, error) {
	return r.responseRepository.IsResponsed(ctx, taskId, userId)
}

func (r *ResponseQuery) Get(ctx context.Context, id uint) (model.ResponseModel, error) {
	response, err := r.responseRepository.Get(ctx, id)
	if err != nil {
		return model.ResponseModel{}, err
	}
	return *response, nil
}
