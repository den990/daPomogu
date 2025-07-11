package grpc

import (
	pb "backend/proto-functions/profile"
	organizationmodel "backend/task_service/pkg/app/organization/model"
	organizationquery "backend/task_service/pkg/app/organization/query"
	usermodel "backend/task_service/pkg/app/user/model"
	userquery "backend/task_service/pkg/app/user/query"
	"context"
	"errors"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
)

type ClientInterface interface {
	Close()
	userquery.ClientUserInterface
	organizationquery.ClientOrganizationInterface
}

type Client struct {
	Client pb.ProfileServiceClient
	Conn   *grpc.ClientConn
}

func NewGrpcClient(addr string) (*Client, error) {
	conn, err := grpc.Dial(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}

	return &Client{
		Client: pb.NewProfileServiceClient(conn),
		Conn:   conn,
	}, nil
}

func (c *Client) Close() {
	if c.Conn != nil {
		c.Conn.Close()
	}
}

func (c *Client) GetUser(ctx context.Context, userID uint64) (usermodel.UserModel, error) {
	res, err := c.Client.GetUser(ctx, &pb.UserRequest{Id: userID})
	if err != nil {
		log.Printf("Ошибка получения пользователя: %v", err)
		return usermodel.UserModel{}, err
	}

	log.Printf("Пользователь: %s %s, Админ: %v", res.Name, res.Surname, res.IsAdmin)
	return usermodel.UserModel{
		Name:    res.Name,
		Surname: &res.Surname,
		IsAdmin: res.IsAdmin,
	}, nil
}

func (c *Client) GetOrganization(ctx context.Context, orgID uint64) (organizationmodel.OrganizationModel, error) {
	res, err := c.Client.GetOrganization(ctx, &pb.OrganizationRequest{Id: orgID})
	if err != nil {
		return organizationmodel.OrganizationModel{}, err
	}

	if res.StatusId != 2 {
		return organizationmodel.OrganizationModel{}, errors.New("organization not active")
	}

	log.Printf("Организация: Email - %s, StatusID - %d", res.Email, res.StatusId)
	return organizationmodel.OrganizationModel{
		StatusID: uint(res.StatusId),
		ID:       uint(orgID),
		Name:     res.Name,
	}, nil
}

func (c *Client) GetOrganizationsByUserID(ctx context.Context, userID uint64) ([]organizationmodel.OrganizationModel, error) {
	res, err := c.Client.GetOrganizationsByUserID(ctx, &pb.OrganizationUserRequest{Id: userID})
	if err != nil {
		log.Printf("Ошибка получения организаций пользователя: %v", err)
		return []organizationmodel.OrganizationModel{}, err
	}
	orgs := []organizationmodel.OrganizationModel{}
	log.Println("Организации пользователя:")
	for _, org := range res.OrganizationUserResponse {
		log.Printf("ID: %d, Владелец: %v", org.Id, org.IsOwner)
		orgs = append(orgs, organizationmodel.OrganizationModel{
			ID:      uint(org.Id),
			IsOwner: org.IsOwner,
		})
	}

	return orgs, nil
}

func (c *Client) GetOrganizationByOwnerUserID(ctx context.Context, userID uint64) (organizationmodel.OrganizationModel, error) {
	log.Printf("Организация для пользователя: %d", userID)
	res, err := c.Client.GetOrganizationByOwnerUserID(ctx, &pb.OrganizationUserRequest{Id: userID})
	if err != nil {
		log.Printf("Ошибка получения организаций пользователя: %v", err)
		return organizationmodel.OrganizationModel{}, err
	}
	if res.StatusId != 2 {
		return organizationmodel.OrganizationModel{}, errors.New("organization not active")
	}
	return organizationmodel.OrganizationModel{
		StatusID: uint(res.StatusId),
		ID:       uint(res.Id),
		Name:     res.Name,
	}, nil

}

func (c *Client) GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]usermodel.UserModel, error) {
	res, err := c.Client.GetUsersByIDS(ctx, &pb.GetUsersByIDsRequest{UserIds: userIDS})
	if err != nil {
		return nil, err
	}

	users := []usermodel.UserModel{}
	for _, user := range res.Users {
		users = append(users, usermodel.UserModel{
			ID:      uint(user.Id),
			Name:    user.Name,
			Surname: &user.Surname,
			IsAdmin: user.IsAdmin,
		})

	}

	return users, nil
}

func (c *Client) IsAdmin(ctx context.Context, userId uint64) (bool, error) {
	res, err := c.Client.IsUserAdmin(ctx, &pb.UserRequest{Id: userId})

	if err != nil {
		return false, err
	}

	return res.IsAdmin, nil
}
