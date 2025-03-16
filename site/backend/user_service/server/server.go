package Server

import (
	pb "backend/functions"
	"context"
	"log"
)

type Server struct {
	pb.UnimplementedProfileServiceServer
}

// GetUser — метод для получения информации о пользователе
func (s *Server) GetUser(ctx context.Context, req *pb.UserRequest) (*pb.UserResponse, error) {
	log.Printf("Received GetUser request for user ID: %d", req.GetId())

	userResponse := &pb.UserResponse{
		Name:    "John",
		Surname: "Doe",
		IsAdmin: true,
	}

	return userResponse, nil
}

// GetOrganization — метод для получения информации об организации
func (s *Server) GetOrganization(ctx context.Context, req *pb.OrganizationRequest) (*pb.OrganizationResponse, error) {
	log.Printf("Received GetOrganization request for organization ID: %d", req.GetId())

	// Логика получения информации об организации
	// Примерный ответ
	organizationResponse := &pb.OrganizationResponse{
		Email:    "contact@organization.com",
		StatusId: 1, // Статус может быть, например, "активен"
	}

	return organizationResponse, nil
}

// GetOrganizationsByUserID — метод для получения всех организаций пользователя
func (s *Server) GetOrganizationsByUserID(ctx context.Context, req *pb.OrganizationUserRequest) (*pb.OrganizationUserListResponse, error) {
	log.Printf("Received GetOrganizationsByUserID request for user ID: %d", req.GetId())

	// Логика получения всех организаций, в которых состоит пользователь
	// Примерный ответ с несколькими организациями
	organizations := []*pb.OrganizationUserResponse{
		{
			Id:      1,
			IsOwner: true,
		},
		{
			Id:      2,
			IsOwner: false,
		},
	}

	return &pb.OrganizationUserListResponse{
		Organizations: organizations,
	}, nil
}
