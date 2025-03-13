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

func IsUserOwnerOfOrganization(userID, orgID uint) (bool, error) {
	var count int64
	err := db.DB.Model(&UserOrganization{}).
		Where("user_id = ? AND organization_id = ? AND is_owner = ?", userID, orgID, true).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func FindUserOwnerOrganizationByUserId(userId string) (*User, error) {
	var userOrganization UserOrganization
	if err := db.DB.Where("user_id = ? AND is_owner = ?", userId, true).First(&userOrganization).Error; err != nil {
		return nil, err
	}

	var user User

	if err := db.DB.Where("id = ?", userId).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func FindOrganizationByUserIdOwner(userId string) (*Organization, error) {
	var userOrganization UserOrganization
	if err := db.DB.Where("user_id = ? AND is_owner = ?", userId, true).First(&userOrganization).Error; err != nil {
		return nil, err
	}

	var organization Organization

	if err := db.DB.Where("id = ?", userOrganization.OrganizationID).First(&organization).Error; err != nil {
		return nil, err
	}

	return &organization, nil
}
