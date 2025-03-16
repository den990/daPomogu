package query

import (
	"backend/client/pkg/app/comment/data"
	"backend/client/pkg/app/comment/model"
	"backend/client/pkg/app/paginate"
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
