package models

import (
	"backend/internal/db"
	"backend/internal/utils"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"
	"log"
	"net/http"
	"strconv"
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
	IsAdmin        bool   `gorm:"default:false"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

func (User) TableName() string {
	return "user"
}

type UserRegistration struct {
	Email          string `json:"email" binding:"required,email"`
	Phone          string `json:"phone" binding:"required"`
	Name           string `json:"name"  binding:"required"`
	Surname        string `json:"surname"`
	Patronymic     string `json:"patronymic"`
	DateOfBirthday string `json:"date_of_birthday"`
	Address        string `json:"registration_address"`
	Password       string `json:"password" binding:"required"`
}

type UserProfileResponse struct {
	Name           string `json:"name"`
	Surname        string `json:"surname"`
	Patronymic     string `json:"patronymic,omitempty"`
	DateOfBirthday string `json:"date_of_birthday,omitempty"`
	Address        string `json:"address"`
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
		Address:        volunteer.Address,
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

func GetProfileInfo(c *gin.Context) {
	userIDParam := c.Param("id")
	var userID uint

	if userIDParam != "" {
		parsedID, err := strconv.ParseUint(userIDParam, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
			return
		}
		userID = uint(parsedID)
	} else {
		jwtUserID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
		userID = jwtUserID.(uint)
	}

	var user User
	if err := db.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
		return
	}

	response := UserProfileResponse{
		Name:           user.Name,
		Surname:        user.Surname,
		Patronymic:     user.Patronymic,
		DateOfBirthday: user.DateOfBirthday.Format(time.DateOnly),
		Address:        user.Address,
	}

	c.JSON(http.StatusOK, response)
}

func IsAdmin(c *gin.Context) (bool, error) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		return false, err
	}

	var user User
	if err := db.DB.Select("is_admin").Where("id = ?", userID).First(&user).Error; err != nil {
		log.Println("Error fetching user role:", err)
		return false, errors.New("user not found")
	}

	return user.IsAdmin, nil
}
