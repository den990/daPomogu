package hub

import (
	"backend/task_service/pkg/app/comment/data"
	commentquery "backend/task_service/pkg/app/comment/query"
	commentservice "backend/task_service/pkg/app/comment/service"
	"backend/task_service/pkg/infrastructure/lib/paginate"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"sync"
)

type Hub struct {
	clients        map[uint]map[*Client]bool // userId -> {клиенты}
	commentService commentservice.CommentServiceInterface
	commentQuery   commentquery.CommentQueryInterface
	register       chan *Client
	unregister     chan *Client
	broadcast      chan Message
	mu             sync.Mutex
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func ServeWS(ctx *gin.Context, roomID uint, h *Hub) {
	ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		fmt.Println("Ошибка WebSocket:", err)
		return
	}
	client := NewClient(roomID, ws, h)
	h.RegisterClient(client)

	go client.Write()
	go client.Read()
}

type Message struct {
	Type   string `json:"type"`
	TaskID uint   `json:"task_id"`
	Data   string `json:"data"`
	UserID uint   `json:"user_id"` // todo: передать в строке подключения
}

func NewHub(
	commentService commentservice.CommentServiceInterface,
	commentQuery commentquery.CommentQueryInterface,
) *Hub {
	return &Hub{
		clients:        make(map[uint]map[*Client]bool),
		commentService: commentService,
		commentQuery:   commentQuery,
		register:       make(chan *Client),
		unregister:     make(chan *Client),
		broadcast:      make(chan Message),
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

	switch message.Type {
	case "Create":
		fmt.Println(message.Type)
		cooment, err := h.commentService.Create(
			context.Background(),
			data.CreateComment{Comment: message.Data, TaskID: message.TaskID},
			message.UserID,
		)

		if err != nil {
			h.sendMessageToClients(message.TaskID, "its ok")
			return
		}

		h.sendMessageToClients(message.TaskID, cooment)
		return
	case "Get":
		fmt.Println(message.Type)
		var pagination paginate.Pagination
		err := json.Unmarshal([]byte(message.Data), &pagination)
		if err != nil {
			h.sendMessageToClients(message.TaskID, "its ok")
			return
		}

		// todo: поправить пагинацию
		comments, err := h.commentQuery.Show(
			context.Background(),
			data.ShowComment{
				TaskID: message.TaskID,
				Page:   pagination.Page,
				Limit:  pagination.Limit,
			},
		)
		fmt.Println(comments)
		if err != nil {
			h.sendMessageToClients(message.TaskID, "its ok")
			return
		}

		h.sendMessageToClients(message.TaskID, *comments)
		return
	default:
		return
	}
}

func (h *Hub) sendMessageToClients(taskID uint, data interface{}) {
	message := Message{
		Type:   "message",
		TaskID: taskID,
		Data:   serializeData(data),
	}

	for client := range h.clients[taskID] {
		select {
		case client.send <- message:
		default:
			close(client.send)
			delete(h.clients[taskID], client)
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
