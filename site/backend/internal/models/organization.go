package models

import "github.com/gin-gonic/gin"

type OrganizationRegistration struct {
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	INN           string `json:"inn"`
	LegalName     string `json:"legal_name"`
	LegalAddress  string `json:"legal_address"`
	ActualAddress string `json:"actual_address"`
	Director      string `json:"director"`
	Password      string `json:"password"`
}

func RegisterOrganization(c *gin.Context) {
	var organization OrganizationRegistration
	if err := c.ShouldBindJSON(&organization); err != nil {
		c.JSON(400, gin.H{"message": "Invalid input"})
		return
	}

	// Здесь можно добавить логику сохранения в базу данных

	c.JSON(200, gin.H{"message": "Organization registered successfully"})
}
