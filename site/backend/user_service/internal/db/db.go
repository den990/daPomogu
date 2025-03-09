package db

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var DB *gorm.DB

func InitDB() error {
	postgresUser := os.Getenv("POSTGRES_USER")
	postgresPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	postgresHost := "db_user_service"

	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s sslmode=disable port=5432", postgresUser, postgresPassword, dbName, postgresHost)

	// Открываем подключение к базе данных
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	return nil
}
