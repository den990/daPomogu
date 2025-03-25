package repo

import (
	"backend/chat/pkg/model"
	"context"
	"gorm.io/gorm"
)

type ChatRepository struct {
	gorm *gorm.DB
}

func (c *ChatRepository) CreateChat(ctx context.Context, chat model.Chat) (model.Chat, error) {
	res := c.gorm.WithContext(ctx).Model(&chat).Create(&chat)
	return chat, res.Error
}

func (c *ChatRepository) CreateMessage(ctx context.Context, mess model.Message) (model.Message, error) {
	res := c.gorm.WithContext(ctx).Model(&mess).Create(&mess)
	return mess, res.Error
}

func (c *ChatRepository) ShowChats(ctx context.Context, userID uint, page, limit uint) ([]model.Chat, int, error) {
	var chats []model.Chat
	query := c.gorm.WithContext(ctx).Where("user1_id = ? OR user2_id", userID, userID)

	var total int64
	if err := query.Model(&model.Chat{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	offset := (page - 1) * limit
	if err := query.Offset(int(offset)).Limit(int(limit)).Find(&chats).Error; err != nil {
		return nil, 0, err
	}

	return chats, totalPages, nil
}

func (c *ChatRepository) ShowMessages(ctx context.Context, chatID uint, page, limit uint) ([]model.Message, error) {
	var messages []model.Message
	query := c.gorm.WithContext(ctx).Where("chat_id = ?", chatID)

	var total int64
	if err := query.Model(&model.Chat{}).Count(&total).Error; err != nil {
		return nil, err
	}

	offset := (page - 1) * limit
	if err := query.Offset(int(offset)).Limit(int(limit)).Find(&messages).Error; err != nil {
		return nil, err
	}

	return messages, nil
}
