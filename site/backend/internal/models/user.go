package models

import (
	"backend/internal/db"
	"backend/internal/utils"
	"github.com/gin-gonic/gin"
)

type User struct {
	ID           uint   `gorm:"primary_key"`
	Email        string `gorm:"unique;not null"`
	Phone        string `gorm:"not null"`
	Surname      string
	Name         string `gorm:"not null"`
	Patronymic   string
	DateOfBirth  string
	Address      string
	PasswordHash string `gorm:"not null"`
	CreatedAt    string
	UpdatedAt    string
}

type UserRegistration struct {
	Email               string `json:"email"`
	Phone               string `json:"phone"`
	FullName            string `json:"full_name"`
	BirthDate           string `json:"birth_date"`
	RegistrationAddress string `json:"registration_address"`
	Password            string `json:"password"`
}

func RegisterUser(c *gin.Context) {
	var volunteer UserRegistration
	if err := c.ShouldBindJSON(&volunteer); err != nil {
		c.JSON(400, gin.H{"message": "Invalid input"})
		return
	}

	hashedPassword, err := utils.HashPassword(volunteer.Password)
	if err != nil {
		c.JSON(500, gin.H{"message": "Failed to hash password"})
		return
	}

	user := User{
		Email:        volunteer.Email,
		Phone:        volunteer.Phone,
		Name:         volunteer.FullName,
		DateOfBirth:  volunteer.BirthDate,
		Address:      volunteer.RegistrationAddress,
		PasswordHash: hashedPassword,
	}

	if err := db.DB.Create(&user).Error; err != nil {
		c.JSON(500, gin.H{"message": "Failed to register user"})
		return
	}

	c.JSON(200, gin.H{"message": "User registered successfully"})
}
