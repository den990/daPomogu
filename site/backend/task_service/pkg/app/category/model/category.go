package model

import (
	"context"
)

type CategoryModel struct {
	ID   uint   `gorm:"column:id;primaryKey;type:SERIAL;autoIncrement"`
	Name string `gorm:"column:name;not null"`
}

func (CategoryModel) TableName() string {
	return "category"
}

type CategoryRepositoryReadInterface interface {
	GetAll(ctx context.Context) ([]CategoryModel, error)
	FindByID(ctx context.Context, id uint) (*CategoryModel, error)
	FindByName(ctx context.Context, name string) ([]CategoryModel, error)
}

type CategoryRepositoryInterface interface {
	CategoryRepositoryReadInterface
	Create(ctx context.Context, category CategoryModel) (uint, error)
	Update(ctx context.Context, id uint, newData CategoryModel) error
	Delete(ctx context.Context, id uint) error
}
