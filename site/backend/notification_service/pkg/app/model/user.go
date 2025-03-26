package model

type UserModel struct {
	ID    uint   `json:"id" binding:"required"`
	Email string `json:"email" binding:"required"`
}
