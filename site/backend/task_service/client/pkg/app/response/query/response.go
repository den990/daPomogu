package query

import (
	"backend/client/pkg/app/response/data"
	"backend/client/pkg/app/response/model"
	"context"
	"errors"
)

type ResponseQueryInterface interface {
	Show(ctx context.Context, taskId uint) ([]data.Response, error)
}

type ResponseQuery struct {
	responseRepository model.ResponseRepositoryReadInterface
}

func NewResponseQuery(responseRepository model.ResponseRepositoryReadInterface) *ResponseQuery {
	return &ResponseQuery{
		responseRepository: responseRepository,
	}
}

func (r *ResponseQuery) Show(ctx context.Context, taskId uint) ([]data.Response, error) {
	if taskId == 0 {
		return nil, errors.New("invalid task id")
	}

	responses, err := r.responseRepository.Show(ctx, taskId)
	if err != nil {
		return nil, err
	}

	var result []data.Response
	for _, res := range responses {
		result = append(result, data.Response{
			ID:     res.ID,
			TaskId: res.TaskID,
			UserId: res.UserID,
			Status: res.StatusID,
		})
	}

	return result, nil
}
