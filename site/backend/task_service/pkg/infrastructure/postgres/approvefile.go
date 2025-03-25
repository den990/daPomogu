package postgres

import (
	"backend/task_service/pkg/app/approve/data"
	"backend/task_service/pkg/app/approve/model"
	"context"
	"gorm.io/gorm"
)

type ApproveFileRepository struct {
	db *gorm.DB
}

func NewApproveFileRepository(db *gorm.DB) *ApproveFileRepository {
	return &ApproveFileRepository{db: db}
}

func (af *ApproveFileRepository) Create(ctx context.Context, dto data.CreateApproveFile) (uint, error) {
	approvefile := &model.ApproveFile{
		UserID:        dto.UserID,
		FileID:        dto.FileID,
		ApproveTaskID: dto.ApproveTaskID,
	}

	res := af.db.WithContext(ctx).Create(approvefile)

	return approvefile.ID, res.Error
}

func (af *ApproveFileRepository) GetAll(ctx context.Context, approveTaskIDs []uint) ([]model.ApproveFile, error) {
	approveFiles := []model.ApproveFile{}
	err := af.db.WithContext(ctx).Where("approve_task_id IN (?)", approveTaskIDs).Error
	return approveFiles, err
}

func (af *ApproveFileRepository) Get(ctx context.Context, approveTaskId uint) (model.ApproveFile, error) {
	approveFile := model.ApproveFile{}
	err := af.db.WithContext(ctx).
		Model(&model.ApproveFile{}).
		Where("approve_task_id = ?", approveTaskId).
		First(&approveFile).
		Error
	return approveFile, err
}
