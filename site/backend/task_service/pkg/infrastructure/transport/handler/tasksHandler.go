package handler

import (
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/infrastructure/middleware/auth"
	"backend/task_service/pkg/infrastructure/response"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

func (h *Handler) createTask(c *gin.Context) {
	userId, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	log.Printf("Получили id из токена %d", userId)
	var input data.CreateTask

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	id, err := h.taskService.Create(c.Request.Context(), &input, userId)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"task_id": id,
	})
}

func (h *Handler) updateTask(c *gin.Context) {
	userId, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	taskIDParam := c.Param("id")

	if taskIDParam == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	taskID, err := strconv.ParseUint(taskIDParam, 10, 64)
	if err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid task ID")
		return
	}

	var input data.UpdateTask

	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	err = h.taskService.Update(c.Request.Context(), &input, uint(taskID), userId)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}

func (h *Handler) deleteTask(c *gin.Context) {
	userId, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	taskIDParam := c.Param("id")

	if taskIDParam == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	taskID, err := strconv.ParseUint(taskIDParam, 10, 64)
	if err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid task ID")
		return
	}

	err = h.taskService.Delete(c.Request.Context(), uint(taskID), userId)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "task deleted"})
}

func (h *Handler) getTask(c *gin.Context) {
	_, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	taskIDParam := c.Param("id")

	if taskIDParam == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	taskID, err := strconv.ParseUint(taskIDParam, 10, 64)
	if err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid task ID")
		return
	}

	task, err := h.taskQuery.Get(c.Request.Context(), uint(taskID))
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	taskCategory, err := h.taskcategoryQuery.GetCategories(c.Request.Context(), task.ID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	org, err := h.organizationQuery.GetOrganization(c.Request.Context(), uint64(task.OrganizationID))

	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	userIds, err := h.taskcategoryQuery.GetUserIDs(c.Request.Context(), task.ID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	userIdsUint64 := make([]uint64, len(userIds))
	for i, id := range userIds {
		userIdsUint64[i] = uint64(id)
	}

	userOrganization, err := h.taskcategoryQuery.GetUsersByIDS(c.Request.Context(), userIdsUint64)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	taskViewModel := model.TaskViewModel{
		ID:                task.ID,
		OrganizationID:    task.OrganizationID,
		OrganizationName:  org.Name,
		Name:              task.Name,
		TypeID:            task.TypeID,
		Description:       task.Description,
		Location:          task.Location,
		TaskDate:          task.TaskDate,
		ParticipantsCount: task.ParticipantsCount,
		MaxScore:          task.MaxScore,
		StatusID:          task.StatusID,
		CreatedAt:         task.CreatedAt,
		UpdatedAt:         task.UpdatedAt,
		Coordinators:      []model.TaskViewCoordinator{},
		Categories:        []model.TaskViewCategory{},
	}

	for _, category := range taskCategory {
		taskViewModel.Categories = append(taskViewModel.Categories, model.TaskViewCategory{
			ID:   category.ID,
			Name: category.Name,
		})
	}

	for _, user := range userOrganization {
		var surname string
		if user.Surname != nil {
			surname = *user.Surname
		}

		taskViewModel.Coordinators = append(taskViewModel.Coordinators, model.TaskViewCoordinator{
			ID:      user.ID,
			Name:    user.Name,
			Surname: surname,
		})
	}

	c.JSON(http.StatusOK, taskViewModel)
}

func (h *Handler) getTasks(c *gin.Context) {
	authUser, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	pageStr := c.Param("page")
	if pageStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Empty organization"})
		return
	}

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid page number")
		return
	}

	tasks, total, err := h.taskQuery.Show(c.Request.Context(), authUser, page)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tasks, "total_pages": total})
}

func (h *Handler) getOpenedTasks(c *gin.Context) {
	authUser, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	log.Println("authUser:", authUser)
	var input data.GetTasksByUser
	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}
	log.Println("input", input)

	tasks, err := h.taskQuery.GetCurrentTasks(c.Request.Context(), input, authUser)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tasks})
}

func (h *Handler) getClosedTasks(c *gin.Context) {
	authUser, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	var input data.GetTasksByUser
	if err := c.BindJSON(&input); err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	tasks, err := h.taskQuery.GetFinishedTasks(c.Request.Context(), input, authUser)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tasks})
}

func (h *Handler) completeTask(c *gin.Context) {
	userId, err := auth.GetUserId(c)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	taskIDParam := c.Param("id")

	if taskIDParam == "" {
		response.NewErrorResponse(c, http.StatusBadRequest, InvalidInputBodyErr)
		return
	}

	taskID, err := strconv.ParseUint(taskIDParam, 10, 64)
	if err != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid task ID")
		return
	}

	err = h.taskService.Complete(c.Request.Context(), uint(taskID), userId)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{})
}
