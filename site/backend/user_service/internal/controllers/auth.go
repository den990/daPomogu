package controllers

import (
	notificationmodel "backend/task_service/pkg/app/notification/model"
	"backend/user_service/internal/db"
	"backend/user_service/internal/models"
	"backend/user_service/internal/utils"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
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

func (h *Handler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	var user models.User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid email or password"})
		return
	}

	if user.IsBlocked == true {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "You are blocked"})
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
		var userOrg models.UserOrganization
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

func (h *Handler) RegisterUser(c *gin.Context) {
	var volunteer models.UserRegistration
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

	user := models.User{
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

	err = models.SaveUser(&user)
	if err != nil {
		h.notificationClient.Send(c.Request.Context(), notificationmodel.Notification{
			UserId: user.ID,
			Data:   "User registered failed",
		})
		c.JSON(http.StatusBadRequest, gin.H{"message": "Failed register"})
	} else {
		h.notificationClient.Send(c.Request.Context(), notificationmodel.Notification{
			UserId: user.ID,
			Data:   "User registered successful",
		})
		c.JSON(http.StatusOK, gin.H{"message": "Register successful"})
	}
}

func (h *Handler) RegisterOrganization(c *gin.Context) {
	var orgData models.OrganizationRegistration
	var user models.User
	if err := c.ShouldBindJSON(&orgData); err != nil {
		c.JSON(400, gin.H{"message": "Invalid input", "error": err.Error()})
		return
	}

	if err := db.DB.Where("email = ?", orgData.Email).First(&user).Error; err == nil {
		c.JSON(400, gin.H{"message": "Email is taken"})
		return
	}

	organization := models.Organization{
		Email:         orgData.Email,
		Phone:         orgData.Phone,
		INN:           orgData.INN,
		Name:          orgData.Name,
		LegalAddress:  orgData.LegalAddress,
		ActualAddress: orgData.ActualAddress,
		StatusID:      1,
		FullNameOwner: orgData.FullNameOwner,
	}

	if err := db.DB.Create(&organization).Error; err != nil {
		log.Println("Error registering organization:", err)
		c.JSON(500, gin.H{"message": "Failed to register organization"})
		return
	}

	h.notificationClient.Send(c.Request.Context(), notificationmodel.Notification{
		UserId: user.ID,
		Data:   "Organization registered successfully",
	})

	c.JSON(200, gin.H{"message": "Organization registered successfully"})
}
