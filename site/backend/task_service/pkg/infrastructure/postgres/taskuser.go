package postgres

import (
	"backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"errors"
	"gorm.io/gorm"
)

type TaskUserRepository struct {
	db *gorm.DB
}

func NewTaskUserPostgresRepository(db *gorm.DB) *TaskUserRepository {
	return &TaskUserRepository{db: db}
}

func (tu *TaskUserRepository) GetUsers(
	ctx context.Context,
	taskID uint,
	page int,
	limit int,
	isCoordinators *bool,
) ([]model.TaskUser, int, error) {
	var taskUsers []model.TaskUser
	query := tu.db.WithContext(ctx).Where("task_id = ?", taskID)

	if isCoordinators != nil {
		query = query.Where("is_coordinator = ?", *isCoordinators)
	}

	var total int64
	if err := query.Model(&model.TaskUser{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	// todo: вынести в сервис
	if limit <= paginate.MinLimit {
		limit = paginate.DefaultLimit
	}

	if page <= paginate.MinPage {
		page = paginate.DefaultPage
	}

	offset := (page - 1) * limit
	if err := query.Offset(offset).Limit(limit).Find(&taskUsers).Error; err != nil {
		return nil, 0, err
	}

	return taskUsers, totalPages, nil
}

func (tu *TaskUserRepository) Add(ctx context.Context, userID, taskID uint, isCoordinator bool) error {
	if isExist, err := tu.isExist(ctx, userID, taskID); err != nil || !isExist {
		return err
	}
	return tu.Create(ctx, userID, taskID, isCoordinator)
}

func (tu *TaskUserRepository) Create(ctx context.Context, userID, taskID uint, isCoordinator bool) error {
	taskuser := model.TaskUser{
		TaskID:        taskID,
		UserID:        userID,
		IsCoordinator: isCoordinator,
	}

	res := tu.db.WithContext(ctx).Model(&model.TaskUser{}).Create(&taskuser)

	return res.Error
}

func (tu *TaskUserRepository) Delete(ctx context.Context, userID, taskID uint) error {
	isExist, err := tu.isExist(ctx, userID, taskID)
	if err != nil {
		return err
	}
	if !isExist {
		return nil
	}

	res := tu.db.WithContext(ctx).Where("task_id = ? AND user_id = ?", taskID, userID).Delete(&model.TaskUser{})
	if res.Error != nil {
		return res.Error
	}

	if res.RowsAffected == 0 {
		return errors.New("no rows affected")
	}

	return nil
}

func (tu *TaskUserRepository) isExist(ctx context.Context, userID, taskID uint) (bool, error) {
	var existing model.TaskUser

	err := tu.db.WithContext(ctx).
		Where("task_id = ? AND user_id = ?", taskID, userID).
		First(&existing).Error

	if err == nil {
		return true, nil
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return false, nil
	}

	return false, err
}

func (tu *TaskUserRepository) DeleteAllByUserID(ctx context.Context, userID uint) error {
	if err := tu.db.WithContext(ctx).Where("user_id = ?", userID).Delete(&model.TaskUser{}).Error; err != nil {
		return err
	}
	return nil
}

func (tu *TaskUserRepository) GetCountUserWithoutCoordinators(ctx context.Context, taskId uint) (int, error) {
	var count int64
	err := tu.db.WithContext(ctx).
		Model(&model.TaskUser{}).
		Where("task_id = ? AND is_coordinator = ?", taskId, false).
		Count(&count).Error

	if err != nil {
		return 0, err
	}

	return int(count), nil
}

func (tu *TaskUserRepository) IsRecorded(ctx context.Context, taskId, userId uint) (bool, error) {
	var taskUser model.TaskUser
	err := tu.db.WithContext(ctx).
		Model(&model.TaskUser{}).
		Where("task_id = ? AND is_coordinator = ? AND user_id = ?", taskId, false, userId).
		First(&taskUser).Error
	if err != nil {
		return false, err
	}
	return true, nil
}

func (tu *TaskUserRepository) IsCoordinatorByTaskId(ctx context.Context, taskId, userId uint) (bool, error) {
	var taskUser model.TaskUser
	err := tu.db.WithContext(ctx).
		Model(&model.TaskUser{}).
		Where("task_id = ? AND is_coordinator = ? AND user_id = ?", taskId, true, userId).
		First(&taskUser).Error
	if err != nil {
		return false, err
	}
	return true, nil
}

func (tu *TaskUserRepository) GetByParams(ctx context.Context, taskId, userId uint) (model.TaskUser, error) {
	var taskUser model.TaskUser
	err := tu.db.WithContext(ctx).
		Model(&model.TaskUser{}).
		Where("task_id = ? AND user_id = ?", taskId, userId).
		First(&taskUser).Error
	if err != nil {
		return model.TaskUser{}, err
	}
	return taskUser, nil
}
