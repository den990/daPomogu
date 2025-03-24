package models

type Statistic struct {
	CountUser          uint `json:"count_user"`
	CountActiveTasks   uint `json:"count_active_tasks"`
	CountBlockedUsers  uint `json:"count_blocked_users"`
	CountFinishedTasks uint `json:"count_finished_tasks"`
}
