package models

type UserOrganization struct {
	ID             uint `gorm:"primaryKey"`
	UserID         uint `gorm:"not null;index"`
	OrganizationID uint `gorm:"not null;index"`
	IsOwner        bool `gorm:"default:false"`
}
