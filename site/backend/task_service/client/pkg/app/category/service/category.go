package service

import (
	"backend/client/pkg/app/category/model"
	"context"
	"errors"
)

type CategoryServiceInterface interface {
	Update(ctx context.Context, id uint, name string) error
	Create(ctx context.Context, name string) (uint, error)
}

type CategoryService struct {
	categoryRepository model.CategoryRepositoryInterface
}

func NewCategoryService(categoryRepository model.CategoryRepositoryInterface) *CategoryService {
	return &CategoryService{
		categoryRepository: categoryRepository,
	}
}

// Create - Создает новую категорию
func (c *CategoryService) Create(ctx context.Context, name string) (uint, error) {
	// Проверка, что категория с таким именем не существует
	existingCategories, err := c.categoryRepository.FindByName(ctx, name)
	if err != nil {
		return 0, err
	}

	if len(existingCategories) > 0 {
		return 0, errors.New("category already exists")
	}

	// Создаем категорию
	newCategory := model.CategoryModel{
		Name: name,
	}

	id, err := c.categoryRepository.Create(ctx, newCategory)
	if err != nil {
		return 0, err
	}

	return id, nil
}

// Update - Обновляет категорию по ID
func (c *CategoryService) Update(ctx context.Context, id uint, name string) error {
	// Проверка существования категории
	category, err := c.categoryRepository.FindByID(ctx, id)
	if err != nil {
		return err
	}

	// Обновление имени категории
	category.Name = name
	return c.categoryRepository.Update(ctx, id, *category)
}
