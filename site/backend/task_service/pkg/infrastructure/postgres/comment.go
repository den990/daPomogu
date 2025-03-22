package postgres

import (
	"backend/task_service/pkg/app/comment/data"
	"backend/task_service/pkg/app/comment/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"gorm.io/gorm"
)

type CommentsRepository struct {
	db *gorm.DB
}

func NewCommentsRepository(db *gorm.DB) *CommentsRepository {
	return &CommentsRepository{
		db: db,
	}
}

func (c *CommentsRepository) Create(ctx context.Context, comment data.CreateComment, userID uint) (model.CommentModel, error) {
	commentModel := model.CommentModel{
		TaskID:  comment.TaskID,
		UserID:  userID,
		Comment: comment.Comment,
	}

	res := c.db.WithContext(ctx).Create(&commentModel)
	if res.Error != nil {
		return model.CommentModel{}, res.Error
	}

	return commentModel, nil
}

func (c *CommentsRepository) Show(ctx context.Context, taskId uint, page int, limit int) (*paginate.Pagination, error) {
	var responses []*model.CommentModel
	query := c.db.WithContext(ctx).Where("task_id = ?", taskId)

	var total int64
	if err := query.Model(&model.CommentModel{}).Count(&total).Error; err != nil {
		return nil, err
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Find(&responses).Error; err != nil {
		return nil, err
	}

	pagination := paginate.Pagination{limit, page, responses, totalPages}
	return &pagination, nil
}
