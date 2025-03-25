package service

import (
	"context"
	"fmt"
	"net/smtp"
)

type EmailSenderInterface interface {
	SendEmail(ctx context.Context, data string) error
}

type EmailSender struct {
}

func NewEmailSender() *EmailSender {
	return &EmailSender{}
}

func (e *EmailSender) SendEmail(ctx context.Context, data string) error {
	from := "skammoshenik@gmail.com"
	password := ""

	to := []string{"skammoshenik@gmail.com"}

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	message := []byte("Subject: Тестовое сообщение\n\nТестовое сообщение через Go.")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}
