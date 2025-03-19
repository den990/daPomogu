package postgres

import (
	"backend/client/pkg/app/category/model"
	"context"
	"gorm.io/gorm"
)

type CategoryRepository struct {
	db *gorm.DB
}

func NewCategoryRepository(db *gorm.DB) *CategoryRepository {
	return &CategoryRepository{
		db: db,
	}
}

func (r *CategoryRepository) Create(ctx context.Context, category model.CategoryModel) (uint, error) {
	res := r.db.WithContext(ctx).Create(&category)
	if res.Error != nil {
		return 0, res.Error
	}
	return category.ID, nil
}

func (r *CategoryRepository) GetAll(ctx context.Context) ([]model.CategoryModel, error) {
	var categories []model.CategoryModel
	res := r.db.WithContext(ctx).Find(&categories)
	if res.Error != nil {
		return nil, res.Error
	}
	return categories, nil
}

func (r *CategoryRepository) FindByID(ctx context.Context, id uint) (*model.CategoryModel, error) {
	var category model.CategoryModel
	res := r.db.WithContext(ctx).First(&category, id)
	if res.Error != nil {
		return nil, res.Error
	}
	return &category, nil
}

// FindByName - Ищет категории по названию
func (r *CategoryRepository) FindByName(ctx context.Context, name string) ([]model.CategoryModel, error) {
	var categories []model.CategoryModel
	res := r.db.WithContext(ctx).Where("name LIKE ?", "%"+name+"%").Find(&categories)
	if res.Error != nil {
		return nil, res.Error
	}
	return categories, nil
}

// Update - Обновляет категорию по ID
func (r *CategoryRepository) Update(ctx context.Context, id uint, newData model.CategoryModel) error {
	var category model.CategoryModel
	res := r.db.WithContext(ctx).First(&category, id)
	if res.Error != nil {
		return res.Error
	}

	// Обновляем только имя
	category.Name = newData.Name
	res = r.db.WithContext(ctx).Save(&category)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

// Delete - Удаляет категорию по ID
func (r *CategoryRepository) Delete(ctx context.Context, id uint) error {
	var category model.CategoryModel
	res := r.db.WithContext(ctx).First(&category, id)
	if res.Error != nil {
		return res.Error
	}

	res = r.db.WithContext(ctx).Delete(&category)
	if res.Error != nil {
		return res.Error
	}
	return nil
}
