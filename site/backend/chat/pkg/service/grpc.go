package service

import (
	usermodel "backend/chat/pkg/model"
	pb "backend/proto-functions/profile"
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Grpc struct {
	Client pb.ProfileServiceClient
	Conn   *grpc.ClientConn
}

func NewGrpcClient(addr string) (*Grpc, error) {
	conn, err := grpc.Dial(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}

	return &Grpc{
		Client: pb.NewProfileServiceClient(conn),
		Conn:   conn,
	}, nil
}

func (c *Grpc) Close() {
	if c.Conn != nil {
		c.Conn.Close()
	}
}

func (g *Grpc) GetUsersByIDS(ctx context.Context, userIDS []uint64) ([]usermodel.UserModel, error) {
	res, err := g.Client.GetUsersByIDS(ctx, &pb.GetUsersByIDsRequest{UserIds: userIDS})
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
