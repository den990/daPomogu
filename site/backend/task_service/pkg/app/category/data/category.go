package data

type CreateCategory struct {
	Name string `json:"name"`
}

type UpdateCategory struct {
	ID   uint   `json:"response_id"`
	Name string `json:"name"`
}

type Category struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type GetCategories struct {
	Categories []Category `json:"categories"`
}
