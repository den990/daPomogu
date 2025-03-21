package postgres

import (
	"backend/task_service/pkg/app/approve/data"
	"backend/task_service/pkg/app/approve/model"
	"context"

	"gorm.io/gorm"
)

type ApproveRepository struct {
	db *gorm.DB
}

func NewApproveRepository(db *gorm.DB) *ApproveRepository {
	return &ApproveRepository{
		db: db,
	}
}

func (a *ApproveRepository) Create(ctx context.Context, dto data.CreateApprove, status uint) (uint, error) {
	approve := &model.ApproveTaskModel{
		TaskID:   dto.TaskID,
		UserID:   dto.UserID,
		StatusID: status,
	}
	res := a.db.WithContext(ctx).Create(approve)

	return approve.ID, res.Error
}

// получает все отправления потжтверждения для заявки
func (a *ApproveRepository) Show(ctx context.Context, dto data.ShowApproves, status uint) ([]data.ApproveFile, error) {
	approves := []data.ApproveFile{}

	query := a.db.WithContext(ctx).
		Model(&data.ApproveFile{}).
		Joins("LEFT JOIN approve_file ON approve_file.approve_task_id = approve_task.id").
		Joins("LEFT JOIN file ON file.id = approve_file.file_id").
		Where("approve_task.task_id = ?", dto.TaskID).
		Where("approve_task.status_id = ?", status).
		Select("approve_task.id as id," +
			" approve_task.task_id as task_id," +
			" approve_task.user_id as user_id, " +
			"file.src as src")

	var total int64
	if err := query.Model(&data.ApproveFile{}).Count(&total).Error; err != nil {
		return []data.ApproveFile{}, err
	}

	offset := (dto.Page - 1) * dto.Limit
	if err := query.Offset(int(offset)).Limit(int(dto.Limit)).Find(&approves).Error; err != nil {
		return []data.ApproveFile{}, err
	}

	return approves, nil
}

func (a *ApproveRepository) Update(ctx context.Context, dto data.SetStatusApprove) error {
	approve := &model.ApproveTaskModel{}

	res := a.db.WithContext(ctx).Where("id = ?", dto.ID).First(&approve)
	if res.Error != nil {
		return res.Error
	}

	approve.StatusID = dto.Status
	approve.Score = dto.Score
	approve.Approved = &dto.Approved

	if err := a.db.WithContext(ctx).Save(approve).Error; err != nil {
		return err
	}

	return nil
}

func (a *ApproveRepository) Get(ctx context.Context, id uint) (model.ApproveTaskModel, error) {
	approve := model.ApproveTaskModel{}
	res := a.db.WithContext(ctx).First(&approve, id)
	return approve, res.Error
}

func (a *ApproveRepository) GetByParams(ctx context.Context, taskID uint, userID uint) (model.ApproveTaskModel, error) {
	approve := model.ApproveTaskModel{}
	res := a.db.WithContext(ctx).Where("task_id = ? AND user_id = ?", taskID, userID).First(&approve)
	if res.Error != nil {
		return model.ApproveTaskModel{}, res.Error
	}
	return approve, res.Error
}
