package service

import (
	"backend/task_service/pkg/app/approve/data"
	"backend/task_service/pkg/app/approve/model"
	filedata "backend/task_service/pkg/app/file/data"
	fileservice "backend/task_service/pkg/app/file/service"
	notificationmodel "backend/task_service/pkg/app/notification/model"
	notificationservice "backend/task_service/pkg/app/notification/service"
	organizationquery "backend/task_service/pkg/app/organization/query"
	taskquery "backend/task_service/pkg/app/task/query"
	usermodel "backend/task_service/pkg/app/user/model"
	userquery "backend/task_service/pkg/app/user/query"
	filelib "backend/task_service/pkg/infrastructure/lib/file"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"errors"
	"fmt"
	"gorm.io/gorm"
	"path/filepath"
)

type ApproveServiceInterface interface {
	Create(ctx context.Context, dto data.CreateApprove) (uint, error)
	Confirm(ctx context.Context, dto data.ConfirmApprove, userID uint) error
	Reject(ctx context.Context, dto data.RejectApprove, userID uint) error
	Show(ctx context.Context, dto data.ShowApproves) (paginate.Pagination, error)
	Get(ctx context.Context, id uint) (data.ApproveResponse, error)
	GetByParams(ctx context.Context, userID, taskID uint) (*model.ApproveTaskModel, error)
}

type ApproveService struct {
	repository          model.ApproveRepositoryInterface
	approvestatusrepo   model.ApproveTaskStatusReadRepositoryInterface
	userquery           userquery.UserQueryInterface
	fileservice         fileservice.FileServiceInterface
	approvefileService  ApproveFileServiceInterface
	organizationquery   organizationquery.OrganizationQueryInterface
	taskquery           taskquery.TaskQueryInterface
	taskuserquery       taskquery.TaskUserQueryInterface
	notificationService notificationservice.NotificationServiceInterface
}

func NewApproveService(
	repository model.ApproveRepositoryInterface,
	approvestatusrepo model.ApproveTaskStatusReadRepositoryInterface,
	userquery userquery.UserQueryInterface,
	fileservice fileservice.FileServiceInterface,
	approvefileService ApproveFileServiceInterface,
	organizationquery organizationquery.OrganizationQueryInterface,
	taskquery taskquery.TaskQueryInterface,
	taskuserquery taskquery.TaskUserQueryInterface,
	notificationService notificationservice.NotificationServiceInterface,
) ApproveServiceInterface {
	return &ApproveService{
		repository:          repository,
		userquery:           userquery,
		approvestatusrepo:   approvestatusrepo,
		fileservice:         fileservice,
		approvefileService:  approvefileService,
		organizationquery:   organizationquery,
		taskquery:           taskquery,
		taskuserquery:       taskuserquery,
		notificationService: notificationService,
	}
}

func (a *ApproveService) Create(ctx context.Context, dto data.CreateApprove) (uint, error) {
	status, err := a.approvestatusrepo.Get(ctx, "На рассмотрении")
	if err != nil {
		return 0, err
	}

	_, err = a.repository.GetByParams(ctx, dto.TaskID, dto.UserID)
	if err != nil {
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return 0, err
		}
	}

	approveID, err := a.repository.Create(ctx, dto, status)
	if err != nil {
		return 0, err
	}

	dir := fmt.Sprintf("uploads/approves/task_%d", dto.TaskID)
	path := fmt.Sprintf("user_%d.%s", dto.UserID, "jpeg")
	fileID, err := a.fileservice.Create(ctx, filedata.CreateFileModel{SRC: filepath.Join(dir, path)})
	if err != nil {
		return 0, err
	}
	_, err = filelib.SaveInDirectory(ctx, dto.File, dir, path)
	if err != nil {

		return 0, err
	}

	_, err = a.approvefileService.Create(ctx, data.CreateApproveFile{
		ApproveTaskID: approveID,
		UserID:        dto.UserID,
		FileID:        fileID,
	})
	if err != nil {
		return 0, err
	}

	return approveID, nil
}

func (a *ApproveService) Confirm(ctx context.Context, dto data.ConfirmApprove, userID uint) error {
	status, err := a.approvestatusrepo.Get(ctx, "Принято")
	if err != nil {
		return err
	}

	_, err = a.organizationquery.GetOrganizationByOwnerUserID(ctx, uint64(userID))

	if err != nil {
		isCoordinator, _ := a.taskuserquery.IsCoordinatorByTaskId(ctx, dto.TaskId, userID)
		if !isCoordinator {
			return errors.New("Пользователь не является овнером или координатором организации")
		}
	}

	approve, err := a.repository.Get(ctx, dto.ID)
	if err != nil {
		return err
	}

	task, err := a.taskquery.Get(ctx, approve.TaskID)
	if err != nil {
		return err
	}

	message := fmt.Sprintf("Ваш фотоотчёт для задания \"%s\" подтвержден", task.Name)

	err = a.notificationService.Send(ctx, notificationmodel.Notification{
		UserId: approve.UserID,
		Data:   message,
	})

	return a.repository.Update(ctx, data.SetStatusApprove{
		ID:       dto.ID,
		Score:    dto.Score,
		Approved: userID,
		Status:   status,
	})
}

