package handler

import (
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/infrastructure/middleware/auth"
	"backend/task_service/pkg/infrastructure/response"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func (h *Handler) getTasksUsers(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	page, err1 := strconv.Atoi(c.Param("page"))
	limit, err2 := strconv.Atoi(c.Param("limit"))
	taskID, err3 := strconv.ParseUint(c.Param("id"), 10, 64)
	isCoordinator, err4 := strconv.ParseBool(c.Param("is_coordinator"))
	if err1 != nil || err2 != nil || err3 != nil || err4 != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, "Не удалось распарсить парамтеры")
		return
	}
	var input data.GetTasksUsers

	input.Page = page
	input.Limit = limit
	input.TaskID = uint(taskID)
	input.IsCoordinators = &isCoordinator

	pag, err := h.taskuserQuery.GetUsers(c.Request.Context(), input.TaskID, input.Page, input.Limit, input.IsCoordinators)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"paginate": pag,
	})
}

func (h *Handler) addTasksUsers(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.AddTasksUsers

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.taskuserService.Add(c.Request.Context(), input.UserID, input.TaskID, input.IsCoordinator)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"ssucc": "true",
	})
}

func (h *Handler) deleteTasksUsers(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.DeleteTasksUsers

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.taskuserService.Delete(c.Request.Context(), input.UserID, input.TaskID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"ssucc": "true",
	})
}
