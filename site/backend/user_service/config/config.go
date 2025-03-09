package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error load .env file")
	}
}

func GetJwtSecretKey() string {
	return os.Getenv("JWT_SECRET_KEY")
}
