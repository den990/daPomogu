package paginate

const (
	DefaultLimit = 10
	DefaultPage  = 1
	MinPage      = 0
	MinLimit     = 0
)

type Pagination struct {
	Limit      int         `json:"limit,omitempty;query:limit"`
	Page       int         `json:"page,omitempty;query:page"`
	Rows       interface{} `json:"rows"`
	TotalPages int         `json:"totalPages"`
}
