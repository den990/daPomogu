package service

import (
	"backend/client/pkg/app/approve/data"
	"backend/client/pkg/app/approve/model"
	"context"
)

type ApproveServiceInterface interface {
	Create(ctx context.Context, approve data.CreateApprove) error
}

type ApproveService struct {
	repository model.ApproveRepositoryInterface
}

func NewApproveService(repository model.ApproveRepositoryInterface) *ApproveService {
	return &ApproveService{
		repository: repository,
	}
}

func (a *ApproveService) Create(ctx context.Context, approve data.CreateApprove) error {
	return a.repository.Create(ctx, approve)
}
