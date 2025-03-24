package file

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
)

func SaveInDirectory(ctx context.Context, file multipart.File, saveDir string, fileName string) (string, error) {
	if saveDir == "" {
		return "", fmt.Errorf("директория для сохранения не указана")
	}

	err := os.MkdirAll(saveDir, os.ModePerm)
	if err != nil {
		return "", fmt.Errorf("ошибка при создании директории: %w", err)
	}

	savePath := filepath.Join(saveDir, fileName)

	var buf bytes.Buffer
	_, err = io.Copy(&buf, file)
	if err != nil {
		return "", fmt.Errorf("ошибка при копировании файла в буфер: %w", err)
	}

	fileCopy := bytes.NewReader(buf.Bytes())

	out, err := os.Create(savePath)
	if err != nil {
		return "", fmt.Errorf("ошибка при создании файла: %w", err)
	}
	defer out.Close()

	_, err = io.Copy(out, fileCopy)
	if err != nil {
		return "", fmt.Errorf("ошибка при сохранении файла: %w", err)
	}

	return savePath, nil
}
