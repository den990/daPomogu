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
		protected.GET("/profile", controllers.GetUserProfileInfo)                              // просмотр собственного профиля
		protected.GET("/profile/:id", controllers.GetUserProfileInfo)                          // просмотр другого пользователя
		protected.GET("/profile-organization", controllers.GetOrganizationProfileInfo)         // просмотр собственного профиля организации
		protected.GET("/profile-organization/:id", controllers.GetOrganizationProfileInfo)     // просмотр другого профиля организации
		protected.PUT("/organizations/:id/apply", controllers.ApplyOrganization)               // принять регистрацию организации
		protected.PUT("/organizations/:id/reject", controllers.RejectOrganization)             // отказать регистрацию организации
		protected.POST("/profile-organization", controllers.UpdateOrganization)                // обновить собственные данные организации
		protected.POST("/profile-organization/:id", controllers.UpdateOrganization)            // обновить данные другой организации
		protected.PUT("/profile", controllers.UpdateUser)                                      // обновить собственные данные профиля
		protected.PUT("/profile/:id", controllers.UpdateUser)                                  // обновить данные другого профиля
		protected.GET("/organization-requests", controllers.GetPendingOrganizations)           // список организация на регистрацию
		protected.PUT("/change-password", controllers.ChangePassword)                          // смена пароля от лк
		protected.GET("/organizations-accepted-list", controllers.GetOrganizationAcceptedList) // список принятых организаций с укороченными данными
		protected.GET("/organizations-list", controllers.GetAllOrganizationList)               // список всех организаций с укороченными данными

		protected.POST("/attach-organization", controllers.AttachUserToOrganization)     // волонтер создает заявку на прикрепление к организации
		protected.POST("/detach-organization", controllers.DetachUserToOrganization)     // волонтер удаляет заявку на прикрепление к организации
		protected.PUT("/organization/accept/:user_id", controllers.AcceptUserAttachment) // организация принимает заявку на прикрепление
	}
	//нужно расширить таблицу user_organization для is_accepted

	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
