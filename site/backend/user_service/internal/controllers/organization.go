package controllers

import (
	"backend/internal/db"
	"backend/internal/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
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

func ApplyOrganization(c *gin.Context) {
	updateOrganizationStatus(c, StatusAccepted, "Organization approved successfully")
}

func RejectOrganization(c *gin.Context) {
	updateOrganizationStatus(c, StatusRejected, "Organization rejected successfully")
}

func updateOrganizationStatus(c *gin.Context, newStatus uint, successMessage string) {
	isAdmin, err := models.IsAdmin(c)
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

	var organization models.Organization
	if err := db.DB.First(&organization, orgID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Organization not found"})
		return
	}

	if err := db.DB.Model(&organization).Update("status_id", newStatus).Error; err != nil {
		log.Println("Error updating organization status:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update organization status"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte("organization"), bcrypt.DefaultCost) //пока временно
	if newStatus == StatusAccepted {
		userFound, err := models.FindUserByEmail(organization.Email)
		if err == nil {
			_, err := models.FindUserOrganizationByUserId(strconv.Itoa(int(userFound.ID)))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": "Email is required"})
				return
			}
		} else {
			user := models.User{
				Email:        organization.Email,
				Phone:        organization.Phone,
				Name:         organization.Name,
				Address:      organization.ActualAddress,
				PasswordHash: string(hash),
				CreatedAt:    time.Now(),
				UpdatedAt:    time.Now(),
			}

			err = models.SaveUser(&user)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": "Failed register"})
			} else {
				userOrganization := models.UserOrganization{
					UserID:         user.ID,
					OrganizationID: uint(orgID),
					IsOwner:        true,
				}

				if err := db.DB.Create(&userOrganization).Error; err != nil {
					log.Println("Error registering user_organization:", err)
					c.JSON(500, gin.H{"message": "Failed to register organization"})
					return
				}
			}

		}
	}

	c.JSON(http.StatusOK, gin.H{"message": successMessage})
}

func GetOrganizationProfileInfo(c *gin.Context) {
	userIDParam := c.Param("id")
	var organizationId uint

	if userIDParam != "" {
		parsedID, err := strconv.ParseUint(userIDParam, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
			return
		}
		organizationId = uint(parsedID)
	} else {
		jwtUserID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
		organizationId = jwtUserID.(uint)
	}

	organization, err := models.FindActualOrganizationById(strconv.Itoa(int(organizationId)))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User not found"})
	} else {
		response := models.OrganizationProfileResponse{
			Email:         organization.Email,
			Phone:         organization.Phone,
			Name:          organization.Name,
			INN:           organization.INN,
			Address:       organization.ActualAddress,
			FullNameOwner: organization.FullNameOwner,
		}
		c.JSON(http.StatusOK, response)
	}

}
