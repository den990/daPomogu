package service

import (
	"backend/task_service/pkg/app/response/model"
	"backend/task_service/pkg/app/task/query"
	"context"
)

type ResponseServiceInterface interface {
	Update(ctx context.Context, id uint, statusName string) error
	Create(ctx context.Context, taskId, userId uint) (uint, error)
}

type ResponseService struct {
	responseRepository       model.ResponseRepositoryInterface
	responseStatusRepository model.ResponseStatusRepositoryInterface
	taskuserQuery            query.TaskUserQueryInterface
}

func NewResponseService(responseRepository model.ResponseRepositoryInterface,
	responseStatusRepository model.ResponseStatusRepositoryInterface,
	taskuserQuery query.TaskUserQueryInterface,
) *ResponseService {
	return &ResponseService{
		responseRepository:       responseRepository,
		responseStatusRepository: responseStatusRepository,
		taskuserQuery:            taskuserQuery,
	}
}

func (r *ResponseService) Update(ctx context.Context, id uint, statusName string) error {
	if statusName == "Принято" {
		// taskusers := r.taskuserQuery.GetUsers(ctx, )
	}

	status, err := r.responseStatusRepository.GetStatus(ctx, statusName)
	if err != nil {
		return err
	}

	// я должен получать отклики токо типо такие сякие

	return r.responseRepository.Update(ctx, id, status.ID)
}

func (r *ResponseService) Create(ctx context.Context, taskId, userId uint) (uint, error) {
	status, err := r.responseStatusRepository.GetStatus(ctx, "На рассмотрении")
	if err != nil {
		return 0, err
	}

	return r.responseRepository.Create(ctx, model.ResponseModel{UserID: userId, TaskID: taskId, StatusID: status.ID})
}
