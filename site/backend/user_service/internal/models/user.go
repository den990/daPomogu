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
	IsAdmin        bool   `gorm:"default:false"`
	IsBlocked      bool   `gorm:"default:false"`
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

type UserUpdate struct {
	Email          string `json:"email" binding:"required,email"`
	Phone          string `json:"phone" binding:"required"`
	Name           string `json:"name"  binding:"required"`
	Surname        string `json:"surname"`
	Patronymic     string `json:"patronymic"`
	DateOfBirthday string `json:"date_of_birthday"`
	Address        string `json:"registration_address"`
}

type UserPasswordUpdate struct {
	OldPassword string `json:"old_password" binding:"required"`
	NewPassword string `json:"new_password" binding:"required"`
}

type UserProfileOtherResponse struct {
	Name           string `json:"name"`
	Surname        string `json:"surname"`
	Patronymic     string `json:"patronymic,omitempty"`
	DateOfBirthday string `json:"date_of_birthday,omitempty"`
	Address        string `json:"address"`
}

type UserProfileResponse struct {
	Name           string `json:"name"`
	Surname        string `json:"surname"`
	Patronymic     string `json:"patronymic,omitempty"`
	DateOfBirthday string `json:"date_of_birthday,omitempty"`
	Address        string `json:"address"`
	Email          string `json:"email"`
	Phone          string `json:"phone"`
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

func SaveUser(user *User) error {
	if err := db.DB.Create(user).Error; err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			log.Println("PostgreSQL error:", pgErr.Message, "Code:", pgErr.Code)
			if pgErr.Code == "23505" {
				return errors.New("email is already taken")
			}
		}

		log.Println("Unexpected error:", err)
		return errors.New("failed to register user")
	}
	return nil
}

func FindUserByEmail(email string) (*User, error) {
	var user User
	if err := db.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func FindUserById(id string) (*User, error) {
	var user User
	if err := db.DB.First(&user, id).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UpdateUser(id string, userForm UserUpdate) error {
	var user User

	if err := db.DB.First(&user, id).Error; err != nil {
		return errors.New("User not found")
	}

	birthday, err := time.Parse(time.DateOnly, userForm.DateOfBirthday)

	if err != nil {
		return errors.New("Failed to update organization")
	}

	user.Email = userForm.Email
	user.Phone = userForm.Phone
	user.Surname = userForm.Surname
	user.Name = userForm.Name
	user.Patronymic = userForm.Patronymic
	user.DateOfBirthday = birthday
	user.Address = userForm.Address
	user.UpdatedAt = time.Now()

	if err := db.DB.Save(&user).Error; err != nil {
		return errors.New("Failed to update organization")
	}

	return nil
}

func UpdateUserPassword(userID string, newPassword string) error {
	return db.DB.Model(&User{}).Where("id = ?", userID).Update("password_hash", newPassword).Error
}

func FindUsersByIDs(userIDs []uint) ([]User, error) {
	var users []User
	if err := db.DB.Where("id IN (?)", userIDs).Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func FindUsersAllWithoutOwner() ([]User, error) {
	var users []User
	err := db.DB.
		Where("id NOT IN (SELECT user_id FROM user_organization WHERE is_owner = true)").
		Find(&users).Error

	if err != nil {
		return nil, err
	}

	return users, nil
}

func BlockUser(userID string) error {
	var user User
	if err := db.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		return errors.New("user not found")
	}

	user.IsBlocked = true
	if err := db.DB.Save(&user).Error; err != nil {
		return errors.New("failed to block user")
	}

	return nil
}

func UnblockUser(userID string) error {
	var user User
	if err := db.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		return errors.New("user not found")
	}

	user.IsBlocked = false
	if err := db.DB.Save(&user).Error; err != nil {
		return errors.New("failed to unblock user")
	}

	return nil
}

func FindUsersAll() ([]User, error) {
	var users []User
	err := db.DB.
		Find(&users).Error

	if err != nil {
		return nil, err
	}

	return users, nil
}
