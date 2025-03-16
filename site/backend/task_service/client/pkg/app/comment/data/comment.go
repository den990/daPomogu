package data

import "backend/client/pkg/app/paginate"

type CreateComment struct {
	TaskID  uint
	Comment string
}

type ShowComment struct {
	TaskID     uint
	Pagination paginate.Pagination
}
