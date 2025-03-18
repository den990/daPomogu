package handler

import (
	"backend/client/pkg/app/approve/data"
	"backend/client/pkg/infrastructure/middleware/auth"
	"backend/client/pkg/infrastructure/response"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) addApproves(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.CreateApprove

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.approveService.Create(c.Request.Context(), input)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"success": true,
	})
}
