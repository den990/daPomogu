package Server

import (
	pb "backend/functions"
	"backend/internal/models"
	"context"
	"log"
	"strconv"
)

type Server struct {
	pb.UnimplementedProfileServiceServer
}

// GetUser — метод для получения информации о пользователе
func (s *Server) GetUser(ctx context.Context, req *pb.UserRequest) (*pb.UserResponse, error) {
	log.Printf("Received GetUser request for user ID: %d", req.GetId())
	user, _ := models.FindUserById(strconv.FormatUint(req.GetId(), 10))
	userResponse := &pb.UserResponse{
		Name:    user.Name,
		Surname: user.Surname,
		IsAdmin: user.IsAdmin,
	}

	return userResponse, nil
}

// GetOrganization — метод для получения информации об организации
func (s *Server) GetOrganization(ctx context.Context, req *pb.OrganizationRequest) (*pb.OrganizationResponse, error) {
	log.Printf("Received GetOrganization request for organization ID: %d", req.GetId())

	org, _ := models.FindOrganizationById(strconv.FormatUint(req.GetId(), 10))
	organizationResponse := &pb.OrganizationResponse{
		Email:    org.Email,
		StatusId: uint64(org.StatusID),
	}

	return organizationResponse, nil
}

// GetOrganizationsByUserID — метод для получения всех организаций пользователя
func (s *Server) GetOrganizationsByUserID(ctx context.Context, req *pb.OrganizationUserRequest) (*pb.OrganizationUserListResponse, error) {
	log.Printf("Received GetOrganizationsByUserID request for user ID: %d", req.GetId())

	organization, _ := models.FindOrganizationByUserIdOwner(strconv.FormatUint(req.GetId(), 10))
	var organizationUserResponse []*pb.OrganizationUserResponse
	if organization != nil {
		organizationUserResponse = []*pb.OrganizationUserResponse{
			{
				Id:      uint64(organization.ID),
				IsOwner: true,
			},
		}
	} else {
		userOrgs, _ := models.FindOrganizationsByUserId(strconv.FormatUint(req.GetId(), 10))
		for _, org := range userOrgs {
			organizationUserResponse = append(organizationUserResponse, &pb.OrganizationUserResponse{
				Id:      uint64(org.OrganizationID),
				IsOwner: false,
			})
		}
	}

	return &pb.OrganizationUserListResponse{
		Organizations: organizationUserResponse,
	}, nil
}
