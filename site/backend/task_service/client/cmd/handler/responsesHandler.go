package handler

import (
	"backend/client/pkg/app/response/data"
	"backend/client/pkg/infrastructure/middleware/auth"
	"backend/client/pkg/infrastructure/response"
	"github.com/gin-gonic/gin"
	"net/http"
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

	id, err := h.responseService.Create(c.Request.Context(), input.TaskId, authUser, input.Status)
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

	var input data.Response

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	pag, err := h.responseQuery.Show(c.Request.Context(), input.TaskId)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"data": pag,
	})
}

func (h *Handler) updateResponse(c *gin.Context) {
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

	err = h.responseService.Update(c.Request.Context(), input.ID, input.Status)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"status": "success",
	})
}
