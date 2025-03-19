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
		if userIDParam == "" {
			response := models.UserProfileResponse{
				Name:           user.Name,
				Surname:        user.Surname,
				Patronymic:     user.Patronymic,
				DateOfBirthday: user.DateOfBirthday.Format(time.DateOnly),
				Address:        user.Address,
				Email:          user.Email,
				Phone:          user.Phone,
			}

			c.JSON(http.StatusOK, response)
		} else {
			response := models.UserProfileOtherResponse{
				Name:           user.Name,
				Surname:        user.Surname,
				Patronymic:     user.Patronymic,
				DateOfBirthday: user.DateOfBirthday.Format(time.DateOnly),
				Address:        user.Address,
			}

			c.JSON(http.StatusOK, response)
		}
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
		c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
	} else {
		if err := models.UpdateUser(strconv.Itoa(int(userID)), userData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
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

func GetAllUsersAndOrganizations(c *gin.Context) {
	_, err := models.IsAdmin(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unable to determine user role"})
		return
	}

	pageStr := c.Param("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil || page <= 0 {
		page = 1
	}

	limit := 7
	offset := (page - 1) * limit

	users, err := models.FindUsersAllWithPagination(offset, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch users"})
		return
	}

	var result []map[string]interface{}

	for _, user := range users {
		isOwner, _ := models.IsUserOwner(strconv.Itoa(int(user.ID)))
		if isOwner {
			organization, _ := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(user.ID)))
			if organization == nil {
				continue
			}
			result = append(result, map[string]interface{}{
				"type":       "organization",
				"id":         user.ID,
				"email":      organization.Email,
				"name":       organization.Name,
				"is_blocked": organization.IsBlocked,
			})
		} else {
			result = append(result, map[string]interface{}{
				"type":       "user",
				"id":         user.ID,
				"email":      user.Email,
				"surname":    user.Surname,
				"is_admin":   user.IsAdmin,
				"name":       user.Name,
				"is_blocked": user.IsBlocked,
			})
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

func BlockUser(c *gin.Context) {
	_, err := models.IsAdmin(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unable to determine user role"})
		return
	}

	userIDParam := c.Param("id")
	isOwner, err := models.IsUserOwner(userIDParam)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed request"})
		return
	}

	if isOwner {
		org, err := models.FindOrganizationByUserIdOwner(userIDParam)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed request"})
			return
		}

		err = models.BlockOrganization(strconv.Itoa(int(org.ID)))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		err = models.BlockUser(userIDParam)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	} else {
		err = models.BlockUser(userIDParam)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"message": "Block successful"})
}

func UnblockUser(c *gin.Context) {
	_, err := models.IsAdmin(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unable to determine user role"})
		return
	}

	userIDParam := c.Param("id")
	isOwner, err := models.IsUserOwner(userIDParam)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed request"})
		return
	}

	if isOwner {
		org, err := models.FindOrganizationByUserIdOwner(userIDParam)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed request"})
			return
		}

		err = models.UnblockOrganization(strconv.Itoa(int(org.ID)))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		err = models.UnblockUser(userIDParam)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	} else {
		err = models.UnblockUser(userIDParam)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Unblock successful"})
}

func GetRequestsToApply(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	organization, err := models.FindOrganizationByUserIdOwner(strconv.Itoa(int(userID)))
	if organization == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Not found organization"})
		return
	}

	requests, err := models.FindRequestsToJoin(strconv.Itoa(int(organization.ID)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to find requests"})
		return
	}
	var userIDs []uint
	for _, request := range requests {
		userIDs = append(userIDs, request.UserID)
	}

	users, err := models.FindUsersByIDs(userIDs)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to find users"})
		return
	}

	var result []map[string]interface{}

	for _, user := range users {
		result = append(result, map[string]interface{}{
			"id":      user.ID,
			"email":   user.Email,
			"phone":   user.Phone,
			"name":    user.Name,
			"surname": user.Surname,
			"address": user.Address,
		})
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}
