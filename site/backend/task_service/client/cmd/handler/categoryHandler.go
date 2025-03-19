package handler

import (
	"backend/client/pkg/app/category/data"
	"backend/client/pkg/infrastructure/middleware/auth"
	"backend/client/pkg/infrastructure/response"
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) createCategory(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.CreateCategory
	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid input body")
		return
	}

	id, err := h.categoryService.Create(c.Request.Context(), input.Name)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"category_id": id,
	})
}

func (h *Handler) getCategories(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	categories, err := h.categoryQuery.GetAll(c.Request.Context())
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"data": categories,
	})
}

func (h *Handler) searchCategoriesByName(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	name := c.DefaultQuery("name", "")
	if name == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, "Name query parameter is required")
		return
	}

	categories, err := h.categoryQuery.FindByName(c.Request.Context(), name)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"data": categories,
	})
}

func (h *Handler) updateCategory(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var input data.UpdateCategory
	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid input body")
		return
	}

	err = h.categoryService.Update(c.Request.Context(), input.ID, input.Name)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"status": "success",
	})
}
