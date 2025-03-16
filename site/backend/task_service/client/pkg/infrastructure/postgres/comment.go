package postgres

import (
	"backend/client/pkg/app/comment/data"
	"backend/client/pkg/app/comment/model"
	"backend/client/pkg/app/paginate"
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

func (c *CommentsRepository) Create(ctx context.Context, comment data.CreateComment, userID uint) (uint, error) {
	commentModel := &model.CommentModel{
		TaskID:  comment.TaskID,
		UserID:  userID,
		Comment: comment.Comment,
	}

	res := c.db.WithContext(ctx).Create(comment)
	if res.Error != nil {
		return 0, res.Error
	}

	return commentModel.ID, nil
}

func (c *CommentsRepository) Show(
	ctx context.Context,
	taskId uint,
	pagination *paginate.Pagination,
) (*paginate.Pagination, error) {
	var responses []*model.CommentModel

	res := c.db.
		WithContext(ctx).
		Where("task_id = ?", taskId).
		Scopes(paginate.Paginate(responses, pagination, c.db)).
		Find(&responses)
	if res.Error != nil {
		return &paginate.Pagination{}, res.Error
	}

	pagination.Rows = responses

	return pagination, nil
}
