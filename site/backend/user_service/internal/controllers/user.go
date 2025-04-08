package controllers

import (
	pb "backend/proto-functions/task"
	"backend/user_service/internal/models"
	"backend/user_service/internal/utils"
	"encoding/base64"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"io/ioutil"
	"math"
	"net/http"
	"sort"
	"strconv"
	"time"
)

func (h *Handler) GetUserProfileInfo(c *gin.Context) {
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
	countTasks, _ := h.grpcClient.GetCountTasksCompletedByUserId(c.Request.Context(), &pb.TaskUserRequest{Id: uint64(userID)})
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
				CountTasks:     strconv.FormatUint(countTasks.Count, 10),
			}

			c.JSON(http.StatusOK, response)
		} else {
			response := models.UserProfileOtherResponse{
				Name:           user.Name,
				Surname:        user.Surname,
				Patronymic:     user.Patronymic,
				DateOfBirthday: user.DateOfBirthday.Format(time.DateOnly),
				Address:        user.Address,
				CountTasks:     strconv.FormatUint(countTasks.Count, 10),
			}

			c.JSON(http.StatusOK, response)
		}
	}

}

func (h *Handler) UpdateUser(c *gin.Context) {
	userID, err := utils.GetUserIDFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var userData models.UserUpdate
	if err := c.ShouldBind(&userData); err != nil {
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
		userIdParamUint, err := strconv.ParseUint(userIDParam, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
			return
		}

		if !isAdmin {
			c.JSON(http.StatusForbidden, gin.H{"message": "Access denied"})
			return
		}
		if userData.Avatar != nil {
			file, err := userData.Avatar.Open()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to open avatar file"})
				return
			}
			defer file.Close()

			fileBytes, err := ioutil.ReadAll(file)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to read avatar file"})
				return
			}

			uploadStatus, error := h.grpcClient.UploadImage(c.Request.Context(), &pb.ImageChunk{Chunk: fileBytes, Target: &pb.ImageChunk_UserId{UserId: userIdParamUint}})
			if error != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload image", "error": err.Error()})
				return
			}
			userData.AvatarId = uint(uploadStatus.FileId)
		}

		if err := models.UpdateUser(userIDParam, userData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
	} else {
		if userData.Avatar != nil {
			file, err := userData.Avatar.Open()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to open avatar file"})
				return
			}
			defer file.Close()

			fileBytes, err := ioutil.ReadAll(file)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Unable to read avatar file"})
				return
			}

			uploadStatus, error := h.grpcClient.UploadImage(c.Request.Context(), &pb.ImageChunk{Chunk: fileBytes, Target: &pb.ImageChunk_UserId{UserId: uint64(userID)}})
			if error != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload image", "error": err.Error()})
				return
			}
			userData.AvatarId = uint(uploadStatus.FileId)
		}

		if err := models.UpdateUser(strconv.Itoa(int(userID)), userData); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
	}
}

func (h *Handler) ChangePassword(c *gin.Context) {
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

func (h *Handler) GetAllUsersAndOrganizations(c *gin.Context) {
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

	limit := 5
	offset := (page - 1) * limit

	countAllUsers, _ := models.CountUsers()
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
			avatar, err := h.grpcClient.GetAvatarImage(c.Request.Context(), &pb.DownloadImageRequest{Target: &pb.DownloadImageRequest_OrganizationId{OrganizationId: uint64(organization.ID)}})
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get avatar"})
				return
			}
			avatarBase64 := base64.StdEncoding.EncodeToString(avatar.ImageData)
			result = append(result, map[string]interface{}{
				"type":          "organization",
				"id":            user.ID,
				"email":         organization.Email,
				"name":          organization.Name,
				"is_blocked":    organization.IsBlocked,
				"avatar_base64": "data:image/jpeg;base64," + avatarBase64,
			})
		} else {
			avatar, err := h.grpcClient.GetAvatarImage(c.Request.Context(), &pb.DownloadImageRequest{Target: &pb.DownloadImageRequest_UserId{UserId: uint64(user.ID)}})
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get avatar"})
				return
			}
			avatarBase64 := base64.StdEncoding.EncodeToString(avatar.ImageData)
			result = append(result, map[string]interface{}{
				"type":          "user",
				"id":            user.ID,
				"email":         user.Email,
				"surname":       user.Surname,
				"is_admin":      user.IsAdmin,
				"name":          user.Name,
				"is_blocked":    user.IsBlocked,
				"avatar_base64": "data:image/jpeg;base64," + avatarBase64,
			})
		}
	}
	sort.Slice(result, func(i, j int) bool {
		return result[i]["id"].(uint) < result[j]["id"].(uint)
	})
	totalPages := int(math.Ceil(float64(countAllUsers) / float64(limit)))
	c.JSON(http.StatusOK, gin.H{"data": result, "total_pages": totalPages})
}

func (h *Handler) BlockUser(c *gin.Context) {
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

func (h *Handler) UnblockUser(c *gin.Context) {
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

func (h *Handler) GetRequestsToApply(c *gin.Context) {
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
		avatar, err := h.grpcClient.GetAvatarImage(c.Request.Context(), &pb.DownloadImageRequest{Target: &pb.DownloadImageRequest_UserId{UserId: uint64(user.ID)}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get avatar"})
			return
		}
		avatarBase64 := base64.StdEncoding.EncodeToString(avatar.ImageData)
		result = append(result, map[string]interface{}{
			"id":            user.ID,
			"email":         user.Email,
			"phone":         user.Phone,
			"name":          user.Name,
			"surname":       user.Surname,
			"address":       user.Address,
			"avatar_base64": "data:image/jpeg;base64," + avatarBase64,
		})
	}

	c.JSON(http.StatusOK, gin.H{"data": result})
}

func (h *Handler) GetUserAvatar(c *gin.Context) {
	userIDParam := c.Param("id")
	userID, err := utils.GetUserIDFromToken(c)
	if userIDParam == "" && err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}

	var avatarData []byte
	if userIDParam == "" {
		avatarResponse, err := h.grpcClient.GetAvatarImage(c.Request.Context(), &pb.DownloadImageRequest{Target: &pb.DownloadImageRequest_UserId{UserId: uint64(userID)}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve avatar", "error": err.Error()})
			return
		}
		avatarData = avatarResponse.ImageData
	} else {
		parsedID, err := strconv.ParseUint(userIDParam, 10, 32)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
			return
		}
		avatarResponse, err := h.grpcClient.GetAvatarImage(c.Request.Context(), &pb.DownloadImageRequest{Target: &pb.DownloadImageRequest_UserId{UserId: parsedID}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve avatar", "error": err.Error()})
			return
		}
		avatarData = avatarResponse.ImageData
	}

	if avatarData == nil || len(avatarData) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "Avatar not found"})
		return
	}

	c.Data(http.StatusOK, "image/jpeg", avatarData)
}
