package main

import (
	"backend/config"
	"backend/internal/db"
	"backend/internal/middleware"
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
	r.POST("/register-organization", models.RegisterOrganization)
	r.POST("/login", models.Login)

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/profile", models.GetProfileInfo)
		protected.GET("/profile/:id", models.GetProfileInfo)
		protected.PUT("/organizations/:id/apply", models.ApplyOrganization)
		protected.PUT("/organizations/:id/reject", models.RejectOrganization)
	}

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
