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
