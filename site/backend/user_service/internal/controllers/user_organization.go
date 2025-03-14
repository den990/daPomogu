package controllers

import (
	"backend/internal/models"
	"backend/internal/utils"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func AttachUserToOrganization(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var attachOrganization models.AttachOrganization

	if err := c.ShouldBindJSON(&attachOrganization); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input", "error": err.Error()})
		return
	}

	org, err := models.FindActualOrganizationById(attachOrganization.OrganizationID)
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

func DetachUserToOrganization(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var attachOrganization models.AttachOrganization

	if err := c.ShouldBindJSON(&attachOrganization); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input", "error": err.Error()})
		return
	}

	org, err := models.FindActualOrganizationById(attachOrganization.OrganizationID)
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
