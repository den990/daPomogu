package data

type CreateResponse struct {
	TaskId uint `json:"task_id"`
	Status uint `json:"status"`
}

type UpdateResponse struct {
	ID     uint `json:"response_id"`
	Status uint `json:"status"`
}

type Response struct {
	ID     uint `json:"id"`
	TaskId uint `json:"task_id"`
	UserId uint `json:"user_id"`
	Status uint `json:"status_id"`
}

type GetResponses struct {
	Responses []Response `json:"responses"`
}
