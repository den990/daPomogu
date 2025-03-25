package query

import (
	"backend/task_service/pkg/app/comment/data"
	"backend/task_service/pkg/app/comment/model"
	usermodel "backend/task_service/pkg/app/user/model"
	"backend/task_service/pkg/app/user/query"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	userlib "backend/task_service/pkg/infrastructure/lib/user"
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
	userquery   query.UserQuery
}

func NewCommentQuery(
	commentRepo model.CommentReadRepositoryInterface,
	userquery query.UserQuery,
) *CommentQuery {
	return &CommentQuery{
		commentRepo: commentRepo,
		userquery:   userquery,
	}
}

func (c *CommentQuery) Show(ctx context.Context, comment data.ShowComment) (*paginate.Pagination, error) {
	comments, total, err := c.commentRepo.Show(ctx, comment.TaskID, comment.Page, comment.Limit)
	if err != nil {
		return nil, err
	}

	usersIDs := []uint64{}
	for _, comment := range comments {
		usersIDs = append(usersIDs, uint64(comment.UserID))
	}

	users, err := c.userquery.GetUsersByIDS(ctx, usersIDs)
	if err != nil {
		return nil, err
	}

	result := []struct {
		Comment model.CommentModel  `json:"comment"`
		User    usermodel.UserModel `json:"user"`
	}{}

	for _, comment := range comments {
		user, err := userlib.FindUser(users, comment.UserID)
		if err != nil {
			continue
		}
		result = append(result, struct {
			Comment model.CommentModel  `json:"comment"`
			User    usermodel.UserModel `json:"user"`
		}{
			Comment: comment,
			User:    user,
		})
	}

	return &paginate.Pagination{
		Page:       comment.Page,
		Limit:      comment.Limit,
		Rows:       result,
		TotalPages: total,
	}, nil
}
