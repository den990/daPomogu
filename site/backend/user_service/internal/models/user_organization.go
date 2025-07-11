package models

import (
	"backend/user_service/internal/db"
	"strconv"
)

type UserOrganization struct {
	ID             uint `gorm:"column:id;primaryKey"`
	UserID         uint `gorm:"column:user_id;not null;index"`
	OrganizationID uint `gorm:"column:organization_id;not null;index"`
	IsOwner        bool `gorm:"column:is_owner;default:false"`
	IsAccepted     bool `gorm:"column:is_accepted;default:false"`
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

	orgId := strconv.Itoa(int(userOrganization.OrganizationID))
	organization, err := FindActualOrganizationById(orgId)
	if err != nil {
		return nil, err
	}

	return organization, nil
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

	if err := db.DB.Where("organization_id = ? AND is_accepted = ? AND is_owner = ?", orgId, false, false).Find(&requests).Error; err != nil {
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

func RejectAttachment(userID, orgID string) error {
	userIDUint, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		return err
	}

	orgIDUint, err := strconv.ParseUint(orgID, 10, 32)
	if err != nil {
		return err
	}

	if err := db.DB.
		Where("user_id = ? AND organization_id = ?", uint(userIDUint), uint(orgIDUint)).
		Delete(&UserOrganization{}).Error; err != nil {
		return err
	}

	return nil
}

func IsUserOwner(userID string) (bool, error) {
	var count int64
	err := db.DB.Model(&UserOrganization{}).
		Where("user_id = ? AND is_owner = ?", userID, true).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func FindUserOwnerOrganizationByOrganizationId(orgId string) (*User, error) {
	var userOrganization UserOrganization
	if err := db.DB.Where("organization_id = ? AND is_owner = ?", orgId, true).First(&userOrganization).Error; err != nil {
		return nil, err
	}

	var user User

	if err := db.DB.Where("id = ?", orgId).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func FindOrganizationsByUserId(userId string) ([]UserOrganization, error) {
	var userOrganization []UserOrganization
	if err := db.DB.Where("user_id = ? AND is_owner = ? AND is_accepted = ?", userId, false, true).Find(&userOrganization).Error; err != nil {
		return nil, err
	}

	return userOrganization, nil
}

func FindUsersByOrganizationId(orgId string, limit, offset int) ([]User, int64, error) {
	var userOrganizations []UserOrganization
	if err := db.DB.
		Where("organization_id = ? AND is_owner = ? AND is_accepted = ?", orgId, false, true).
		Find(&userOrganizations).Error; err != nil {
		return nil, 0, err
	}

	if len(userOrganizations) == 0 {
		return []User{}, 0, nil
	}

	var userIDs []uint
	for _, userOrganization := range userOrganizations {
		userIDs = append(userIDs, userOrganization.UserID)
	}

	var total int64
	if err := db.DB.Model(&User{}).
		Where("id IN ?", userIDs).
		Count(&total).Error; err != nil {
		return nil, 0, err
	}

	var users []User
	if err := db.DB.
		Where("id IN ?", userIDs).
		Limit(limit).
		Offset(offset).
		Find(&users).Error; err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

func CountVolunteers(orgId string) (int64, error) {
	var count int64
	err := db.DB.Model(&UserOrganization{}).
		Where("organization_id = ? AND is_owner = ?", orgId, false).
		Count(&count).Error

	if err != nil {
		return 0, err
	}

	return count, nil
}

func UserIsAttachedToOrganization(userId, orgId string) bool {
	var count int64
	err := db.DB.Model(&UserOrganization{}).
		Where("user_id = ? AND organization_id = ? AND is_accepted = ?", userId, orgId, true).
		Count(&count).Error

	if err != nil {
		return false
	}

	return count > 0
}

func UserIsRequestedToOrganization(userId, orgId string) bool {
	var count int64
	err := db.DB.Model(&UserOrganization{}).
		Where("user_id = ? AND organization_id = ? AND is_accepted = ?", userId, orgId, false).
		Count(&count).Error

	if err != nil {
		return false
	}

	return count > 0
}
