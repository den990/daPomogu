package postgres

import (
	"backend/task_service/pkg/app/response/model"
	"context"

	"gorm.io/gorm"
)

type ResponseStatusRepository struct {
	db *gorm.DB
}

func (r ResponseStatusRepository) Get(ctx context.Context, id uint) (*model.ResponseModel, error) {
	response := model.ResponseModel{}
	err := r.db.WithContext(ctx).Where("id = ?", id).First(&response).Error
	if err != nil {
		return nil, err
	}
	return &response, nil
}

func NewResponseStatusRepository(db *gorm.DB) ResponseStatusRepository {
	return ResponseStatusRepository{db: db}
}

func (r ResponseStatusRepository) GetStatus(ctx context.Context, name string) (*model.ResponseStatusModel, error) {
	responseStatus := model.ResponseStatusModel{}
	err := r.db.First(&responseStatus, "name = ?", name).Error
	return &responseStatus, err
}
