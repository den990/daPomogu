package models

import (
	"backend/user_service/internal/db"
	"errors"
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

type OrganizationProfileResponse struct {
	Id            string `json:"id"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	INN           string `json:"inn"`
	Name          string `json:"name"`
	ActualAddress string `json:"actual_address"`
	LegalAddress  string `json:"legal_address"`
	FullNameOwner string `json:"full_name_owner"`
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
}

func FindActualOrganizationById(id string) (*Organization, error) {
	var organization Organization
	if err := db.DB.Where("id = ? AND status_id = ?", id, 2).First(&organization).Error; err != nil {
		return nil, err
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

func UpdateOrganization(id string, registration OrganizationRegistration) error {
	var organization Organization

	if err := db.DB.First(&organization, id).Error; err != nil {
		return errors.New("Organization not found")
	}

	organization.Email = registration.Email
	organization.Phone = registration.Phone
	organization.INN = registration.INN
	organization.Name = registration.Name
	organization.LegalAddress = registration.LegalAddress
	organization.ActualAddress = registration.ActualAddress
	organization.FullNameOwner = registration.FullNameOwner
	organization.UpdatedAt = time.Now()

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
