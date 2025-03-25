package data

type CreateComment struct {
	TaskID  uint   `json:"task_id"`
	Comment string `json:"comment"`
	UserID  uint   `json:"user_id"`
	// пользователя брать из под токена
}

type ShowComment struct {
	TaskID uint `json:"task_id"`
	Page   int  `json:"page,omitempty;query:page"`
	Limit  int  `json:"limit,omitempty;query:limit"`
	//
}

type ShowCommentResponse struct {
	// пагинацию комментария и пользователей
}
