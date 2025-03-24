package Server

import (
	pb "backend/proto-functions/profile"
	"backend/user_service/internal/models"
	"context"
	"encoding/json"
	"errors"
	"fmt"
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
	reqJSON, err := json.Marshal(req)
	if err != nil {
		log.Printf("Error marshaling request to JSON: %v", err)
		return nil, err
	}

	// Печатаем JSON строку
	fmt.Printf("Request JSON: %s\n", reqJSON)
	log.Printf("Received GetOrganization request for organization ID: %d", req.GetId())

	org, _ := models.FindOrganizationById(strconv.FormatUint(req.GetId(), 10))
	organizationResponse := &pb.OrganizationResponse{
		Email:    org.Email,
		StatusId: uint64(org.StatusID),
		Name:     org.Name,
	}

	return organizationResponse, nil
}

// GetOrganizationsByUserID — метод для получения всех организаций пользователя
func (s *Server) GetOrganizationsByUserID(ctx context.Context, req *pb.OrganizationUserRequest) (*pb.OrganizationUserListResponse, error) {

	organization, _ := models.FindOrganizationByUserIdOwner(strconv.FormatUint(req.GetId(), 10))
	fmt.Println("test organizations")
	fmt.Println(organization)
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
		fmt.Println("test userOrgs")
		fmt.Println(userOrgs)
		fmt.Println("test req.GetId()")
		fmt.Println(req.GetId())
		for _, org := range userOrgs {
			organizationUserResponse = append(organizationUserResponse, &pb.OrganizationUserResponse{
				Id:      uint64(org.OrganizationID),
				IsOwner: false,
			})
		}
	}

	return &pb.OrganizationUserListResponse{
		OrganizationUserResponse: organizationUserResponse,
	}, nil
}

func (s *Server) GetOrganizationByOwnerUserID(ctx context.Context, req *pb.OrganizationUserRequest) (*pb.OrganizationResponse, error) {
	log.Printf("Получен запрос: ID = %d", req.GetId())
	log.Printf("formatted Получен запрос: ID = %s", strconv.FormatUint(req.GetId(), 10))

	res, err := models.FindOrganizationByUserIdOwner(strconv.FormatUint(req.GetId(), 10))
	if err != nil {
		log.Printf("Ошибка получения организаций пользователя: %v", err)
		return nil, err
	}

	if res.StatusID != 2 {
		return nil, errors.New("organization not active")
	}

	return &pb.OrganizationResponse{
		Id:       uint64(res.ID),
		Name:     res.Name,
		StatusId: uint64(res.StatusID),
	}, nil
}

func (s *Server) GetUsersByIDS(ctx context.Context, req *pb.GetUsersByIDsRequest) (*pb.GetUsersByIDsResponse, error) {
	users, err := models.GetAllUsersByIds(req.UserIds)
	if err != nil {
		return nil, err
	}
	fmt.Println("Users len : ", len(users))
	res := []*pb.User{}

	for _, user := range users {
		res = append(res, &pb.User{
			Id:      uint64(user.ID),
			Name:    user.Name,
			Surname: user.Surname,
			IsAdmin: user.IsAdmin,
		})
	}

	return &pb.GetUsersByIDsResponse{
		Users: res,
	}, nil
}

func (s *Server) IsUserAdmin(ctx context.Context, req *pb.UserRequest) (*pb.UserAdminResponse, error) {
	id := req.Id
	isAdmin, err := models.IsAdminWithoutToken(uint(id))
	if err != nil {
		return &pb.UserAdminResponse{IsAdmin: false}, err
	}

	return &pb.UserAdminResponse{IsAdmin: isAdmin}, err
}
