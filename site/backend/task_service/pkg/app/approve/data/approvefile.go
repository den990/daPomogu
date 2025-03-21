package data

type CreateApproveFile struct {
	UserID        uint
	FileID        uint
	ApproveTaskID uint
}

type ApproveFile struct {
	ID     uint   `gorm:"column:id;type:SERIAL;primaryKey;autoIncrement"`
	TaskID uint   `gorm:"column:task_id;type:INTEGER;not null;index"`
	UserID uint   `gorm:"column:user_id;type:INTEGER;not null;index"`
	SRC    string `gorm:"column:src;type:TEXT;not null"`
}

func (ApproveFile) TableName() string {
	return "approve_task"
}
