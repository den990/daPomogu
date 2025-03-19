package query

import (
	"backend/task_service/pkg/app/comment/data"
	"backend/task_service/pkg/app/comment/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
)

type CommentQueryInterface interface {
	Show(
		ctx context.Context,
		comment data.ShowComment,
	) (*paginate.Pagination, error)
}

type CommentQuery struct {
	commentRepo model.CommentReadRepositoryInterface
}

func NewCommentQuery(commentRepo model.CommentReadRepositoryInterface) *CommentQuery {
	return &CommentQuery{
		commentRepo: commentRepo,
	}
}

func (c *CommentQuery) Show(ctx context.Context, comment data.ShowComment) (*paginate.Pagination, error) {
	return nil, nil
}
