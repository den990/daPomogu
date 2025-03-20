package data

type GetTaskCategory struct {
	TaskID     uint `json:"task_id"`
	CategoryID uint `json:"category_id"`
}

type GetTaskCategoryResponse struct {
	// users paginations
}

type AddTaskCategory struct {
	TaskID     uint `json:"task_id"`
	CategoryID uint `json:"category_id"`
}

type DeleteTaskCategory struct {
	TaskID     uint `json:"task_id"`
	CategoryID uint `json:"category_id"`
}
