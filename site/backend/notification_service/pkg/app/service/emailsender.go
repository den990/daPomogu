package service

import "context"

type EmailSenderInterface interface {
	SendEmail(ctx context.Context, data string) error
}

type EmailSender struct {
}

func NewEmailSender() *EmailSender {
	return &EmailSender{}
}

func (e *EmailSender) SendEmail(ctx context.Context, data string) error {
	return nil
}
