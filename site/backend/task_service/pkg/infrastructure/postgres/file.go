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

func (f *FileRepository) GetAll(ctx context.Context, ids []uint) ([]model.FileModel, error) {
	files := []model.FileModel{}
	err := f.db.WithContext(ctx).Find(&files, ids).Error
	return files, err
}

func (f *FileRepository) Get(ctx context.Context, id uint) (model.FileModel, error) {
	file := model.FileModel{}
	err := f.db.WithContext(ctx).Model(&model.FileModel{}).Where("id = ?", id).First(&file).Error
	return file, err
}
