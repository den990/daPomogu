package postgres

import (
	"backend/task_service/pkg/app/response/data"
	"backend/task_service/pkg/app/response/model"
	"context"
	"fmt"
	"gorm.io/gorm"
)

type ResponseRepository struct {
	db *gorm.DB
}

func (r *ResponseRepository) Get(ctx context.Context, id uint) (*model.ResponseModel, error) {
	response := model.ResponseModel{}
	err := r.db.WithContext(ctx).Model(&response).Where("id = ?", id).First(&response).Error
	if err != nil {
		return nil, err
	}
	return &response, nil
}

func NewResponsePostgresRepository(db *gorm.DB) *ResponseRepository {
	return &ResponseRepository{
		db: db,
	}
}

func (r *ResponseRepository) Create(
	ctx context.Context,
	response model.ResponseModel,
) (uint, error) {
	res := r.db.WithContext(ctx).Create(&response)
	if res.Error != nil {
		return 0, res.Error
	}

	return response.ID, nil
}

func (r *ResponseRepository) Show(ctx context.Context, taskId uint, page int, limit int) ([]model.ResponseModel, int, error) {
	var responses []model.ResponseModel
	query := r.db.WithContext(ctx).Where("task_id = ?", taskId)

	var total int64
	if err := query.Model(&model.ResponseModel{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Find(&responses).Error; err != nil {
		return nil, 0, err
	}

	return responses, totalPages, nil
}

func (r *ResponseRepository) ShowNotConfirmed(
	ctx context.Context,
	taskId uint,
	page int,
	limit int,
) ([]model.ResponseModel, int, error) {
	var responses []model.ResponseModel
	query := r.db.WithContext(ctx).
		Model(&model.ResponseModel{}).
		Where("task_id = ? AND status_id = ?", taskId, 1)

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Find(&responses).Error; err != nil {
		return nil, 0, err
	}

	return responses, totalPages, nil
}

func (r *ResponseRepository) Update(ctx context.Context, id uint, status uint) (model.ResponseModel, error) {
	var response model.ResponseModel

	res := r.db.WithContext(ctx).Where("id = ?", id).First(&response)
	if res.Error != nil {
		return model.ResponseModel{}, res.Error
	}

	response.StatusID = status

	res = r.db.Model(&response).Update("status_id", status)
	if res.Error != nil {
		return model.ResponseModel{}, res.Error
	}

	return response, nil
}
func (r *ResponseRepository) IsResponsed(ctx context.Context, taskId, userId uint) (bool, error) {
	var taskUser model.ResponseModel
	err := r.db.WithContext(ctx).
		Model(&model.ResponseModel{}).
		Where("task_id = ? AND user_id = ? AND status_id = ?", taskId, userId, 1).
		First(&taskUser).Error
	if err != nil {
		return false, err
	}

	return true, nil
}

func (r *ResponseRepository) GetByParam(ctx context.Context, taskId, userId uint) (model.ResponseModel, error) {
	var response model.ResponseModel
	err := r.db.WithContext(ctx).Model(&model.ResponseModel{}).Where("task_id = ? AND user_id = ?", taskId, userId).First(&response).Error
	return response, err
}

func (r *ResponseRepository) Delete(ctx context.Context, dto data.DeleteResponse) error {
	response := model.ResponseModel{}
	res := r.db.WithContext(ctx).Model(&response).Where("task_id = ? AND user_id = ?", dto.TaskID, dto.UserID).Delete(&response)
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return fmt.Errorf("no record found with task_id = %v and user_id = %v", dto.TaskID, dto.UserID)
	}

	return nil
}
