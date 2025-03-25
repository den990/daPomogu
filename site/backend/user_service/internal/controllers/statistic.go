package controllers

import (
	"backend/proto-functions/task"
	"backend/user_service/internal/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) GetStatisticForAdmin(c *gin.Context) {
	_, err := models.IsAdmin(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unable to determine user role"})
		return
	}

	var statisticResponse models.Statistic

	countUser, _ := models.CountUsers()
	statisticResponse.CountUser = uint(countUser)
	countBlockedUser, _ := models.CountBlockedUsers()
	statisticResponse.CountBlockedUsers = uint(countBlockedUser)
	countFinishedTasks, _ := h.grpcClient.GetCountTasksCompleted(c.Request.Context(), &task.Empty{})
	statisticResponse.CountFinishedTasks = uint(countFinishedTasks.Count)
	countActiveTasks, _ := h.grpcClient.GetCountActiveTasks(c.Request.Context(), &task.Empty{})
	statisticResponse.CountActiveTasks = uint(countActiveTasks.Count)

	c.JSON(http.StatusOK, gin.H{"data": statisticResponse})
}
