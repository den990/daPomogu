package model

import "time"

type Chat struct {
	ID        uint      `gorm:"id" json:"id"`
	User1ID   uint      `gorm:"user1_id" json:"user1_id"`
	User2ID   uint      `gorm:"user2_id" json:"user2_id"`
	UpdatedAt time.Time `gorm:"updated_at" json:"updated_at"`
	CreatedAt time.Time `gorm:"created_at" json:"created_at"`
}

func (Chat) TableName() string {
	return "chat"
}

type Message struct {
	ID        uint      `gorm:"id" json:"id"`
	ChatID    uint      `gorm:"chat_id" json:"chat_id"`
	UserID    uint      `gorm:"user_id" json:"user_id"`
	Text      string    `gorm:"message" json:"message"`
	IsRead    bool      `gorm:"is_read" json:"is_read"`
	CreatedAt time.Time `gorm:"created_at" json:"created_at"`
}

func (Message) TableName() string {
	return "message"
}

type UserModel struct {
	ID      uint    `gorm:"column:id;primaryKey;autoIncrement" json:"id" binding:"required"`
	Surname *string `gorm:"column:surname;" json:"surname" binding:"required"`
	Name    string  `gorm:"column:name;not null" json:"name" binding:"required"`
	IsAdmin bool    `gorm:"column:is_admin;" json:"is_admin" binding:"required"`
}
