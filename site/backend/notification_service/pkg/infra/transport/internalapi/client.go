package internalapi

import (
	"backend/notification_service/pkg/app/model"
	pb "backend/proto-functions/profile"
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
)

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

func (c *Client) GetUser(ctx context.Context, userID uint64) (model.UserModel, error) {
	res, err := c.Client.GetUser(ctx, &pb.UserRequest{Id: userID})
	if err != nil {
		log.Printf("Ошибка получения пользователя: %v", err)
		return model.UserModel{}, err
	}

	log.Printf("Пользователь: %s %s, Админ: %v", res.Name, res.Surname, res.IsAdmin)
	return model.UserModel{
		ID:    uint(userID),
		Email: res.Email,
	}, nil
}
