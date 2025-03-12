package models

import (
	"backend/internal/db"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
	"time"
)

const (
	StatusPending  = 1 // Ожидание
	StatusAccepted = 2 // Принято
	StatusRejected = 3 // Отклонено
)

type Organization struct {
	ID            uint   `gorm:"primary_key"`
	Email         string `gorm:"unique;not null"`
	Phone         string `gorm:"not null"`
	INN           string `gorm:"unique;not null"`
	Name          string `gorm:"not null"`
	LegalAddress  string `gorm:"not null"`
	ActualAddress string `gorm:"not null"`
	StatusID      uint   `gorm:"not null;default:1"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
}

func (Organization) TableName() string {
	return "organization"
}

type OrganizationRegistration struct {
	Email         string `json:"email" binding:"required,email"`
	Phone         string `json:"phone" binding:"required"`
	INN           string `json:"inn" binding:"required"`
	Name          string `json:"name" binding:"required"`
	LegalAddress  string `json:"legal_address" binding:"required"`
	ActualAddress string `json:"actual_address" binding:"required"`
}

func RegisterOrganization(c *gin.Context) {
	var orgData OrganizationRegistration

	if err := c.ShouldBindJSON(&orgData); err != nil {
		c.JSON(400, gin.H{"message": "Invalid input", "error": err.Error()})
		return
	}

	organization := Organization{
		Email:         orgData.Email,
		Phone:         orgData.Phone,
		INN:           orgData.INN,
		Name:          orgData.Name,
		LegalAddress:  orgData.LegalAddress,
		ActualAddress: orgData.ActualAddress,
		StatusID:      1,
	}

	if err := db.DB.Create(&organization).Error; err != nil {
		log.Println("Error registering organization:", err)
		c.JSON(500, gin.H{"message": "Failed to register organization"})
		return
	}

	c.JSON(200, gin.H{"message": "Organization registered successfully"})
}

func ApplyOrganization(c *gin.Context) {
	updateOrganizationStatus(c, StatusAccepted, "Organization approved successfully")
}

func RejectOrganization(c *gin.Context) {
	updateOrganizationStatus(c, StatusRejected, "Organization rejected successfully")
}

func updateOrganizationStatus(c *gin.Context, newStatus uint, successMessage string) {
	isAdmin, err := IsAdmin(c)
	if err != nil || !isAdmin {
		c.JSON(http.StatusForbidden, gin.H{"message": "Access denied"})
		return
	}

	orgIDParam := c.Param("id")
	orgID, err := strconv.ParseUint(orgIDParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid organization ID"})
		return
	}

	var organization Organization
	if err := db.DB.First(&organization, orgID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Organization not found"})
		return
	}

	if err := db.DB.Model(&organization).Update("status_id", newStatus).Error; err != nil {
		log.Println("Error updating organization status:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update organization status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": successMessage})
}
