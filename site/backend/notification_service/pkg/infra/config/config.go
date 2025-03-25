package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

type DataBaseConfig struct {
	Port     string
	Host     string
	Username string
	DBName   string
	SSLMode  string
	Password string
}

type Config struct {
	HandlerPort string
	ServerPort  string
	JWTSecret   string
	DBConfig    DataBaseConfig
}

func NewConfig() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error load .env file")
	}
	return &Config{
		HandlerPort: getEnv("APP_PORT", "8082"),
		ServerPort:  getEnv("SERVER_ADDRESS", "50503"),
		JWTSecret:   getEnv("JWT_SECRET", "verysecret"),
		DBConfig: DataBaseConfig{
			Port:     getEnv("DB_PORT", "5432"),
			Host:     getEnv("DB_HOST", "dapomogu_postgres"),
			Username: getEnv("DB_USERNAME", "postgres"),
			DBName:   getEnv("DB_NAME", "dapomogu_notification_db"),
			SSLMode:  getEnv("DB_SSL_MODE", "disable"),
			Password: getEnv("DB_PASSWORD", "dapomogu_password"),
		},
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
