package models

import (
	"backend/internal/db"
	"backend/internal/utils"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

const (
	RoleAdmin        = "admin"
	RoleOrganization = "organization"
	RoleVolunteer    = "volunteer"
)

func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	var user User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid email or password"})
		return
	}

	if !utils.CheckPassword(req.Password, user.PasswordHash) {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid email or password"})
		return
	}

	role := RoleVolunteer
	if user.IsAdmin {
		role = RoleAdmin
	} else {
		var userOrg UserOrganization
		if err := db.DB.Where("user_id = ? AND is_owner = true", user.ID).First(&userOrg).Error; err == nil {
			role = RoleOrganization
		}
	}

	token, err := utils.GenerateToken(user.ID, role)
	if err != nil {
		log.Println("Error generating token:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}
