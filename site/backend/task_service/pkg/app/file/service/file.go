package service

import (
	"backend/task_service/pkg/app/file/data"
	"backend/task_service/pkg/app/file/model"
	"context"
)

type FileServiceInterface interface {
	Get(ctx context.Context, id uint) (model.FileModel, error)
	Create(ctx context.Context, dto data.CreateFileModel) (uint, error)
	GetAll(ctx context.Context, ids []uint) ([]model.FileModel, error)
}

type FileService struct {
	filerepo model.FileModelRepositoryInterface
}

func NewFileService(filerepo model.FileModelRepositoryInterface) FileServiceInterface {
	return &FileService{
		filerepo: filerepo,
	}
}

func (f *FileService) Create(ctx context.Context, dto data.CreateFileModel) (uint, error) {
	return f.filerepo.Create(ctx, dto)
}

func (f *FileService) GetAll(ctx context.Context, approvesIDs []uint) ([]model.FileModel, error) {
	return f.filerepo.GetAll(ctx, approvesIDs)
}

func (f *FileService) Get(ctx context.Context, id uint) (model.FileModel, error) {
	return f.filerepo.Get(ctx, id)
}
