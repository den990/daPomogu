package service

import (
	"backend/task_service/pkg/app/response/data"
	"backend/task_service/pkg/app/response/model"
	responsequery "backend/task_service/pkg/app/response/query"
	taskquery "backend/task_service/pkg/app/task/query"
	taskservice "backend/task_service/pkg/app/task/service"
	"context"
	"errors"
	"fmt"
	"gorm.io/gorm"
)

type ResponseServiceInterface interface {
	Update(ctx context.Context, id uint, statusName string) error
	Create(ctx context.Context, taskId, userId uint) (uint, error)
	Delete(ctx context.Context, dto data.DeleteResponse) error
	Confirm(ctx context.Context, id uint) error
}

type ResponseService struct {
	responseRepository       model.ResponseRepositoryInterface
	responseStatusRepository model.ResponseStatusRepositoryInterface
	responseQuery            responsequery.ResponseQueryInterface
	taskuserQuery            taskquery.TaskUserQueryInterface
	taskuserService          taskservice.TaskUserServiceInterface
	taskQuery                taskquery.TaskQueryInterface
}

func NewResponseService(responseRepository model.ResponseRepositoryInterface,
	responseStatusRepository model.ResponseStatusRepositoryInterface,
	taskuserQuery taskquery.TaskUserQueryInterface,
	responseQuery responsequery.ResponseQueryInterface,
	taskQuery taskquery.TaskQueryInterface,
	taskuserService taskservice.TaskUserServiceInterface,
) ResponseServiceInterface {
	return &ResponseService{
		responseRepository:       responseRepository,
		responseStatusRepository: responseStatusRepository,
		taskuserQuery:            taskuserQuery,
		responseQuery:            responseQuery,
		taskQuery:                taskQuery,
		taskuserService:          taskuserService,
	}
}

func (r *ResponseService) Update(ctx context.Context, id uint, statusName string) error {
	if statusName == "Принято" {
		// если статус принято необходимо валидировать на то, что в заявке уже достаточное кол-во учатсников
		response, err := r.responseRepository.Get(ctx, id)
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

	response, err := r.responseRepository.Update(ctx, id, status.ID)
	if err != nil {
		return err
	}
	fmt.Println(response)

	return r.taskuserService.Create(ctx, response.UserID, response.TaskID, false)
}

func (r *ResponseService) Create(ctx context.Context, taskId, userId uint) (uint, error) {
	status, err := r.responseStatusRepository.GetStatus(ctx, "На рассмотрении")
	if err != nil {
		return 0, err
	}

	id, err := r.responseRepository.Create(ctx, model.ResponseModel{UserID: userId, TaskID: taskId, StatusID: status.ID})
	if err != nil {
		if !errors.Is(err, gorm.ErrDuplicatedKey) {
			return 0, err
		}
		response, err := r.responseRepository.GetByParam(ctx, taskId, userId)
		if err != nil {
			return 0, err
		}

		_, err = r.responseRepository.Update(ctx, response.ID, status.ID)
		if err != nil {
			return 0, err
		}
	}

	return id, nil
}

func (r *ResponseService) Delete(ctx context.Context, dto data.DeleteResponse) error {
	return r.responseRepository.Delete(ctx, dto)
}

func (r *ResponseService) Confirm(ctx context.Context, id uint) error {
	status, err := r.responseStatusRepository.GetStatus(ctx, "Принято")
	if err != nil {
		return err
	}
	_, err = r.responseRepository.Update(ctx, id, status.ID)
	return err
}
