package data

import (
	"backend/client/pkg/app/paginate"
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
	ID                uint      `json:"id"`
	Name              string    `json:"name"`
	Description       string    `json:"description"`
	Location          string    `json:"location"`
	TaskDate          time.Time `json:"task_date"`
	ParticipantsCount *int      `json:"participants_count"`
	MaxScore          *int      `json:"max_score"`

	Organization uint `json:"organization"`
	TaskType     uint `json:"task_type"`
	TaskStatus   uint `json:"task_status"`
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
