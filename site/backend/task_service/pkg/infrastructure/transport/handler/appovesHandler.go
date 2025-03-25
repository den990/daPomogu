package handler

import (
	"backend/task_service/pkg/app/approve/data"
	"backend/task_service/pkg/infrastructure/middleware/auth"
	"backend/task_service/pkg/infrastructure/response"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func (h *Handler) getAllByTaskID(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.ShowApproves
	page, err1 := strconv.Atoi(c.Param("page"))
	limit, err2 := strconv.Atoi(c.Param("limit"))
	taskID, err3 := strconv.ParseUint(c.Param("id"), 10, 64)
	if err1 != nil || err2 != nil || err3 != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, "Не удалось распарсить параметры")
		return
	}

	input.Page = uint(page)
	input.Limit = uint(limit)
	input.TaskID = uint(taskID)

	pag, err := h.approveService.Show(c.Request.Context(), input)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"pagination": pag,
	})
}

func (h *Handler) getResponseById(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.GetResponseById
	taskID, err3 := strconv.ParseUint(c.Param("id"), 10, 64)
	if err3 != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, "Не удалось распарсить параметры")
		return
	}

	input.Id = uint(taskID)

	approve, err := h.approveService.Get(c.Request.Context(), input.Id)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"approve": approve,
	})
}

func (h *Handler) addApproves(c *gin.Context) {
	userID, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.CreateApprove

	taskIDParam := c.DefaultPostForm("task_id", "")
	taskID, err := strconv.ParseUint(taskIDParam, 10, 0)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	input.UserID = userID
	input.TaskID = uint(taskID)

	file, _, err := c.Request.FormFile("image")
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	input.File = file

	id, err := h.approveService.Create(c.Request.Context(), input)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"success": true,
		"id":      id,
	})
}

func (h *Handler) rejectApproves(c *gin.Context) {
	userID, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.RejectApprove

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.approveService.Reject(c.Request.Context(), input, userID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"success": true,
	})
}

func (h *Handler) confirmApproves(c *gin.Context) {
	userID, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.ConfirmApprove

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.approveService.Confirm(c.Request.Context(), input, userID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"success": true,
	})
}
