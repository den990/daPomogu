package postgres

import (
	"fmt"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

type Config struct {
	Host     string
	Port     string
	Username string
	Password string
	DBName   string
	SSLMode  string
}

func NewPostgresGormDB(cfg Config) (*gorm.DB, error) {
	postgresUser := os.Getenv("POSTGRES_USER")
	postgresPassword := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	postgresHost := "postgres-service"

	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s sslmode=disable port=5432", postgresUser, postgresPassword, dbName, postgresHost)

	var err error
	dbg, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	return dbg, nil
}
