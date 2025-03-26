package service

import (
	_interface "backend/notification_service/pkg/app/interface"
	"backend/notification_service/pkg/infra/transport/internalapi"
	"context"
	"fmt"
	"sync"

	"backend/notification_service/pkg/app/model"
)

const bufferSize = 20

type PullerStarter interface {
	Run()
}

type Puller struct {
	Getter              chan model.Notification
	Sender              chan model.Notification
	Register            chan _interface.ClientInterface
	Unregister          chan _interface.ClientInterface
	clients             map[uint]_interface.ClientInterface
	mu                  sync.Mutex
	notificationservice NotificationServiceInterface
	emailSender         *EmailSender
	client              *internalapi.Client
}

func NewPuller(
	notificationservice NotificationServiceInterface,
	emailSender *EmailSender,
	addr string,
) *Puller {
	client, err := internalapi.NewGrpcClient(addr)
	if err != nil {
		return nil
	}

	return &Puller{
		Getter:              make(chan model.Notification, bufferSize),
		Sender:              make(chan model.Notification, bufferSize),
		Register:            make(chan _interface.ClientInterface, bufferSize),
		Unregister:          make(chan _interface.ClientInterface, bufferSize),
		clients:             make(map[uint]_interface.ClientInterface),
		notificationservice: notificationservice,
		emailSender:         emailSender,
		client:              client,
	}
}

func (p *Puller) Run() {
	for {
		select {
		case client := <-p.Register:
			p.reg(client)
		case client := <-p.Unregister:
			p.unreg(client)
		case message := <-p.Getter:
			p.get(message)
		case message := <-p.Sender:
			p.send(message)
		}
	}
}

func (p *Puller) RegisterClient(client _interface.ClientInterface) {
	p.Register <- client
}

func (p *Puller) UnregisterClient(client _interface.ClientInterface) {
	p.Unregister <- client
}

func (p *Puller) GetNotifications(ctx context.Context, n model.Notification) {
	p.Getter <- n
}

func (p *Puller) SendNotification(ctx context.Context, n model.Notification) {
	p.Sender <- n
}

func (p *Puller) reg(clientID _interface.ClientInterface) {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.clients[clientID.GetID()] = clientID

	fmt.Println("Клиент подключился:", clientID.GetID())
}

func (p *Puller) unreg(clientID _interface.ClientInterface) {
	p.mu.Lock()
	defer p.mu.Unlock()

	if _, ok := p.clients[clientID.GetID()]; ok {
		delete(p.clients, clientID.GetID())
	}
}

func (p *Puller) get(n model.Notification) {
	// сохранить статус прочитано на тру
	err := p.notificationservice.SetIsRead(context.Background(), uint(n.ID))
	if err != nil {
		fmt.Println(err)
	}
}

func (p *Puller) send(n model.Notification) {
	// сохранить в бд
	// искать клиента по id если есть отправить
	err := p.notificationservice.CreateMessage(context.Background(), n)
	if err != nil {
		fmt.Println(err)
		return
	}

	user, err := p.client.GetUser(context.Background(), n.UserID)
	if err != nil {
		fmt.Println(err)
		return
	}
	err = p.emailSender.SendEmail(context.Background(), n.Message, user)
	if err != nil {
		fmt.Println(err)
	}

	if client, ok := p.clients[uint(n.UserID)]; ok {
		client.SendNotification(context.Background(), n)
	}
}

func (p *Puller) SetIsRead(ctx context.Context, n model.Notification) {
	p.notificationservice.SetIsRead(ctx, uint(n.ID))
}
