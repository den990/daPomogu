package service

import (
	"backend/task_service/pkg/app/response/model"
	responsequery "backend/task_service/pkg/app/response/query"
	taskquery "backend/task_service/pkg/app/task/query"
	"context"
	"fmt"
)

type ResponseServiceInterface interface {
	Update(ctx context.Context, id uint, statusName string) error
	Create(ctx context.Context, taskId, userId uint) (uint, error)
}

type ResponseService struct {
	responseRepository       model.ResponseRepositoryInterface
	responseStatusRepository model.ResponseStatusRepositoryInterface
	responseQuery            responsequery.ResponseQueryInterface
	taskuserQuery            taskquery.TaskUserQueryInterface
	taskQuery                taskquery.TaskQueryInterface
}

func NewResponseService(responseRepository model.ResponseRepositoryInterface,
	responseStatusRepository model.ResponseStatusRepositoryInterface,
	taskuserQuery taskquery.TaskUserQueryInterface,
	responseQuery responsequery.ResponseQueryInterface,
	taskQuery taskquery.TaskQueryInterface,
) ResponseServiceInterface {
	return &ResponseService{
		responseRepository:       responseRepository,
		responseStatusRepository: responseStatusRepository,
		taskuserQuery:            taskuserQuery,
		responseQuery:            responseQuery,
		taskQuery:                taskQuery,
	}
}

func (r *ResponseService) Update(ctx context.Context, id uint, statusName string) error {
	if statusName == "Принято" {
		response, err := r.responseQuery.Get(ctx, id)
		if err != nil {
			return err
		}

		count, err := r.taskuserQuery.GetCountUserWithoutCoordinators(ctx, response.TaskID)
		if err != nil {
			return err
		}

		task, err := r.taskQuery.Get(ctx, response.TaskID)
		if err != nil {
			return err
		}

		if count >= *task.ParticipantsCount {
			return fmt.Errorf("Количество участников превышает заявленное")
		}
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
