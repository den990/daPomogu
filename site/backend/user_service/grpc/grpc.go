package grpc

import (
	pb "backend/proto-functions/task"
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Client struct {
	ClientConnection *grpc.ClientConn
	Client           pb.TaskServiceClient
}

func NewGrpcClient(addr string) (*Client, error) {
	conn, err := grpc.Dial(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return nil, err
	}

	return &Client{
		Client:           pb.NewTaskServiceClient(conn),
		ClientConnection: conn,
	}, nil
}

func (c *Client) Close() {
	if c.ClientConnection != nil {
		c.ClientConnection.Close()
	}
}

func (c *Client) GetTasksByOrganizationId(ctx context.Context, req *pb.TaskOrganizationRequest) (*pb.TasksViewInProfileOrganization, error) {
	tasks, err := c.Client.GetTasksByOrganizationId(ctx, req)
	if err != nil {
		return &pb.TasksViewInProfileOrganization{}, err
	}
	return tasks, nil
}

func (c *Client) GetCountTasksCompletedByUserId(ctx context.Context, req *pb.TaskUserRequest) (*pb.TasksCompleteCountResponse, error) {
	count, err := c.Client.GetCountTasksCompletedByUserId(ctx, req)
	if err != nil {
		return &pb.TasksCompleteCountResponse{Count: 0}, err
	}

	return count, err
}

func (c *Client) GetCountTasksCompleted(ctx context.Context, req *pb.Empty) (*pb.TasksCompleteCountResponse, error) {
	count, err := c.Client.GetCountTasksCompleted(ctx, req)
	if err != nil {
		return &pb.TasksCompleteCountResponse{Count: 0}, err
	}

	return count, err
}

func (c *Client) GetCountActiveTasks(ctx context.Context, req *pb.Empty) (*pb.TasksCountResponse, error) {
	count, err := c.Client.GetCountActiveTasks(ctx, req)
	if err != nil {
		return &pb.TasksCountResponse{Count: 0}, err
	}

	return count, err
}

func (c *Client) UploadImage(ctx context.Context, req *pb.ImageChunk) (*pb.UploadStatus, error) {
	uploadStatus, err := c.Client.UploadImage(ctx, req)
	if err != nil {
		return &pb.UploadStatus{Success: false, Message: err.Error(), FileId: 0}, err
	}
	return uploadStatus, err
}

func (c *Client) GetAvatarImage(ctx context.Context, req *pb.DownloadImageRequest) (*pb.DownloadImageResponse, error) {
	imageData, err := c.Client.GetAvatarImage(ctx, req)
	if err != nil {
		return &pb.DownloadImageResponse{ImageData: nil}, err
	}

	return imageData, err
}
