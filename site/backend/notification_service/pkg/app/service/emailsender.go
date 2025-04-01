package service

import (
	usermodel "backend/notification_service/pkg/app/model"
	"context"
	"crypto/tls"
	"fmt"
	gomail "gopkg.in/gomail.v2"
)

type EmailSenderInterface interface {
	SendEmail(ctx context.Context, data string) error
}

type EmailSender struct {
}

func NewEmailSender() *EmailSender {
	return &EmailSender{}
}

// xsmtpsib-46a985a24c017ea0f3ae60f4ede6a4733eb4eab3818a79c9dd4373f1fe168c73-0fSTzsWG1KVpXtRq
func (e *EmailSender) SendEmail(ctx context.Context, data string, user usermodel.UserModel) error {
	from := "koldyrev03@gmail.com"
	key := "lpkhhnmyyywnakbl"

	//key := "xsmtpsib-46a985a24c017ea0f3ae60f4ede6a4733eb4eab3818a79c9dd4373f1fe168c73-sD3hyrZSL6OX9MAn"
	//from := "88e54e002@smtp-brevo.com"
	host := "smtp.gmail.com"
	port := 587

	to := user.Email

	msg := gomail.NewMessage()
	msg.SetHeader("From", from)
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", "Уведомление")
	msg.SetBody("text/plain", data)

	n := gomail.NewDialer(host, port, from, key)
	n.TLSConfig = &tls.Config{InsecureSkipVerify: false, ServerName: host}
	sender, err := n.Dial()
	if err != nil {
		fmt.Println("Ошибка при соединении с SMTP: %v", err)
		return err
	}

	if err := gomail.Send(sender, msg); err != nil {
		fmt.Println("Ошибка при отправке email: %v", err)
		return err
	}
	/*if err := n.DialAndSend(msg); err != nil {
		fmt.Println("Ошибка", err)
		return err
	}*/

	fmt.Println("Email sent to", user.Email)

	return nil
}
