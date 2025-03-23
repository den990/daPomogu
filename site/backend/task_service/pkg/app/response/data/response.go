package data

type CreateResponse struct {
	TaskId uint `json:"task_id"` // todo: рекуаред
	// userid достаю из токена
}

// todo: сделать два разных метода для отмены отклика и для подтверждения отклика
// todo: сделал 2 разных метода но статусы ищу самостоятельно
type UpdateResponse struct {
	ID uint `json:"response_id"`
}

// todo: валдидировать что координатор - на фронте
type GetResponses struct {
	TaskId uint `json:"task_id"`
	Page   int  `json:"page,omitempty;query:page"`
	Limit  int  `json:"limit,omitempty;query:limit"`
}

type DeleteResponse struct {
	TaskID uint `json:"task_id"`
	UserID uint `json:"user_id"`
}
