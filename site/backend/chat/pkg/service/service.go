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
}

type ChatService struct {
	repo ChatReposInterface
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
	chats, err := c.repo.ShowMessages(ctx, chatID, page, limit)
	if err != nil {
		return paginate.Pagination{}, err
	}
	return paginate.Pagination{
		Limit:      int(limit),
		Page:       int(page),
		Rows:       chats,
		TotalPages: -1,
	}, nil
}

func NewChatService(repo ChatReposInterface) ChatServiceInterface {
	return &ChatService{repo: repo}
}
