package service

import (
	"context"
	"fmt"
	"sync"

	"backend/notification_service/pkg/app/model"
)

const bufferSize = 20

type PullerInterface interface {
	GetNotifications(ctx context.Context, n model.Notification)
	SendNotification(ctx context.Context, n model.Notification)
	RegisterClient(client ClientInterface)
	UnregisterClient(client ClientInterface)
}

type ClientInterface interface {
	SendNotification(ctx context.Context, n model.Notification)
	GetID() uint
}

type PullerStarter interface {
	Run()
}

type Puller struct {
	Getter              chan model.Notification
	Sender              chan model.Notification
	Register            chan ClientInterface
	Unregister          chan ClientInterface
	clients             map[uint]ClientInterface
	mu                  sync.Mutex
	notificationservice NotificationServiceInterface
}

func NewPuller(notificationservice NotificationServiceInterface) *Puller {
	return &Puller{
		Getter:              make(chan model.Notification, bufferSize),
		Sender:              make(chan model.Notification, bufferSize),
		Register:            make(chan ClientInterface, bufferSize),
		Unregister:          make(chan ClientInterface, bufferSize),
		clients:             make(map[uint]ClientInterface),
		notificationservice: notificationservice,
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

func (p *Puller) RegisterClient(client ClientInterface) {
	p.Register <- client
}

func (p *Puller) UnregisterClient(client ClientInterface) {
	p.Unregister <- client
}

func (p *Puller) GetNotifications(ctx context.Context, n model.Notification) {
	p.Getter <- n
}

func (p *Puller) SendNotification(ctx context.Context, n model.Notification) {
	p.Sender <- n
}

func (p *Puller) reg(clientID ClientInterface) {
	p.mu.Lock()
	defer p.mu.Unlock()

	p.clients[clientID.GetID()] = clientID

	fmt.Println("Клиент подключился:", clientID.GetID())
}

func (p *Puller) unreg(clientID ClientInterface) {
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

	if client, ok := p.clients[uint(n.UserID)]; ok {
		client.SendNotification(context.Background(), n)
	}
}
