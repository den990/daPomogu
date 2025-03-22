package query

import (
	"backend/task_service/pkg/app/user/model"
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
)

type UserQueryInterface interface {
	GetUser(ctx context.Context, userID uint64) (model.UserModel, error)
	GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]model.UserModel, error)
	IsAdmin(ctx context.Context, userId uint64) (bool, error)
}

type ClientUserInterface interface {
	GetUser(ctx context.Context, userID uint64) (model.UserModel, error)
	GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]model.UserModel, error)
	IsAdmin(ctx context.Context, userId uint64) (bool, error)
}

type UserQuery struct {
	client ClientUserInterface
}

func (u *UserQuery) GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]model.UserModel, error) {
	return u.client.GetUsersByIDS(ctx, userIDS)
}
func (u *UserQuery) IsAdmin(ctx context.Context, userId uint64) (bool, error) {
	return u.client.IsAdmin(ctx, userId)
}

func NewUserQuery(client ClientUserInterface) *UserQuery {
	return &UserQuery{
		client: client,
	}
}

func (u *UserQuery) GetUser(ctx context.Context, userID uint64) (model.UserModel, error) {
	if userID <= 0 {
		return model.UserModel{}, grpc.Errorf(codes.InvalidArgument, "invalid user id")
	}

	return u.client.GetUser(ctx, userID)
}
