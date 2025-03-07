package models

import (
	"backend/internal/db"
	"backend/internal/utils"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"
	"log"
	"time"
)

type User struct {
	ID             uint   `gorm:"primary_key"`
	Email          string `gorm:"unique;not null"`
	Phone          string `gorm:"not null"`
	Surname        string
	Name           string `gorm:"not null"`
	Patronymic     string
	DateOfBirthday time.Time `gorm:"type:date"`
	Address        string
	PasswordHash   string `gorm:"not null"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

type UserRegistration struct {
	Email               string `json:"email"`
	Phone               string `json:"phone"`
	Name                string `json:"name"`
	Surname             string `json:"surname"`
	Patronymic          string `json:"patronymic"`
	DateOfBirthday      string `json:"date_of_birthday"`
	RegistrationAddress string `json:"registration_address"`
	Password            string `json:"password"`
}

func RegisterUser(c *gin.Context) {
	var volunteer UserRegistration
	if err := c.ShouldBindJSON(&volunteer); err != nil {
		c.JSON(400, gin.H{"message": "Invalid input"})
		return
	}

	dateOfBirthday, err := time.Parse(time.DateOnly, volunteer.DateOfBirthday)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid date format"})
		return
	}

	hashedPassword, err := utils.HashPassword(volunteer.Password)
	if err != nil {
		log.Println("Error hashing password:", err)
		c.JSON(500, gin.H{"message": "Failed to hash password"})
		return
	}

	user := User{
		Email:          volunteer.Email,
		Phone:          volunteer.Phone,
		Name:           volunteer.Name,
		Surname:        volunteer.Surname,
		Patronymic:     volunteer.Patronymic,
		DateOfBirthday: dateOfBirthday,
		Address:        volunteer.RegistrationAddress,
		PasswordHash:   hashedPassword,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	if err := db.DB.Create(&user).Error; err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			log.Println("PostgreSQL error:", pgErr.Message, "Code:", pgErr.Code)
			if pgErr.Code == "23505" {
				c.JSON(400, gin.H{"message": "Email is already taken"})
				return
			}
		}

		log.Println("Unexpected error:", err)
		c.JSON(500, gin.H{"message": "Failed to register user"})
		return
	}

	c.JSON(200, gin.H{"message": "User registered successfully"})
}
