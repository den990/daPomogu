package controllers

import (
	pb "backend/proto-functions/task"
	"backend/user_service/internal/models"
	"backend/user_service/internal/utils"
	"encoding/base64"
	"github.com/gin-gonic/gin"
	"math"
	"net/http"
	"strconv"
)

func (h *Handler) AttachUserToOrganization(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	organizationIdParam := c.Param("id")
	if organizationIdParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Empty organization"})
		return
	}

	org, err := models.FindActualOrganizationById(organizationIdParam)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Organization not found"})
		return
	}

	err = models.AddAttachmentOrganization(strconv.Itoa(int(userID)), strconv.Itoa(int(org.ID)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to attach user to organization", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User successfully attached to organization"})
}

func (h *Handler) DetachUserToOrganization(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	organizationIdParam := c.Param("id")
	if organizationIdParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Empty organization"})
		return
	}

	org, err := models.FindActualOrganizationById(organizationIdParam)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Organization not found"})
		return
	}

	err = models.RemoveAttachmentOrganization(strconv.Itoa(int(userID)), strconv.Itoa(int(org.ID)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to attach user to organization", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User successfully attached to organization"})
}

func (h *Handler) GetRequestsToOrganization(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	org, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userID)))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Not found organization"})
		return
	}

	requestsJoin, err := models.FindRequestsToJoin(strconv.Itoa(int(org.ID)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get join requests"})
		return
	}

	var userIDs []uint
	for _, request := range requestsJoin {
		userIDs = append(userIDs, request.UserID)
	}

	users, err := models.FindUsersByIDs(userIDs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch users"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"requests": users})
}

func (h *Handler) AcceptUserAttachment(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	org, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userID)))
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"message": "You are not the owner of any organization"})
		return
	}

	userIDParam := c.Param("user_id")
	if userIDParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User ID is required"})
		return
	}

	err = models.AcceptAttachment(userIDParam, strconv.Itoa(int(org.ID)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to accept user attachment", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User successfully accepted into organization"})
}

func (h *Handler) RejectUserAttachment(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	org, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userID)))
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"message": "You are not the owner of any organization"})
		return
	}

	userIDParam := c.Param("user_id")
	if userIDParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User ID is required"})
		return
	}

	err = models.RejectAttachment(userIDParam, strconv.Itoa(int(org.ID)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to reject user attachment", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User successfully accepted into organization"})
}

func (h *Handler) GetUsersInOrganization(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	pageStr := c.Param("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil || page <= 0 {
		page = 1
	}

	limit := 6
	offset := (page - 1) * limit
	org, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userID)))
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"message": "You are not the owner of any organization"})
		return
	}

	users, total, err := models.FindUsersByOrganizationId(strconv.Itoa(int(org.ID)), limit, offset)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"message": err})
		return
	}

	var result []map[string]interface{}
	for _, user := range users {
		avatar, err := h.grpcClient.GetAvatarImage(c.Request.Context(), &pb.DownloadImageRequest{
			Target: &pb.DownloadImageRequest_UserId{UserId: uint64(user.ID)},
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get avatar"})
			return
		}
		avatarBase64 := base64.StdEncoding.EncodeToString(avatar.ImageData)

		result = append(result, map[string]interface{}{
			"id":            user.ID,
			"name":          user.Name,
			"surname":       user.Surname,
			"patronymic":    user.Patronymic,
			"avatar_base64": "data:image/jpeg;base64," + avatarBase64,
		})
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	c.JSON(http.StatusOK, gin.H{
		"data":        result,
		"total_pages": totalPages,
	})
}
