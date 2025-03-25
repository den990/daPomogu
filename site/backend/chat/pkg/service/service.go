package service

import (
	"backend/chat/pkg/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
)

type ChatReposInterface interface {
	CreateChat(ctx context.Context, chat model.Chat) (model.Chat, error)
	CreateMessage(ctx context.Context, mess model.Message) (model.Message, error)
	ShowChats(ctx context.Context, userID uint, page, limit uint) ([]model.Chat, int, error)
	ShowMessages(ctx context.Context, chatID uint, page, limit uint) ([]model.Message, error)
	GetChat(ctx context.Context, chatID uint) (model.Chat, error)
}

type ChatService struct {
	repo ChatReposInterface
	grpc Grpc
}

func (c ChatService) CreateChat(ctx context.Context, chat model.Chat) (model.Chat, error) {
	chats, err := c.repo.CreateChat(ctx, chat)
	if err != nil {
		return model.Chat{}, err
	}
	return chats, nil
}

func (c ChatService) CreateMessage(ctx context.Context, mess model.Message) (model.Message, error) {
	mess, err := c.repo.CreateMessage(ctx, mess)
	if err != nil {
		return model.Message{}, err
	}
	return mess, nil
}

func (c ChatService) ShowChats(ctx context.Context, userID uint, page, limit uint) (paginate.Pagination, error) {
	chats, total, err := c.repo.ShowChats(ctx, userID, page, limit)
	if err != nil {
		return paginate.Pagination{}, err
	}
	return paginate.Pagination{
		Limit:      int(limit),
		Page:       int(page),
		Rows:       chats,
		TotalPages: total,
	}, nil
}

func (c ChatService) ShowMessages(ctx context.Context, chatID uint, page, limit uint) (paginate.Pagination, error) {
	chat, err := c.repo.GetChat(ctx, chatID)
	if err != nil {
		return paginate.Pagination{}, err
	}

	messages, err := c.repo.ShowMessages(ctx, chatID, page, limit)
	if err != nil {
		return paginate.Pagination{}, err
	}

	users, err := c.grpc.GetUsersByIDS(ctx, []uint64{uint64(chat.User1ID), uint64(chat.User2ID)})
	if err != nil {
		return paginate.Pagination{}, err
	}

	return paginate.Pagination{
		Limit: int(limit),
		Page:  int(page),
		Rows: struct {
			Messages []model.Message   `json:"messages"`
			Users    []model.UserModel `json:"users"`
		}{
			Messages: messages,
			Users:    users,
		},
		TotalPages: -1,
	}, nil
}

func NewChatService(repo ChatReposInterface, grpc *Grpc) *ChatService {
	return &ChatService{repo: repo, grpc: *grpc}
}
