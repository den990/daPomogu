package Server

import (
	pb "backend/proto-functions/task"
	filedata "backend/task_service/pkg/app/file/data"
	"backend/task_service/pkg/app/file/model"
	_ "backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/app/task/query"
	filelib "backend/task_service/pkg/infrastructure/lib/file"
	"context"
	"fmt"
	_ "fmt"
	"io/ioutil"
	"path/filepath"
	"time"
)

type Server struct {
	pb.UnimplementedTaskServiceServer
	taskquery     query.TaskQueryInterface
	taskuserquery query.TaskUserQueryInterface
	filequery     model.FileModelRepositoryInterface
}

func NewServer(taskQuery query.TaskQueryInterface, taskUserQuery query.TaskUserQueryInterface, fileQuery model.FileModelRepositoryInterface) *Server {
	return &Server{
		taskquery:     taskQuery,
		taskuserquery: taskUserQuery,
		filequery:     fileQuery,
	}
}

func (s *Server) GetTasksByOrganizationId(ctx context.Context, req *pb.TaskOrganizationRequest) (*pb.TasksViewInProfileOrganization, error) {
	var response pb.TasksViewInProfileOrganization
	tasks, err := s.taskquery.ShowByOrganizationId(ctx, uint(req.Id))
	if err != nil {
		return &pb.TasksViewInProfileOrganization{}, err
	}

	for _, task := range tasks {
		count, _ := s.taskuserquery.GetCountUserWithoutCoordinators(ctx, task.ID)
		organization := pb.TaskViewInProfileOrganization{
			Id:               uint64(task.ID),
			Name:             task.Name,
			TaskDate:         task.TaskDate.Format(time.RFC3339),
			CountCoordinator: uint64(count),
		}
		response.TaskViewInProfileOrganization = append(response.TaskViewInProfileOrganization, &organization)
	}

	return &response, nil
}

func (s *Server) GetCountTasksCompletedByUserId(ctx context.Context, req *pb.TaskUserRequest) (*pb.TasksCompleteCountResponse, error) {
	count, err := s.taskquery.GetCountTasksCompletedByUserId(ctx, uint(req.Id))
	if err != nil {
		return &pb.TasksCompleteCountResponse{Count: 0}, err
	}
	return &pb.TasksCompleteCountResponse{Count: uint64(count)}, nil
}

func (s *Server) GetCountTasksCompleted(ctx context.Context, req *pb.Empty) (*pb.TasksCompleteCountResponse, error) {
	count, err := s.taskquery.GetCountTasksCompleted(ctx)
	if err != nil {
		return &pb.TasksCompleteCountResponse{Count: 0}, err
	}
	return &pb.TasksCompleteCountResponse{Count: uint64(count)}, nil
}

func (s *Server) GetCountActiveTasks(ctx context.Context, req *pb.Empty) (*pb.TasksCountResponse, error) {
	count, err := s.taskquery.GetCountActiveTasks(ctx)
	if err != nil {
		return &pb.TasksCountResponse{Count: 0}, err
	}
	return &pb.TasksCountResponse{Count: uint64(count)}, nil
}

func (s *Server) UploadImage(ctx context.Context, req *pb.ImageChunk) (*pb.UploadStatus, error) {
	if req == nil || req.Target == nil {
		return nil, fmt.Errorf("не передан пользователь или организация для сохранения изображения")
	}

	var dir, path string
	fmt.Printf("UploadImage: получен запрос с target = %#v\n", req.Target)

	switch target := req.Target.(type) {
	case *pb.ImageChunk_UserId:
		dir = fmt.Sprintf("uploads/avatars/user_%d", target.UserId)
		path = fmt.Sprintf("user_%d.jpeg", target.UserId)
	case *pb.ImageChunk_OrganizationId:
		dir = fmt.Sprintf("uploads/avatars/organization_%d", target.OrganizationId)
		path = fmt.Sprintf("organization_%d.jpeg", target.OrganizationId)
	default:
		return nil, fmt.Errorf("должен быть указан либо user_id, либо organization_id")
	}

	fileID, err := s.filequery.Create(ctx, filedata.CreateFileModel{SRC: filepath.Join(dir, path)})
	if err != nil {
		return nil, err
	}

	_, err = filelib.SaveInDirectoryBytes(ctx, req.Chunk, dir, path)
	if err != nil {
		return nil, fmt.Errorf("не удалось сохранить файл: %v", err)
	}

	return &pb.UploadStatus{
		Success: true,
		FileId:  uint64(fileID),
		Message: "",
	}, nil
}

func (s *Server) GetAvatarImage(ctx context.Context, req *pb.DownloadImageRequest) (*pb.DownloadImageResponse, error) {
	var imagePath string

	switch target := req.Target.(type) {
	case *pb.DownloadImageRequest_UserId:
		imagePath = fmt.Sprintf("uploads/avatars/user_%d/user_%d.jpeg", target.UserId, target.UserId)
	case *pb.DownloadImageRequest_OrganizationId:
		imagePath = fmt.Sprintf("uploads/avatars/organization_%d/organization_%d.jpeg", target.OrganizationId, target.OrganizationId)
	default:
		return nil, fmt.Errorf("должен быть указан либо user_id, либо organization_id")
	}

	fileData, err := ioutil.ReadFile(imagePath)
	if err != nil {
		defaultImagePath := "/app/uploads/user/no-avatar.jpg"
		fileData, err = ioutil.ReadFile(defaultImagePath)
		if err != nil {
			return nil, fmt.Errorf("не удалось прочитать дефолтное изображение: %w", err)
		}
	}

	return &pb.DownloadImageResponse{
		ImageData: fileData,
	}, nil
}
