package file

import (
	"context"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
)

func SaveInDirectory(ctx context.Context, file multipart.File, saveDir string, fileName string) (string, error) {
	defer file.Close()
	//saveDir := fmt.Sprintf("uploads/approves/task_%d", input.TaskID)
	//savePath := filepath.Join(saveDir, fmt.Sprintf("user_%d.%s", userID, "jpeg"))
	savePath := filepath.Join(saveDir, fileName)

	err := os.MkdirAll(saveDir, os.ModePerm)
	if err != nil {
		return savePath, err
	}

	out, err := os.Create(savePath)
	if err != nil {
		return savePath, err
	}
	defer out.Close()

	_, err = io.Copy(out, file)
	if err != nil {
		return savePath, err
	}

	return savePath, nil
}
