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

	organizations, err := models.FindOrganizationsAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch organizations"})
		return
	}

	users, err := models.FindUsersAllWithoutOwner()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to fetch users"})
		return
	}

	var result []map[string]interface{}

	for _, user := range users {
		result = append(result, map[string]interface{}{
			"type":          "user",
			"id":            user.ID,
			"email":         user.Email,
			"phone":         user.Phone,
			"surname":       user.Surname,
			"name":          user.Name,
			"patronymic":    user.Patronymic,
			"date_of_birth": user.DateOfBirthday,
			"address":       user.Address,
			"is_admin":      user.IsAdmin,
			"created_at":    user.CreatedAt,
			"updated_at":    user.UpdatedAt,
			"is_blocked":    user.IsBlocked,
		})
	}

	for _, org := range organizations {
		user, err := models.FindUserOwnerOrganizationByOrganizationId(strconv.Itoa(int(org.ID)))
		if err != nil {
			continue
		}
		result = append(result, map[string]interface{}{
			"type":            "organization",
			"id":              org.ID,
			"email":           org.Email,
			"phone":           org.Phone,
			"inn":             org.INN,
			"name":            org.Name,
			"legal_address":   org.LegalAddress,
			"actual_address":  org.ActualAddress,
			"status_id":       org.StatusID,
			"full_name_owner": org.FullNameOwner,
			"created_at":      org.CreatedAt,
			"updated_at":      org.UpdatedAt,
			"is_blocked":      org.IsBlocked,
			"user_id_owner":   user.ID,
		})
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
