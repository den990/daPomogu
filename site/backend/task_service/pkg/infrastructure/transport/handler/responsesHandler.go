package handler

import (
	"backend/task_service/pkg/app/response/data"
	"backend/task_service/pkg/infrastructure/middleware/auth"
	"backend/task_service/pkg/infrastructure/response"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func (h *Handler) createResponse(c *gin.Context) {
	authUser, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.CreateResponse

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	id, err := h.responseService.Create(c.Request.Context(), input.TaskId, authUser)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"response_id": id,
	})
}

func (h *Handler) getResponses(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	page, err1 := strconv.Atoi(c.Param("page"))
	limit, err2 := strconv.Atoi(c.Param("limit"))
	taskID, err3 := strconv.ParseUint(c.Param("task_id"), 10, 64)
	if err1 != nil || err2 != nil || err3 != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, "Не удалось распарсить параметры")
		return
	}
	var input data.GetResponses
	input.TaskId = uint(taskID)
	input.Page = page
	input.Limit = limit

	// todo переписать под дто, чтобы не было необходимости вносить изменений каждый раз в этой строке
	pag, err := h.responseQuery.Show(c.Request.Context(), input.TaskId, input.Page, input.Limit)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"data": pag,
	})
}

func (h *Handler) getNotConfirmedResponses(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	page, err1 := strconv.Atoi(c.Param("page"))
	limit, err2 := strconv.Atoi(c.Param("limit"))
	taskID, err3 := strconv.ParseUint(c.Param("task_id"), 10, 64)
	if err1 != nil || err2 != nil || err3 != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, "Не удалось распарсить параметры")
		return
	}
	var input data.GetResponses
	input.TaskId = uint(taskID)
	input.Page = page
	input.Limit = limit

	// todo переписать под дто, чтобы не было необходимости вносить изменений каждый раз в этой строке
	pag, err := h.responseQuery.ShowNotConfirmed(c.Request.Context(), input.TaskId, input.Page, input.Limit)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"data": pag,
	})
}

func (h *Handler) getResponse(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, "Не удалось распарсить параметры")
		return
	}

	result, err := h.responseQuery.Get(c.Request.Context(), uint(id))
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"data": result,
	})
}

func (h *Handler) rejectResponse(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.UpdateResponse

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.responseService.Reject(c.Request.Context(), input.ID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"status": "success",
	})
}

func (h *Handler) confirmResponse(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.UpdateResponse

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.responseService.Confirm(c.Request.Context(), input.ID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"status": "success",
	})
}

func (h *Handler) deleteResponse(c *gin.Context) {
	userID, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.DeleteResponse
	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	input.UserID = userID

	err = h.responseService.Delete(c.Request.Context(), input)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"status": "success",
	})
}
