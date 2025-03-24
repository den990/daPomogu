package model

import (
	"backend/task_service/pkg/app/organization/model"
	"backend/task_service/pkg/app/task/data"
	"context"
	"time"
)

type TaskModel struct {
	ID                uint      `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement" json:"id"`
	OrganizationID    uint      `gorm:"column:organization_id;type:INTEGER;not null" json:"organization_id"`
	Name              string    `gorm:"column:name;type:VARCHAR(255);not null" json:"name"`
	TypeID            uint      `gorm:"column:type_id;type:INTEGER;not null;index" json:"type_id"`
	Description       string    `gorm:"column:description;type:TEXT;not null" json:"description"`
	Location          string    `gorm:"column:location;type:VARCHAR(255);not null" json:"location"`
	TaskDate          time.Time `gorm:"column:task_date;type:TIMESTAMP;not null" json:"task_date"`
	ParticipantsCount *int      `gorm:"column:participants_count;type:INTEGER" json:"participants_count"`
	MaxScore          *int      `gorm:"column:max_score;type:INTEGER" json:"max_score"`
	StatusID          uint      `gorm:"column:status_id;type:INTEGER;default:1;index" json:"status_id"`
	IsDeleted         bool      `gorm:"column:is_deleted;type:BOOLEAN;default:false;" json:"is_deleted"`
	CreatedAt         time.Time `gorm:"column:created_at;type:TIMESTAMP;default:CURRENT_TIMESTAMP;autoCreateTime" json:"created_at"`
	UpdatedAt         time.Time `gorm:"column:updated_at;type:TIMESTAMP;default:CURRENT_TIMESTAMP;autoUpdateTime" json:"updated_at"`
}

type TaskViewModel struct {
	ID                uint                  `json:"id"`
	OrganizationID    uint                  `json:"organization_id"`
	OrganizationName  string                `json:"organization_name"`
	Name              string                `json:"name"`
	TypeID            uint                  `json:"type_id"`
	Description       string                `json:"description"`
	Location          string                `json:"location"`
	TaskDate          time.Time             `json:"task_date"`
	ParticipantsCount *int                  `json:"participants_count"`
	MaxScore          *int                  `json:"max_score"`
	StatusID          uint                  `json:"status_id"`
	CreatedAt         time.Time             `json:"created_at"`
	UpdatedAt         time.Time             `json:"updated_at"`
	Coordinators      []TaskViewCoordinator `json:"coordinators"`
	Categories        []TaskViewCategory    `json:"categories"`
	IsRecorded        bool                  `json:"is_recorded"`
	IsResponse        bool                  `json:"is_response"`
}

type TaskViewCoordinator struct {
	ID      uint   `json:"id"`
	Name    string `json:"name"`
	Surname string `json:"surname"`
}

type TaskViewCategory struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type TasksView struct {
	OrganizationName string             `json:"organization_name"`
	Task             TaskModel          `json:"tasks"`
	Categories       []TaskViewCategory `json:"categories"`
	CountApplying    int                `json:"count_applying"`
}
type TaskViewInProfileOrganization struct {
	ID               uint      `json:"id"`
	Name             string    `json:"name"`
	TaskDate         time.Time `json:"task_date"`
	CountCoordinator int       `json:"count_coordinator"`
}

type TasksViewInProfileOrganization struct {
	Tasks []TaskViewInProfileOrganization
}

func (TaskModel) TableName() string {
	return "task"
}

type CategoryModel struct {
	ID   uint   `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	Name string `gorm:"column:name;type:VARCHAR(100);unique;not null"`
}

func (CategoryModel) TableName() string {
	return "category"
}

type TaskTypeModel struct {
	ID   uint    `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement" json:"id"`
	Name *string `gorm:"column:name;type:VARCHAR(255)" json:"name"`
}

func (TaskTypeModel) TableName() string {
	return "task_type"
}

type TaskReadRepositoryInterface interface {
	Get(ctx context.Context, id uint) (*TaskModel, error)
	GetAll(
		ctx context.Context,
		user uint,
		isOwner bool,
		organizations []model.OrganizationModel,
		page int,
	) ([]TaskModel, int, error)
	GetTasksByUserIDWithStatuses(
		ctx context.Context,
		userID uint,
		taskStatus []uint,
		page int,
		limit int,
	) ([]TaskModel, int, error)
	ShowByOrganizationId(ctx context.Context, orgId uint) ([]TaskModel, error)
	GetCountTasksCompletedByUserId(ctx context.Context, userId uint) (int, error)
	GetCountTasksCompleted(ctx context.Context) (int, error)
	GetCountActiveTasks(ctx context.Context) (int, error)
}

type TaskRepositoryInterface interface {
	TaskReadRepositoryInterface
	Delete(ctx context.Context, id uint) error
	Update(ctx context.Context, task *data.UpdateTask, id uint) error
	Create(ctx context.Context, task *data.CreateTask) (uint, error)
	Complete(ctx context.Context, id, userId uint) error
}
