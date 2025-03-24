package main

import (
	pb "backend/proto-functions/profile"
	"backend/user_service/config"
	grpcserver "backend/user_service/grpc"
	"backend/user_service/internal/controllers"
	"backend/user_service/internal/db"
	"backend/user_service/internal/middleware"
	Server "backend/user_service/server"
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
	grpcClient, err := grpcserver.NewGrpcClient("task-service:50501")
	if err != nil {
		fmt.Println(err)
		return
	}
	h := controllers.NewHandler(*grpcClient)
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
	}))

	r.POST("/register", h.RegisterUser)
	r.POST("/register-organization", h.RegisterOrganization)
	r.POST("/login", h.Login)
	r.GET("/profile-organization/:id", h.GetOrganizationProfileInfo)
	r.GET("/organizations-accepted-list/:page", h.GetOrganizationAcceptedList)

	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/profile", h.GetUserProfileInfo)
		protected.GET("/profile/:id", h.GetUserProfileInfo)
		protected.GET("/profile-organization", h.GetOrganizationProfileInfo)
		protected.PUT("/organizations/:id/apply", h.ApplyOrganization)
		protected.PUT("/organizations/:id/reject", h.RejectOrganization)
		protected.POST("/profile-organization", h.UpdateOrganization)
		protected.POST("/profile-organization/:id", h.UpdateOrganization)
		protected.PUT("/profile", h.UpdateUser)
		protected.PUT("/profile/:id", h.UpdateUser)
		protected.GET("/organization-requests", h.GetPendingOrganizations)
		protected.PUT("/change-password", h.ChangePassword)
		protected.GET("/organizations-list", h.GetAllOrganizationList)
		protected.POST("/attach-organization/:id", h.AttachUserToOrganization)
		protected.POST("/detach-organization/:id", h.DetachUserToOrganization)
		protected.PUT("/organization/accept/:user_id", h.AcceptUserAttachment)
		protected.GET("/organizations-users-list/:page", h.GetAllUsersAndOrganizations)
		protected.PUT("/block-user/:id", h.BlockUser)
		protected.PUT("/unblock-user/:id", h.UnblockUser)
		protected.GET("/organization/requests-to-apply", h.GetRequestsToApply)
		protected.GET("/organization/users", h.GetUsersInOrganization)
		protected.GET("/admin/statistic", h.GetStatisticForAdmin)
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
