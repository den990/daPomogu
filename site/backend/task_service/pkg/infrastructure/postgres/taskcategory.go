package postgres

import (
	"backend/task_service/pkg/app/task/model"
	"context"
	"errors"
	"gorm.io/gorm"
)

type TaskCategoryRepository struct {
	db *gorm.DB
}

func NewTaskCategoryPostgresRepository(db *gorm.DB) *TaskCategoryRepository {
	return &TaskCategoryRepository{db: db}
}

func (tu *TaskCategoryRepository) GetCategories(
	ctx context.Context,
	taskID uint,
) ([]model.TaskViewCategory, error) {
	var taskCategories []model.TaskCategory
	query := tu.db.WithContext(ctx).Where("task_id = ?", taskID).Find(&taskCategories)

	if query.Error != nil {
		return nil, query.Error
	}

	if len(taskCategories) == 0 {
		return []model.TaskViewCategory{}, nil
	}

	var categoryIDs []uint
	for _, tc := range taskCategories {
		categoryIDs = append(categoryIDs, tc.CategoryID)
	}

	var categories []model.TaskViewCategory
	query = tu.db.WithContext(ctx).
		Table("category").
		Where("id IN ?", categoryIDs).
		Select("id, name").
		Scan(&categories)

	if query.Error != nil {
		return nil, query.Error
	}

	return categories, nil
}

func (tc *TaskCategoryRepository) GetUserIDs(ctx context.Context, taskID uint) ([]int, error) {
	var userIDs []int

	if err := tc.db.WithContext(ctx).
		Table("task_user").
		Where("task_id = ?", taskID).
		Pluck("user_id", &userIDs).Error; err != nil {
		return nil, err
	}

	return userIDs, nil
}

func (tc *TaskCategoryRepository) Add(ctx context.Context, categoryID, taskID uint) error {
	if isExist, err := tc.isExist(ctx, categoryID, taskID); err != nil || !isExist {
		return err
	}
	taskcategory := model.TaskCategory{
		TaskID:     taskID,
		CategoryID: categoryID,
	}

	res := tc.db.WithContext(ctx).Create(&taskcategory)

	return res.Error
}

func (tc *TaskCategoryRepository) Delete(ctx context.Context, categoryID, taskID uint) error {
	if isExist, err := tc.isExist(ctx, categoryID, taskID); err != nil || !isExist {
		return err
	}
	taskcategory := model.TaskCategory{
		TaskID:     taskID,
		CategoryID: categoryID,
	}
	res := tc.db.WithContext(ctx).Delete(&taskcategory)

	return res.Error
}

func (tc *TaskCategoryRepository) isExist(ctx context.Context, categoryID, taskID uint) (bool, error) {
	var existing model.TaskCategory

	err := tc.db.WithContext(ctx).
		Where("task_id = ? AND category_id = ?", taskID, categoryID).
		First(&existing).Error

	if err == nil {
		return true, nil
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return false, nil
	}

	return false, err
}

func (tc *TaskCategoryRepository) DeleteAllByTaskID(ctx context.Context, taskId uint) error {
	if err := tc.db.WithContext(ctx).Where("task_id = ?", taskId).Delete(&model.TaskCategory{}).Error; err != nil {
		return err
	}
	return nil
}
