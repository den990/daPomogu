package models

import (
	"backend/internal/db"
	"strconv"
)

type UserOrganization struct {
	ID             uint `gorm:"primaryKey"`
	UserID         uint `gorm:"not null;index"`
	OrganizationID uint `gorm:"not null;index"`
	IsOwner        bool `gorm:"default:false"`
	IsAccepted     bool `gorm:"default:false"`
}

type AttachOrganization struct {
	OrganizationID string `json:"organization_id" binding:"required"`
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

func AddAttachmentOrganization(userID, orgID string) error {
	userIDUint, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		return err
	}
	orgIDUint, err := strconv.ParseUint(orgID, 10, 32)
	if err != nil {
		return err
	}

	userOrg := UserOrganization{
		UserID:         uint(userIDUint),
		OrganizationID: uint(orgIDUint),
		IsOwner:        false,
		IsAccepted:     false,
	}

	if err := db.DB.Create(&userOrg).Error; err != nil {
		return err
	}
	return nil
}

func RemoveAttachmentOrganization(userID, orgID string) error {
	userIDUint, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		return err
	}
	orgIDUint, err := strconv.ParseUint(orgID, 10, 32)
	if err != nil {
		return err
	}

	if err := db.DB.Where("user_id = ? AND organization_id = ?", uint(userIDUint), uint(orgIDUint)).Delete(&UserOrganization{}).Error; err != nil {
		return err
	}

	return nil
}

func FindRequestsToJoin(orgId string) ([]UserOrganization, error) {
	var requests []UserOrganization

	if err := db.DB.Where("organization_id = ? AND is_accepted = ?", orgId, false).Find(&requests).Error; err != nil {
		return nil, err
	}

	return requests, nil
}

func AcceptAttachment(userID, orgID string) error {
	userIDUint, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		return err
	}

	orgIDUint, err := strconv.ParseUint(orgID, 10, 32)
	if err != nil {
		return err
	}

	if err := db.DB.Model(&UserOrganization{}).
		Where("user_id = ? AND organization_id = ?", uint(userIDUint), uint(orgIDUint)).
		Update("is_accepted", true).Error; err != nil {
		return err
	}

	return nil
}
