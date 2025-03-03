package main

import (
	"backend/config"
	"backend/internal/db"
	"backend/internal/models"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	config.LoadEnv()

	if err := db.InitDB(); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	r := gin.Default()
	r.POST("/register", models.RegisterUser)
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
