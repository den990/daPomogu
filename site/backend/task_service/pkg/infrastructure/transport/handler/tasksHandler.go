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
	userId, err := auth.GetUserId(c)

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

	orgByTaskId, err := h.organizationQuery.GetOrganization(c.Request.Context(), uint64(task.OrganizationID))

	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	userIds, err := h.taskcategoryQuery.GetUserIDs(c.Request.Context(), task.ID)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	var isRecorded bool
	var responsed bool
	if userId == 0 {
		isRecorded = false
		responsed = false
	} else {
		isRecorded, _ = h.taskuserQuery.IsRecorded(c.Request.Context(), task.ID, userId)
		responsed, _ = h.responseQuery.IsResponsed(c.Request.Context(), task.ID, userId)
	}
	userIdsUint64 := make([]uint64, len(userIds))
	for i, id := range userIds {
		userIdsUint64[i] = uint64(id)
	}

	var roleInTask string
	org, _ := h.organizationQuery.GetOrganizationByOwnerUserID(c.Request.Context(), uint64(userId))
	if org.ID == task.OrganizationID {
		roleInTask = "owner"
	} else {
		isCoordinator, _ := h.taskuserQuery.IsCoordinatorByTaskId(c.Request.Context(), task.ID, userId)
		if isCoordinator {
			roleInTask = "coordinator"
		} else {
			isParticipant, _ := h.taskuserQuery.IsRecorded(c.Request.Context(), task.ID, userId)
			if isParticipant {
				roleInTask = "participant"
			} else {
				roleInTask = "user"
			}
		}
	}

	userOrganization, err := h.taskcategoryQuery.GetUsersByIDS(c.Request.Context(), userIdsUint64)
	if err != nil {
		response.NewErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	recordedCount, err := h.taskuserQuery.GetCountUserWithoutCoordinators(c.Request.Context(), task.ID)

	approve, err := h.approveService.GetByParams(c.Request.Context(), userId, uint(taskID))
	score := uint(0)
	if err != nil {
		log.Println("Error getting approve for user", userId, ":", err)
		score = 0
	} else {
		score = approve.Score
	}

	taskViewModel := model.TaskViewModel{
		ID:                task.ID,
		OrganizationID:    orgByTaskId.ID,
		OrganizationName:  orgByTaskId.Name,
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
		IsRecorded:        isRecorded,
		IsResponse:        responsed,
		RoleInTask:        roleInTask,
		RecordedCount:     recordedCount,
		Points:            score,
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
	userId, err := auth.GetUserId(c)

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

	tasks, total, err := h.taskQuery.Show(c.Request.Context(), userId, page)
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

	page, err1 := strconv.Atoi(c.Param("page"))
	limit, err2 := strconv.Atoi(c.Param("limit"))
	if err1 != nil || err2 != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid page number")
		return
	}

	log.Println("authUser:", authUser)
	var input data.GetTasksByUser
	input.Page = page
	input.Limit = limit
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
	page, err1 := strconv.Atoi(c.Param("page"))
	limit, err2 := strconv.Atoi(c.Param("limit"))
	if err1 != nil || err2 != nil {
		response.NewErrorResponse(c, http.StatusBadRequest, "Invalid page number")
		return
	}

	log.Println("authUser:", authUser)
	var input data.GetTasksByUser
	input.Page = page
	input.Limit = limit

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
