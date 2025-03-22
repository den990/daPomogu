package postgres

import (
	organizationmodel "backend/task_service/pkg/app/organization/model"
	"backend/task_service/pkg/app/task/data"
	"backend/task_service/pkg/app/task/model"
	"context"
	"errors"
	"gorm.io/gorm"
	"time"
)

var (
	ErrTaskNotFound = errors.New("task not found")
	ErrUserNotFound = errors.New("user not found")
	ErrCreateTask   = errors.New("failed to create task")
	ErrUpdateTask   = errors.New("failed to update task")
	ErrDeleteTask   = errors.New("failed to delete task")
)

type TaskRepository struct {
	db *gorm.DB
}

func NewTaskPostgresRepository(db *gorm.DB) *TaskRepository {
	return &TaskRepository{
		db: db,
	}
}

func (t *TaskRepository) Create(ctx context.Context, task *data.CreateTask) (uint, error) {
	taskModel := model.TaskModel{
		OrganizationID:    task.OrganizationId,
		Name:              task.Name,
		TypeID:            task.TaskType,
		Description:       task.Description,
		Location:          task.Location,
		TaskDate:          task.TaskDate,
		ParticipantsCount: task.ParticipantsCount,
		MaxScore:          task.MaxScore,
		StatusID:          1,
	}
	res := t.db.WithContext(ctx).Create(&taskModel)

	if res.Error != nil {
		return 0, res.Error
	}

	for _, categoryId := range task.CategoryIds {
		taskCategory := model.TaskCategory{
			TaskID:     taskModel.ID,
			CategoryID: uint(categoryId),
		}
		if err := t.db.WithContext(ctx).Create(&taskCategory).Error; err != nil {
			return 0, err
		}
	}

	for _, coordinateId := range task.CoordinateIds {
		taskUser := model.TaskUser{
			TaskID:        taskModel.ID,
			UserID:        uint(coordinateId),
			IsCoordinator: true,
		}
		if err := t.db.WithContext(ctx).Create(&taskUser).Error; err != nil {
			return 0, err
		}
	}

	return taskModel.ID, nil
}

func (t *TaskRepository) Update(ctx context.Context, task *data.UpdateTask, id uint) error {
	tx := t.db.WithContext(ctx).Begin()

	updateData := map[string]interface{}{}
	if task.Name != "" {
		updateData["name"] = task.Name
	}
	if task.TaskType != 0 {
		updateData["type_id"] = task.TaskType
	}
	if task.Description != "" {
		updateData["description"] = task.Description
	}
	if task.Location != "" {
		updateData["location"] = task.Location
	}
	if task.TaskDate != (time.Time{}) {
		updateData["task_date"] = task.TaskDate
	}
	if task.ParticipantsCount != nil {
		updateData["participants_count"] = *task.ParticipantsCount
	}
	if task.MaxScore != nil {
		updateData["max_score"] = *task.MaxScore
	}

	if len(updateData) > 0 {
		if err := tx.Model(&model.TaskModel{}).Where("id = ?", id).Updates(updateData).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	if err := tx.Where("task_id = ? AND is_coordinator = ?", id, true).Delete(&model.TaskUser{}).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Where("task_id = ?", id).Delete(&model.TaskCategory{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	for _, userID := range task.CoordinateIds {
		newTaskUser := model.TaskUser{
			TaskID:        id,
			UserID:        uint(userID),
			IsCoordinator: true,
		}
		if err := tx.Create(&newTaskUser).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	for _, categoryID := range task.CategoryIds {
		newTaskCategory := model.TaskCategory{
			TaskID:     id,
			CategoryID: uint(categoryID),
		}
		if err := tx.Create(&newTaskCategory).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}

func (t *TaskRepository) Delete(ctx context.Context, id uint) error {
	res := t.db.WithContext(ctx).
		Model(&model.TaskModel{}).
		Where("id = ?", id).
		Update("is_deleted", true)

	if res.Error != nil {
		return ErrDeleteTask
	}

	if res.RowsAffected == 0 {
		return fmt.Errorf("task with id %d not found", id)
	}

	return nil
}

func (t *TaskRepository) Get(ctx context.Context, id uint) (*model.TaskModel, error) {
	var task model.TaskModel

	res := t.db.WithContext(ctx).First(&task, "id = ? AND is_deleted", id, false)
	if res.Error != nil {
		return nil, ErrTaskNotFound
	}

	return &task, nil
}

func (t *TaskRepository) GetAll(
	ctx context.Context,
	user uint,
	isOwner bool,
	organizations []organizationmodel.OrganizationModel,
	page int,
) ([]model.TaskModel, int, error) {
	var tasks []*model.TaskModel
	result := make([]model.TaskModel, 0, len(tasks))
	limit := 3
	offset := (page - 1) * limit

	var totalRecords int64
	var query *gorm.DB

	var orgIDs []uint
	for _, org := range organizations {
		orgIDs = append(orgIDs, org.ID)
	}

	baseQuery := t.db.WithContext(ctx).
		Table("task").
		Joins("JOIN task_type tt ON tt.id = task.type_id").
		Where("task.is_deleted = ?", false)

	if !isOwner {
		baseQuery = baseQuery.Joins("JOIN task_user tu ON tu.task_id = task.id").
			Where("tu.user_id = ?", user)
	}

	if len(orgIDs) > 0 {
		baseQuery = baseQuery.Where("tt.name = 'Открытый' OR (tt.name = 'Закрытый' AND task.organization_id IN ?)", orgIDs)
	} else {
		baseQuery = baseQuery.Where("tt.name = 'Открытый'")
	}

	countQuery := baseQuery
	countQuery.Count(&totalRecords)

	query = baseQuery.Limit(limit).Offset(offset)

	res := query.Find(&tasks)
	if res.Error != nil {
		return nil, 0, res.Error
	}

	for _, task := range tasks {
		result = append(result, *task)
	}

	totalPages := int((totalRecords + int64(limit) - 1) / int64(limit))

	return result, totalPages, nil
}

func (t *TaskRepository) GetTasksByUserIDWithStatuses(
	ctx context.Context,
	userID uint,
	taskStatuses []uint,
	page int,
	limit int,
) ([]model.TaskModel, int, error) {
	tasks := make([]model.TaskModel, 0, limit)

	query := t.db.WithContext(ctx).
		Model(model.TaskModel{}).
		Joins("JOIN task_user tu ON tu.task_id = task.id").
		Where("tu.user_id = ?", userID).
		Where("task.status_id IN (?)", taskStatuses).
		Where("task.is_deleted = ?", false)

	var total int64
	if err := query.Model(&model.TaskModel{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}
	totalPages := int((total + int64(limit) - 1) / int64(limit))

	res := query.
		Offset((page - 1) * limit).
		Limit(limit).
		Find(&tasks)
	if res.Error != nil {
		return nil, 0, res.Error
	}

	return tasks, totalPages, nil
}
