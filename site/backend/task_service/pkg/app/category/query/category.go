package query

import (
	"backend/task_service/pkg/app/category/model"
	"context"
	"errors"
)

type CategoryQueryInterface interface {
	GetAll(ctx context.Context) ([]model.CategoryModel, error)
	FindByID(ctx context.Context, id uint) (*model.CategoryModel, error)
	FindByName(ctx context.Context, name string) ([]model.CategoryModel, error)
}

type CategoryQuery struct {
	categoryRepository model.CategoryRepositoryReadInterface
}

func NewCategoryQuery(categoryRepository model.CategoryRepositoryReadInterface) *CategoryQuery {
	return &CategoryQuery{
		categoryRepository: categoryRepository,
	}
}

// GetAll возвращает все категории
func (q *CategoryQuery) GetAll(ctx context.Context) ([]model.CategoryModel, error) {
	return q.categoryRepository.GetAll(ctx)
}

// FindByID находит категорию по ID
func (q *CategoryQuery) FindByID(ctx context.Context, id uint) (*model.CategoryModel, error) {
	if id == 0 {
		return nil, errors.New("invalid category id")
	}
	return q.categoryRepository.FindByID(ctx, id)
}

// FindByName ищет категории по названию
func (q *CategoryQuery) FindByName(ctx context.Context, name string) ([]model.CategoryModel, error) {
	if name == "" {
		return nil, errors.New("category name is required")
	}
	return q.categoryRepository.FindByName(ctx, name)
}
