package Server

import (
	pb "backend/proto-functions/task"
	_ "backend/task_service/pkg/app/task/model"
	"backend/task_service/pkg/app/task/query"
	"context"
	"fmt"
	_ "fmt"
	"time"
)

type Server struct {
	pb.UnimplementedTaskServiceServer
	taskquery     query.TaskQueryInterface
	taskuserquery query.TaskUserQueryInterface
}

func NewServer(taskQuery query.TaskQueryInterface, taskUserQuery query.TaskUserQueryInterface) *Server {
	return &Server{
		taskquery:     taskQuery,
		taskuserquery: taskUserQuery,
	}
}

func (s *Server) GetTasksByOrganizationId(ctx context.Context, req *pb.TaskOrganizationRequest) (*pb.TasksViewInProfileOrganization, error) {
	var response pb.TasksViewInProfileOrganization
	fmt.Println("f1")
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
