package service

import (
	"backend/task_service/pkg/app/comment/data"
	"backend/task_service/pkg/app/comment/model"
	"context"
)

type CommentServiceInterface interface {
	Create(
		ctx context.Context,
		comment data.CreateComment,
		user uint,
	) (uint, error)
}

type CommentService struct {
	commentRepo model.CommentRepositoryInterface
}

func NewCommentService(commentRepo model.CommentRepositoryInterface) *CommentService {
	return &CommentService{
		commentRepo: commentRepo,
	}
}

func (c *CommentService) Create(
	ctx context.Context,
	comment data.CreateComment,
	user uint,
) (uint, error) {
	return c.commentRepo.Create(ctx, comment, user)
}
