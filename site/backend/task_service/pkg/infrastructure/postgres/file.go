package postgres

import (
	"backend/task_service/pkg/app/file/data"
	"backend/task_service/pkg/app/file/model"
	"context"
	"gorm.io/gorm"
)

type FileRepository struct {
	db *gorm.DB
}

func NewFileRepository(db *gorm.DB) *FileRepository {
	return &FileRepository{db: db}
}

func (f *FileRepository) Create(ctx context.Context, dto data.CreateFileModel) (uint, error) {
	file := &model.FileModel{
		SRC: dto.SRC,
	}
	res := f.db.WithContext(ctx).Create(file)
	return file.ID, res.Error
}
