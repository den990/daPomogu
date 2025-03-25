package service

import (
	"backend/task_service/pkg/app/approve/data"
	"backend/task_service/pkg/app/approve/model"
	"context"
)

type ApproveFileServiceInterface interface {
	Create(ctx context.Context, dto data.CreateApproveFile) (uint, error)
	Show(ctx context.Context, approvesIDs []uint) ([]model.ApproveFile, error)
	Get(ctx context.Context, approveTaskId uint) (model.ApproveFile, error)
}

type ApproveFileService struct {
	repository model.ApproveFileRepositoryInterface
}

func NewApproveFileService(repository model.ApproveFileRepositoryInterface) ApproveFileServiceInterface {
	return &ApproveFileService{
		repository: repository,
	}
}

func (s *ApproveFileService) Create(ctx context.Context, dto data.CreateApproveFile) (uint, error) {
	return s.repository.Create(ctx, dto)
}

func (s *ApproveFileService) Show(ctx context.Context, approvesIDs []uint) ([]model.ApproveFile, error) {
	return s.repository.GetAll(ctx, approvesIDs)
}

func (s *ApproveFileService) Get(ctx context.Context, approveTaskId uint) (model.ApproveFile, error) {
	return s.repository.Get(ctx, approveTaskId)
}
