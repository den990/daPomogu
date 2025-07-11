package models

import (
	"backend/user_service/internal/db"
	"errors"
	"mime/multipart"
	"time"
)

type Organization struct {
	ID            uint   `gorm:"primary_key"`
	Email         string `gorm:"unique;not null"`
	Phone         string `gorm:"not null"`
	INN           string `gorm:"unique;not null"`
	Name          string `gorm:"not null"`
	LegalAddress  string `gorm:"not null"`
	ActualAddress string `gorm:"not null"`
	StatusID      uint   `gorm:"not null;default:1"`
	FullNameOwner string `gorm:"not null"`
	IsBlocked     bool   `gorm:"default:false"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
	AvatarID      uint `gorm:"index;null;default:null" json:"avatar_id"`
}

func (Organization) TableName() string {
	return "organization"
}

type OrganizationRegistration struct {
	Email         string `json:"email" binding:"required,email"`
	Phone         string `json:"phone" binding:"required"`
	INN           string `json:"inn" binding:"required"`
	Name          string `json:"name" binding:"required"`
	LegalAddress  string `json:"legal_address" binding:"required"`
	ActualAddress string `json:"actual_address" binding:"required"`
	FullNameOwner string `json:"full_name_owner" binding:"required"`
}

type OrganizationUpdate struct {
	Email         string                `form:"email" binding:"required,email"`
	Phone         string                `form:"phone" binding:"required"`
	INN           string                `form:"inn" binding:"required"`
	Name          string                `form:"name" binding:"required"`
	LegalAddress  string                `form:"legal_address" binding:"required"`
	ActualAddress string                `form:"actual_address" binding:"required"`
	FullNameOwner string                `form:"full_name_owner" binding:"required"`
	Avatar        *multipart.FileHeader `form:"avatar"`
	AvatarId      uint                  `form:"avatar_id"`
}

type TasksInProfileResponse struct {
	Id               uint64 `json:"id"`
	Name             string `json:"name"`
	TaskDate         string `json:"task_date"`
	CountCoordinator uint64 `json:"count_coordinator"`
}

type OrganizationProfileResponse struct {
	Id                     string                   `json:"id"`
	Email                  string                   `json:"email"`
	Phone                  string                   `json:"phone"`
	INN                    string                   `json:"inn"`
	Name                   string                   `json:"name"`
	ActualAddress          string                   `json:"actual_address"`
	LegalAddress           string                   `json:"legal_address"`
	FullNameOwner          string                   `json:"full_name_owner"`
	TasksInProfileResponse []TasksInProfileResponse `json:"tasks"`
	CountFinishedTasks     int                      `json:"count_finished_tasks"`
	CountVolunteers        int                      `json:"count_volunteers"`
	CountDays              int                      `json:"count_days"`
	IsAttached             bool                     `json:"is_attached"`
	IsRequested            bool                     `json:"is_requested"`
}

type GetProfilesOrganizationResponse struct {
	Id            string `json:"id"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	INN           string `json:"inn"`
	Name          string `json:"name"`
	ActualAddress string `json:"actual_address"`
	LegalAddress  string `json:"legal_address"`
	FullNameOwner string `json:"full_name_owner"`
}

type OrganizationList struct {
	Id        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	Avatar    string `json:"avatar"`
}

func FindActualOrganizationById(id string) (*Organization, error) {
	var organization Organization
	if res := db.DB.Where("id = ? AND status_id = ?", id, 2).First(&organization); res.Error != nil {
		return nil, res.Error
	}

	return &organization, nil
}

func FindOrganizationById(id string) (*Organization, error) {
	var organization Organization
	if err := db.DB.First(&organization, id).Error; err != nil {
		return nil, err
	}

	return &organization, nil
}

func UpdateOrganization(id string, orgUpdate OrganizationUpdate) error {
	var organization Organization

	if err := db.DB.First(&organization, id).Error; err != nil {
		return errors.New("Organization not found")
	}

	organization.Email = orgUpdate.Email
	organization.Phone = orgUpdate.Phone
	organization.INN = orgUpdate.INN
	organization.Name = orgUpdate.Name
	organization.LegalAddress = orgUpdate.LegalAddress
	organization.ActualAddress = orgUpdate.ActualAddress
	organization.FullNameOwner = orgUpdate.FullNameOwner
	organization.UpdatedAt = time.Now()
	if &orgUpdate.AvatarId != nil {
		organization.AvatarID = orgUpdate.AvatarId
	}

	if err := db.DB.Save(&organization).Error; err != nil {
		return errors.New("Failed to update organization")
	}

	return nil
}

func FindOrganizationByUserId(id string) (*Organization, error) {
	var organization Organization
	if err := db.DB.First(&organization, id).Error; err != nil {
		return nil, err
	}

	return &organization, nil
}

func FindOrganizationsPending() ([]Organization, error) {
	var organizations []Organization
	err := db.DB.Where("status_id = ?", 1).Find(&organizations).Error
	if err != nil {
		return nil, err
	}
	return organizations, nil
}

func FindOrganizationsAccepted(offset, limit int) ([]Organization, error) {
	var organizations []Organization
	err := db.DB.Where("status_id = ?", 2).Offset(offset).Limit(limit).Find(&organizations).Error
	if err != nil {
		return nil, err
	}
	return organizations, nil
}

func CountOrganizationsAccepted() (int64, error) {
	var count int64
	err := db.DB.Model(&Organization{}).Where("status_id = ?", 2).Count(&count).Error
	if err != nil {
		return 0, err
	}
	return count, nil
}

func FindOrganizationsAll() ([]Organization, error) {
	var organizations []Organization
	err := db.DB.Find(&organizations).Error
	if err != nil {
		return nil, err
	}
	return organizations, nil
}

func BlockOrganization(orgID string) error {
	var organization Organization
	if err := db.DB.Where("id = ?", orgID).First(&organization).Error; err != nil {
		return errors.New("user not found")
	}

	organization.IsBlocked = true
	if err := db.DB.Save(&organization).Error; err != nil {
		return errors.New("failed to block organization")
	}

	return nil
}

func UnblockOrganization(orgID string) error {
	var organization Organization
	if err := db.DB.Where("id = ?", orgID).First(&organization).Error; err != nil {
		return errors.New("user not found")
	}

	organization.IsBlocked = false
	if err := db.DB.Save(&organization).Error; err != nil {
		return errors.New("failed to unblock organization")
	}

	return nil
}
