package data

import "mime/multipart"

type CreateApprove struct {
	TaskID uint           `json:"task_id"`
	UserID uint           `json:"user_id"`
	File   multipart.File `json:"FilePath"`
}

type RejectApprove struct {
	ID uint `json:"id"`
}

type ConfirmApprove struct {
	ID    uint `json:"id"`
	Score uint `json:"score"`
}

type SetStatusApprove struct {
	ID       uint `json:"id"`
	Score    uint `json:"score"`
	Approved uint `json:"approved"`
	Status   uint `json:"status"`
}

type ShowApproves struct {
	TaskID uint `json:"task_id"`
	Page   uint `json:"page"`
	Limit  uint `json:"limit"`
}

// todo: поправить метод шоу для всех заявок нужно отдавать только валидные статус т.е на рассмотрении

type ShowApprovesResponse struct {
	UserID uint `json:"userID"`
	Score  uint `json:"score"`
}
