package main

import (
	"backend/config"
	"backend/internal/controllers"
	"backend/internal/db"
	"backend/internal/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	config.LoadEnv()

	if err := db.InitDB(); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
	}))
	r.POST("/register", controllers.RegisterUser)
	r.POST("/register-organization", controllers.RegisterOrganization)
	r.POST("/login", controllers.Login)

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/profile", controllers.GetUserProfileInfo)
		protected.GET("/profile/:id", controllers.GetUserProfileInfo)
		protected.GET("/profile-organization", controllers.GetOrganizationProfileInfo)
		protected.GET("/profile-organization/:id", controllers.GetOrganizationProfileInfo)
		protected.PUT("/organizations/:id/apply", controllers.ApplyOrganization)
		protected.PUT("/organizations/:id/reject", controllers.RejectOrganization)
		protected.POST("/profile-organization", controllers.UpdateOrganization)
		protected.POST("/profile-organization/:id", controllers.UpdateOrganization)
		protected.POST("/profile", controllers.UpdateUser)
		protected.POST("/profile/:id", controllers.UpdateUser)
		protected.GET("/organization-requests", controllers.GetPendingOrganizations)
		protected.PUT("/change-password", controllers.ChangePassword)
		protected.GET("/organizations-list", controllers.GetOrganizationList)
		protected.POST("/attach-organization", controllers.AttachUserToOrganization)
		protected.POST("/detach-organization", controllers.DetachUserToOrganization)
	}

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
