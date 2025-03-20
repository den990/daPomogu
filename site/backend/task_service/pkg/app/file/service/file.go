package service

import (
	"backend/task_service/pkg/app/file/data"
	"backend/task_service/pkg/app/file/model"
	"context"
)

type FileServiceInterface interface {
	Create(ctx context.Context, dto data.CreateFileModel) (uint, error)
}

type FileService struct {
	filerepo model.FileModelRepository
}

func NewFileService(filerepo model.FileModelRepository) FileServiceInterface {
	return &FileService{
		filerepo: filerepo,
	}
}

func (f *FileService) Create(ctx context.Context, dto data.CreateFileModel) (uint, error) {
	return f.filerepo.Create(ctx, dto)
}
