package controllers

import (
	"backend/internal/models"
	"backend/internal/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"strconv"
	"time"
)

func GetUserProfileInfo(c *gin.Context) {
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
		var err error
		userID, err = utils.GetUserIDFromToken(c)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}

	}

	user, err := models.FindUserById(strconv.Itoa(int(userID)))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User not found"})
	} else {
		response := models.UserProfileResponse{
			Name:           user.Name,
			Surname:        user.Surname,
			Patronymic:     user.Patronymic,
			DateOfBirthday: user.DateOfBirthday.Format(time.DateOnly),
			Address:        user.Address,
		}
		c.JSON(http.StatusOK, response)
	}

}

func UpdateUser(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var userData models.UserUpdate
	if err := c.ShouldBindJSON(&userData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input", "error": err.Error()})
		return
	}

	isAdmin, err := models.IsAdmin(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unable to determine user role"})
		return
	}

	userIDParam := c.Param("id")
	if userIDParam != "" {
		_, err := strconv.ParseUint(userIDParam, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
			return
		}

		if !isAdmin {
			c.JSON(http.StatusForbidden, gin.H{"message": "Access denied"})
			return
		}

		if err := models.UpdateUser(userIDParam, userData); err != nil {
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

		if err := models.UpdateUser(strconv.Itoa(int(org.ID)), userData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Organization updated successfully"})
	}
}

func ChangePassword(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var userPassword models.UserPasswordUpdate
	if err := c.ShouldBindJSON(&userPassword); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input", "error": err.Error()})
		return
	}

	user, err := models.FindUserById(strconv.Itoa(int(userID)))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User not found"})
		return
	}

	if !utils.CheckPassword(userPassword.OldPassword, user.PasswordHash) {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Old password is incorrect"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userPassword.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash new password"})
		return
	}

	if err := models.UpdateUserPassword(strconv.Itoa(int(user.ID)), string(hashedPassword)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})
}
