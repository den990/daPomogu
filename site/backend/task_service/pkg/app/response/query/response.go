package query

import (
	"backend/task_service/pkg/app/response/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
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
}

type ResponseQuery struct {
	responseRepository model.ResponseRepositoryReadInterface
}

func NewResponseQuery(responseRepository model.ResponseRepositoryReadInterface) *ResponseQuery {
	return &ResponseQuery{
		responseRepository: responseRepository,
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

	return r.responseRepository.Show(ctx, taskId, page, limit)
}
