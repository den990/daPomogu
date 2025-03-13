package controllers

import (
	"backend/internal/models"
	"github.com/gin-gonic/gin"
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
		jwtUserID, exists := c.Get("user_id")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			return
		}
		userID = jwtUserID.(uint)
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
