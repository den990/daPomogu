package controllers

import (
	"backend/proto-functions/task"
	"backend/user_service/internal/db"
	"backend/user_service/internal/models"
	"backend/user_service/internal/utils"
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

func (h *Handler) ApplyOrganization(c *gin.Context) {
	h.updateOrganizationStatus(c, StatusAccepted, "Organization approved successfully")
}

func (h *Handler) RejectOrganization(c *gin.Context) {
	h.updateOrganizationStatus(c, StatusRejected, "Organization rejected successfully")
}

func (h *Handler) updateOrganizationStatus(c *gin.Context, newStatus uint, successMessage string) {
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
			_, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userFound.ID)))
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

func (h *Handler) GetOrganizationProfileInfo(c *gin.Context) {
	orgIDParam := c.Param("id")
	var organizationId uint

	if orgIDParam != "" {
		parsedID, err := strconv.ParseUint(orgIDParam, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
			return
		}
		organizationId = uint(parsedID)
	} else {
		userID, err := utils.GetUserIDFromToken(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
		orgData, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userID)))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Organization not found"})
			return
		}

		organizationId = orgData.ID
	}
	tasks, _ := h.grpcClient.GetTasksByOrganizationId(c.Request.Context(), &task.TaskOrganizationRequest{Id: uint64(organizationId)})
	var tasksProfile []models.TasksInProfileResponse
	for _, task := range tasks.TaskViewInProfileOrganization {
		tasksProfile = append(tasksProfile, models.TasksInProfileResponse{
			Id:               task.Id,
			Name:             task.Name,
			TaskDate:         task.TaskDate,
			CountCoordinator: task.CountCoordinator,
		})
	}
	isAdmin, _ := models.IsAdmin(c)
	if !isAdmin {
		organization, err := models.FindActualOrganizationById(strconv.Itoa(int(organizationId)))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Organization not found"})
			return
		} else {
			response := models.OrganizationProfileResponse{
				Id:                     strconv.Itoa(int(organization.ID)),
				Email:                  organization.Email,
				Phone:                  organization.Phone,
				Name:                   organization.Name,
				INN:                    organization.INN,
				ActualAddress:          organization.ActualAddress,
				LegalAddress:           organization.LegalAddress,
				FullNameOwner:          organization.FullNameOwner,
				TasksInProfileResponse: tasksProfile,
			}
			c.JSON(http.StatusOK, response)
		}
	} else {
		organization, err := models.FindOrganizationById(strconv.Itoa(int(organizationId)))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Organization not found"})
			return
		} else {
			response := models.OrganizationProfileResponse{
				Email:                  organization.Email,
				Phone:                  organization.Phone,
				Name:                   organization.Name,
				INN:                    organization.INN,
				ActualAddress:          organization.ActualAddress,
				LegalAddress:           organization.LegalAddress,
				FullNameOwner:          organization.FullNameOwner,
				TasksInProfileResponse: tasksProfile,
			}
			c.JSON(http.StatusOK, response)
		}
	}
}

func (h *Handler) UpdateOrganization(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var orgData models.OrganizationRegistration
	if err := c.ShouldBindJSON(&orgData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input", "error": err.Error()})
		return
	}

	isAdmin, err := models.IsAdmin(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unable to determine user role"})
		return
	}

	orgIDParam := c.Param("id")
	if orgIDParam != "" {
		_, err := strconv.ParseUint(orgIDParam, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid organization ID"})
			return
		}

		if !isAdmin {
			c.JSON(http.StatusForbidden, gin.H{"message": "Access denied"})
			return
		}

		if err := models.UpdateOrganization(orgIDParam, orgData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Organization updated successfully"})
	} else {
		org, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userID)))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to find organization"})
			return
		}

		if org == nil {
			c.JSON(http.StatusForbidden, gin.H{"message": "No organization found"})
			return
		}

		if err := models.UpdateOrganization(strconv.Itoa(int(org.ID)), orgData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Organization updated successfully"})
	}
}

func (h *Handler) GetPendingOrganizations(c *gin.Context) {
	isAdmin, err := models.IsAdmin(c)
	if err != nil || !isAdmin {
		c.JSON(http.StatusForbidden, gin.H{"message": "Access denied"})
		return
	}

	organizations, err := models.FindOrganizationsPending()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch organizations"})
		return
	}

	var response []models.GetProfilesOrganizationResponse
	for _, org := range organizations {
		response = append(response, models.GetProfilesOrganizationResponse{
			Id:            strconv.Itoa(int(org.ID)),
			Email:         org.Email,
			Phone:         org.Phone,
			Name:          org.Name,
			INN:           org.INN,
			ActualAddress: org.ActualAddress,
			LegalAddress:  org.LegalAddress,
			FullNameOwner: org.FullNameOwner,
		})
	}

	c.JSON(http.StatusOK, response)
}

func (h *Handler) GetOrganizationAcceptedList(c *gin.Context) {
	pageStr := c.Param("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil || page <= 0 {
		page = 1
	}

	limit := 7
	offset := (page - 1) * limit

	organizations, err := models.FindOrganizationsAccepted(offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch organizations"})
		return
	}

	var response []models.OrganizationList
	for _, org := range organizations {
		response = append(response, models.OrganizationList{
			Id:        strconv.Itoa(int(org.ID)),
			Name:      org.Name,
			CreatedAt: org.CreatedAt.Format(time.DateOnly),
		})
	}

	c.JSON(http.StatusOK, response)
}

func (h *Handler) GetAllOrganizationList(c *gin.Context) {
	_, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	organizations, err := models.FindOrganizationsAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch organizations"})
		return
	}

	var response []models.OrganizationList
	for _, org := range organizations {
		response = append(response, models.OrganizationList{
			Id:        strconv.Itoa(int(org.ID)),
			Name:      org.Name,
			CreatedAt: org.CreatedAt.Format(time.DateOnly),
		})
	}

	c.JSON(http.StatusOK, response)
}
