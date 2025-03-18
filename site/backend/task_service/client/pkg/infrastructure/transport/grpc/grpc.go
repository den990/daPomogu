package grpc

import (
	organizationmodel "backend/client/pkg/app/organization/model"
	organizationquery "backend/client/pkg/app/organization/query"
	usermodel "backend/client/pkg/app/user/model"
	userquery "backend/client/pkg/app/user/query"
	pb "backend/functions"
	"context"
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
		log.Fatalf("Ошибка получения пользователя: %v", err)
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
		log.Fatalf("Ошибка получения организации: %v", err)
	}

	log.Printf("Организация: Email - %s, StatusID - %d", res.Email, res.StatusId)
	return organizationmodel.OrganizationModel{
		StatusID: uint(res.StatusId),
		ID:       uint(orgID),
		Name:     res.Email,
	}, nil
}

func (c *Client) GetOrganizationsByUserID(ctx context.Context, userID uint64) ([]organizationmodel.OrganizationModel, error) {
	res, err := c.Client.GetOrganizationsByUserID(ctx, &pb.OrganizationUserRequest{Id: userID})
	if err != nil {
		log.Fatalf("Ошибка получения организаций пользователя: %v", err)
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
