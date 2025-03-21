package data

import (
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"time"
)

type CreateTask struct {
	OrganizationId    uint      `json:"organization_id"`
	Name              string    `json:"name"`
	TaskType          uint      `json:"task_type"`
	Description       string    `json:"description"`
	Location          string    `json:"location"`
	TaskDate          time.Time `json:"task_date"`
	ParticipantsCount *int      `json:"participants_count"`
	MaxScore          *int      `json:"max_score"`
	CoordinateIds     []int     `json:"coordinate_ids"`
	CategoryIds       []int     `json:"category_ids"`
}

type UpdateTask struct {
	OrganizationId    uint      `json:"organization_id"`
	Name              string    `json:"name"`
	TaskType          uint      `json:"task_type"`
	Description       string    `json:"description"`
	Location          string    `json:"location"`
	TaskDate          time.Time `json:"task_date"`
	ParticipantsCount *int      `json:"participants_count"`
	MaxScore          *int      `json:"max_score"`
	CoordinateIds     []int     `json:"coordinate_ids"`
	CategoryIds       []int     `json:"category_ids"`
}

type DeleteTask struct {
	ID uint `json:"id" binding:"required"`
}

type GetTask struct {
	ID uint `json:"id" binding:"required"`
}

type GetAllTasks struct {
	Pagination paginate.Pagination `json:"pagination"`
}

type GetTasksByUser struct {
	Page  int `json:"page"`
	Limit int `json:"limit"`
}
