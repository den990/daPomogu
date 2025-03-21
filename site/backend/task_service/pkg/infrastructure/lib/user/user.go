package user

import (
	usermodel "backend/task_service/pkg/app/user/model"
	"fmt"
)

func FindUser(users []usermodel.UserModel, id uint) (usermodel.UserModel, error) {
	for _, user := range users {
		if user.ID == id {
			return user, nil
		}
	}
	return usermodel.UserModel{}, fmt.Errorf("Пользователь не найден")
}
