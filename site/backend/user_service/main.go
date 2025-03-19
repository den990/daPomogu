package main

import (
	"backend/config"
	pb "backend/functions"
	"backend/internal/controllers"
	"backend/internal/db"
	"backend/internal/middleware"
	Server "backend/server"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"log"
	"net"
	"os"
	"sync"
)

func main() {
	config.LoadEnv()

	if err := db.InitDB(); err != nil {
		log.Fatalf("Error initializing database: %v", err)
	}
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		startHTTPServer()
	}()

	go func() {
		defer wg.Done()
		startGRPCServer()
	}()

	wg.Wait()
}

func startHTTPServer() {
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
	r.GET("/profile-organization/:id", controllers.GetOrganizationProfileInfo)

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/profile", controllers.GetUserProfileInfo)
		protected.GET("/profile/:id", controllers.GetUserProfileInfo)
		protected.GET("/profile-organization", controllers.GetOrganizationProfileInfo)
		protected.PUT("/organizations/:id/apply", controllers.ApplyOrganization)
		protected.PUT("/organizations/:id/reject", controllers.RejectOrganization)
		protected.POST("/profile-organization", controllers.UpdateOrganization)
		protected.POST("/profile-organization/:id", controllers.UpdateOrganization)
		protected.PUT("/profile", controllers.UpdateUser)
		protected.PUT("/profile/:id", controllers.UpdateUser)
		protected.GET("/organization-requests", controllers.GetPendingOrganizations)
		protected.PUT("/change-password", controllers.ChangePassword)
		protected.GET("/organizations-accepted-list", controllers.GetOrganizationAcceptedList)
		protected.GET("/organizations-list", controllers.GetAllOrganizationList)
		protected.POST("/attach-organization", controllers.AttachUserToOrganization)
		protected.POST("/detach-organization", controllers.DetachUserToOrganization)
		protected.PUT("/organization/accept/:user_id", controllers.AcceptUserAttachment)
		protected.GET("/organizations-users-list/:page", controllers.GetAllUsersAndOrganizations)
		protected.PUT("/block-user/:id", controllers.BlockUser)
		protected.PUT("/unblock-user/:id", controllers.UnblockUser)
		protected.GET("/organization/requests-to-apply", controllers.GetRequestsToApply)
		protected.GET("/organization/users", controllers.GetUsersInOrganization)
	}

	log.Println("HTTP Server running on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Error starting HTTP server: %v", err)
	}
}

func startGRPCServer() {
	port, exists := os.LookupEnv("PORT")
	if !exists {
		port = "50501"
	}

	lis, err := net.Listen("tcp", fmt.Sprintf(":%s", port))
	if err != nil {
		log.Fatalf("Error in Listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterProfileServiceServer(s, &Server.Server{})

	log.Printf("gRPC Server listening at: %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve gRPC: %v", err)
	}
}
