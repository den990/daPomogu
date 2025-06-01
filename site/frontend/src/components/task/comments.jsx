import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function Comments({ task }) {
    const { token, id } = useContext(AuthContext);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const ws = new WebSocket("wss://api.dapomogu.ru/ws/");

        ws.onopen = () => {
            console.log("✅ Соединение установлено");

            const initMessage = {
                action: "SetUser",
                token: token,
                room_id: task.id,
            };
            ws.send(JSON.stringify(initMessage));

            getMessages(ws);
        };

        ws.onerror = (error) => {
            console.log("❌ Ошибка:", error);
        };

        ws.onclose = () => {
            console.log("🔴 Соединение закрыто");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "message") {
                try {
                    const parsedMessages = typeof data.data === "string" ? JSON.parse(data.data) : data.data;
                    setMessages(parsedMessages.rows || []);
                } catch (error) {
                    console.error("Ошибка при обработке данных:", error);
                }
            }
        };

        setSocket(ws);

        return () => {
            if (ws) {
                ws.close();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const message = {
                action: "CreateComment",
                data: comment,
                user_id: Number(id),
                token: token,
                room_id: Number(task.id),
            };
            socket.send(JSON.stringify(message));
            console.log("📤 Сообщение отправлено:", message);
            setComment("");
            getMessages(socket);
        } else {
            console.log("⚠️ WebSocket не подключен");
        }
    };

    const getMessages = (ws) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const message = {
                action: "GetComments",
                token: token,
                room_id: Number(task.id),
                data: JSON.stringify({
                    limit: 100,
                    page: 1,
                    rows: [],
                }),
                user_id: Number(id),
            };
            ws.send(JSON.stringify(message));
            console.log("📤 Сообщения получены:", message);
        } else {
            console.log("⚠️ WebSocket не подключен");
        }
    };

    return (
        <div id="task-comments" className="mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl mb-4 font-semibold">Комментарии</h2>
            <div className="space-y-4 mb-4">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div key={message.comment.ID} className="bg-white p-4 rounded-lg shadow-md border">
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    alt="person"
                                    src={message.user.avatar}
                                />
                                <div>
                                    <div className="text-sm md:text-base font-medium">
                                        {message.user.id === id ? "Вы" : message.user.name}
                                    </div>
                                    <div className="text-xs md:text-sm text-neutral-500">
                                        {new Date(message.comment.CreatedAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <p className="text-neutral-700 text-sm md:text-base">{message.comment.Comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-neutral-500 text-sm">Нет комментариев.</p>
                )}
            </div>
            {task.role_in_task !== "user" && (
                <div className="bg-white p-4 rounded-lg shadow-md border">
                    <textarea
                        className="w-full border rounded-lg p-3 mb-3 text-sm md:text-base placeholder-neutral-500"
                        placeholder="Написать комментарий..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm md:text-base"
                        onClick={sendMessage}
                    >
                        Отправить
                    </button>
                </div>
            )}
        </div>
    );
}

export default Comments;
