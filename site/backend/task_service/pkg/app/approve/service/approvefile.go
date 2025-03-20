package service

import (
	"backend/task_service/pkg/app/approve/data"
	"backend/task_service/pkg/app/approve/model"
	"context"
)

type ApproveFileServiceInterface interface {
	Create(ctx context.Context, dto data.CreateApproveFile) (uint, error)
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
