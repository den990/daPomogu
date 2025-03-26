package service

import (
	usermodel "backend/notification_service/pkg/app/model"
	"context"
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
	key := "xsmtpsib-46a985a24c017ea0f3ae60f4ede6a4733eb4eab3818a79c9dd4373f1fe168c73-0fSTzsWG1KVpXtRq"
	from := "88e54e001@smtp-brevo.com"
	host := "smtp-relay.brevo.com"
	port := 587

	to := user.Email

	msg := gomail.NewMessage()
	msg.SetHeader("From", from)
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", "Уведомление")
	msg.SetBody("text/plain", data)

	n := gomail.NewDialer(host, port, from, key)
	if err := n.DialAndSend(msg); err != nil {
		return err
	}

	fmt.Println("Email sent to", user.Email)

	return nil
}
