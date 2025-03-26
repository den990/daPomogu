package main

import (
	"fmt"
	"net/smtp"
)

func main() {
	from := "skammoshenik@gmail.com"
	password := "kbxdvwynsbnaptqp"
	toe := "artemkazel6996@gmail.com"
	//from := "artemkazel"
	//password := "xsmtpsib-46a985a24c017ea0f3ae60f4ede6a4733eb4eab3818a79c9dd4373f1fe168c73-sD3hyrZSL6OX9MAn"

	//toEmailAddress := "skammoshenik@gmail.com"
	to := []string{toe}

	host := "smtp.gmail.com"
	port := "587"
	address := host + ":" + port

	// Правильный формат письма: добавляем заголовки и пустую строку перед телом
	subject := "Subject: This is the subject of the mail\r\n"
	mime := "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=\"utf-8\"\r\n"
	emptyLine := "\r\n"
	body := "This is the body of the mail"

	message := []byte(subject + mime + emptyLine + body)

	auth := smtp.PlainAuth("", from, password, host)

	err := smtp.SendMail(address, auth, from, to, message)
	if err != nil {
		fmt.Println("Ошибка отправки:", err)
		return
	}

	fmt.Println("Письмо успешно отправлено!")
}