func (a *ApproveService) Reject(ctx context.Context, dto data.RejectApprove, userID uint) error {
	status, err := a.approvestatusrepo.Get(ctx, "Отказано")
	if err != nil {
		return err
	}

	_, err = a.organizationquery.GetOrganizationByOwnerUserID(ctx, uint64(userID))
	if err != nil {
		return errors.New("Пользователь не является овнером организации")
	}

	approve, err := a.repository.Get(ctx, dto.ID)
	if err != nil {
		return err
	}

	task, err := a.taskquery.Get(ctx, approve.TaskID)
	if err != nil {
		return err
	}

	message := fmt.Sprintf("Ваш фотоотчёт для задания \"%s\" отклонён", task.Name)

	err = a.notificationService.Send(ctx, notificationmodel.Notification{
		UserId: approve.UserID,
		Data:   message,
	})

	return a.repository.Update(ctx, data.SetStatusApprove{
		ID:       dto.ID,
		Score:    0,
		Approved: userID,
		Status:   status,
	})
}

func (a *ApproveService) Show(ctx context.Context, dto data.ShowApproves) (paginate.Pagination, error) {
	status, err := a.approvestatusrepo.Get(ctx, "На рассмотрении")
	if err != nil {
		return paginate.Pagination{}, err
	}

	approves, total, err := a.repository.Show(ctx, dto, status)
	if err != nil {
		return paginate.Pagination{}, err
	}
	fmt.Println(approves)
	userIDs := make([]uint64, len(approves))
	for _, el := range approves {
		userIDs = append(userIDs, uint64(el.UserID))
	}
	fmt.Println(userIDs)
	var res []struct {
		ID     uint
		TaskID uint
		User   usermodel.UserModel
		File   string
	}

	users, err := a.userquery.GetUsersByIDS(ctx, userIDs)
	for _, el := range approves {
		user, err := findUser(users, el.UserID)
		if err != nil {
			continue
		}

		res = append(res, struct {
			ID     uint
			TaskID uint
			User   usermodel.UserModel
			File   string
		}{
			ID:     el.ID,
			TaskID: el.TaskID,
			User:   user,
			File:   el.SRC,
		})
	}

	return paginate.Pagination{
		Limit:      int(dto.Limit),
		Page:       int(dto.Page),
		Rows:       res,
		TotalPages: int(total),
	}, err
}

func findUser(users []usermodel.UserModel, id uint) (usermodel.UserModel, error) {
	for _, user := range users {
		if user.ID == id {
			return user, nil
		}
	}
	return usermodel.UserModel{}, fmt.Errorf("Пользователь не найден")
}

/*func findFile(files []filemodel.FileModel, id uint) (filemodel.FileModel, error) {
	for _, user := range files {
		if user.ID == id {
			return user, nil
		}
	}
	return filemodel.FileModel{}, fmt.Errorf("Пользователь не найден")
}*/

func (a *ApproveService) Get(ctx context.Context, id uint) (data.ApproveResponse, error) {
	approve, err := a.repository.Get(ctx, id)
	if err != nil {
		return data.ApproveResponse{}, err
	}

	task, err := a.taskquery.Get(ctx, approve.TaskID)
	if err != nil {
		return data.ApproveResponse{}, err
	}

	user, err := a.userquery.GetUser(ctx, uint64(approve.UserID))
	if err != nil {
		return data.ApproveResponse{}, err
	}

	approveFile, err := a.approvefileService.Get(ctx, approve.ID)

	file, err := a.fileservice.Get(ctx, approveFile.FileID)

	maxScore := 0
	if task.MaxScore != nil {
		maxScore = int(*task.MaxScore)
	}

	return data.ApproveResponse{
		Id:           approve.ID,
		User:         user,
		File:         file.SRC,
		TaskID:       approve.TaskID,
		TaskMaxScore: maxScore,
	}, nil
}

func (a *ApproveService) GetByParams(ctx context.Context, userID, taskID uint) (*model.ApproveTaskModel, error) {
	approve, err := a.repository.GetByParams(ctx, taskID, userID)
	if err != nil {
		return &model.ApproveTaskModel{}, err
	}

	return &approve, nil
}
