package models

import "backend/internal/db"

type UserOrganization struct {
	ID             uint `gorm:"primaryKey"`
	UserID         uint `gorm:"not null;index"`
	OrganizationID uint `gorm:"not null;index"`
	IsOwner        bool `gorm:"default:false"`
}

func (UserOrganization) TableName() string {
	return "user_organization"
}

func FindUserOrganizationByUserId(userId string) (*UserOrganization, error) {
	var userOrganization UserOrganization
	if err := db.DB.Where("user_id = ?", userId).First(&userOrganization).Error; err != nil {
		return nil, err
	}

	return &userOrganization, nil
}
