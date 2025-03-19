package model

type UserModel struct {
	ID      uint    `gorm:"column:id;primaryKey;autoIncrement" json:"id" binding:"required"`
	Surname *string `gorm:"column:surname;" json:"surname" binding:"required"`
	Name    string  `gorm:"column:name;not null" json:"name" binding:"required"`
	IsAdmin bool    `gorm:"column:is_admin;" json:"is_admin" binding:"required"`
}
