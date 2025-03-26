package hub

import (
	"backend/chat/pkg/model"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"sync"
)

type ChatServiceInterface interface {
	CreateChat(ctx context.Context, chat model.Chat) (model.Chat, error)
	CreateMessage(ctx context.Context, mess model.Message) (model.Message, error)
	ShowChats(ctx context.Context, userID uint, page, limit uint) (paginate.Pagination, error)
	ShowMessages(ctx context.Context, chatID uint, page, limit uint) (paginate.Pagination, error)
}

type Hub struct {
	clients     map[uint]map[*Client]bool // userId -> {клиенты}
	chatservice ChatServiceInterface
	register    chan *Client
	unregister  chan *Client
	broadcast   chan Message
	mu          sync.Mutex
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func ServeWS(ctx *gin.Context, roomID, clientId uint, h *Hub) {
	ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		fmt.Println("Ошибка WebSocket:", err)
		return
	}
	client := NewClient(roomID, ws, h, clientId)
	h.RegisterClient(client)

	go client.Write()
	go client.Read()
}

type Message struct {
	Type   string `json:"type"`
	ChatId uint   `json:"chat_id"`
	Data   string `json:"data"`
	UserID uint   `json:"user_id"` // todo: передать в строке подключения
}

func NewHub(chatservice ChatServiceInterface) *Hub {
	return &Hub{
		clients:     make(map[uint]map[*Client]bool),
		chatservice: chatservice,
		register:    make(chan *Client),
		unregister:  make(chan *Client),
		broadcast:   make(chan Message),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.RegisterClient(client)
		case client := <-h.unregister:
			h.RemoveClient(client)
		case message := <-h.broadcast:
			h.HandleMessage(message)
		}
	}
}

func (h *Hub) RegisterClient(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if h.clients[client.RoomID] == nil {
		h.clients[client.RoomID] = make(map[*Client]bool)
	}
	h.clients[client.RoomID][client] = true
	fmt.Println("Клиент подключился:", client.RoomID)
}

func (h *Hub) RemoveClient(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()

	if _, ok := h.clients[client.RoomID]; ok {
		delete(h.clients[client.RoomID], client)
		close(client.send)
		fmt.Println("Клиент отключён:", client.RoomID)
	}
}

func (h *Hub) HandleMessage(message Message) {
	h.mu.Lock()
	defer h.mu.Unlock()
	fmt.Println(message)
	switch message.Type {
	case "CreateMessage":
		fmt.Println(message.Type)

		chat, err := h.chatservice.CreateMessage(
			context.Background(),
			model.Message{
				UserID:  message.UserID,
				Message: message.Data,
				ChatID:  message.ChatId,
			})
		if err != nil {
			h.sendMessageToClients(message.ChatId, "its ok")
		}

		h.sendMessageToClients(message.ChatId, chat)
		return
	case "GetMessages":
		fmt.Println(message.Type)
		var pagination struct {
			Page   uint `json:"page"`
			Limit  uint `json:"limit"`
			ChatID uint `json:"chat_id"`
		}
		err := json.Unmarshal([]byte(message.Data), &pagination)
		if err != nil {
			h.sendMessageToClients(message.ChatId, "its ok")
			return
		}
		messages, err := h.chatservice.ShowMessages(context.Background(), pagination.ChatID, pagination.Page, pagination.Limit)
		if err != nil {
			h.sendMessageToClients(message.ChatId, "its ok")
			return
		}
		h.sendMessageToClients(message.ChatId, messages)
		return
	case "ShowChats":
		var pagination struct {
			Page   uint `json:"page"`
			Limit  uint `json:"limit"`
			UserID uint `json:"user_id"`
		}
		err := json.Unmarshal([]byte(message.Data), &pagination)
		if err != nil {
			h.sendMessageToClients(message.ChatId, "its ok")
			return
		}
		chats, err := h.chatservice.ShowChats(context.Background(), pagination.UserID, pagination.Page, pagination.Limit)
		if err != nil {
			h.sendMessageToClients(message.ChatId, "its ok")
		}
		h.sendMessageToClients(message.ChatId, chats)
	case "CreateChat":
		var data struct {
			User1ID uint `json:"user1_id"`
			User2ID uint `json:"user2_id"`
		}
		fmt.Println(data)
		err := json.Unmarshal([]byte(message.Data), &data)
		if err != nil {
			h.sendMessageToClients(message.ChatId, "its ok")
			return
		}
		chat, err := h.chatservice.CreateChat(context.Background(), model.Chat{
			User1ID: data.User1ID,
			User2ID: data.User2ID,
		})
		if err != nil {
			h.sendMessageToClients(message.ChatId, "its ok")
			return
		}
		h.sendMessageToClients(message.ChatId, chat)
	default:
		return
	}
}

func (h *Hub) sendMessageToClients(chatId uint, data interface{}) {
	message := Message{
		Type:   "message",
		ChatId: chatId,
		Data:   serializeData(data),
	}

	for client := range h.clients[chatId] {
		select {
		case client.send <- message:
		default:
			close(client.send)
			delete(h.clients[chatId], client)
		}
	}
}

func serializeData(comments interface{}) string {
	jsonData, err := json.Marshal(comments)
	if err != nil {
		fmt.Println("Ошибка сериализация:", err)
		return "[]"
	}
	return string(jsonData)
}
