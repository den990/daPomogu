import { useState, useContext, useEffect, useRef } from "react";
import Header from "../components/chat/header";
import ChatContainer from "../components/chat/chat-container";
import Footer from "../components/chat/footer";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import { AuthContext } from "../context/AuthProvider";
import { chatServiceApi } from "../utils/api/chat_service";
import { format, isToday, isYesterday, isThisYear, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { Dialog } from "@headlessui/react";

function Chat() {
    const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);
    const { token, logout, id } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    const [messages, setMessages] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [isLoadingMessage, setIsLoadingMessage] = useState(false);

    const messagesContainerRef = useRef(null);
    const isNewMessageRef = useRef(false);

    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const isMobile = window.innerWidth < 640;
        if (isMobile && !activeChat) {
            setIsApplicationsOpen(true);
        }
    }, [activeChat]);

    useEffect(() => {
        if (!token) return;

        setIsLoading(true);
        if (chats.length === 0) {
            chatServiceApi
                .getChats(token, logout)
                .then((res) => {
                    setChats(res.data);
                })
                .catch(() => {
                    setChats([]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [token, logout, chats.length]);

    const loadMessages = () => {
        if (isLoadingMessage || !hasMoreMessages || !activeChat) return;

        const container = messagesContainerRef.current;
        const previousScrollHeight = container?.scrollHeight || 0;

        setIsLoadingMessage(true);

        chatServiceApi.getMessages(token, activeChat.id, offset, logout)
            .then(res => {
                const isInitialLoad = offset === 0;
                let oldHeight = document.getElementById('message-container')?.offsetHeight || 0;

                setMessages(prevMessages => {
                    if (isInitialLoad) {
                        return [...res.data].reverse();
                    } else {
                        return [...res.data.reverse(), ...prevMessages];
                    }
                });

                setOffset(prevOffset => prevOffset + 20);
                if (res.data.length < 20) setHasMoreMessages(false);

                setTimeout(() => {
                    if (container && !isInitialLoad) {
                        let newHeight = document.getElementById('message-container')?.offsetHeight || 0;
                        container.scrollTop = newHeight - oldHeight;
                    }
                }, 50);
            })
            .catch((e) => {
                console.error("Ошибка загрузки сообщений:", e);
            })
            .finally(() => {
                setIsLoadingMessage(false);
            });
    };

    useEffect(() => {
        if (activeChat) {
            setMessages([]);
            setOffset(0);
            setHasMoreMessages(true);
        }
    }, [activeChat]);

    useEffect(() => {
        if (activeChat && offset === 0 && hasMoreMessages) {
            loadMessages();
        }
    }, [offset, activeChat, hasMoreMessages]);

    useEffect(() => {
        const handleScroll = () => {
            const container = messagesContainerRef.current;
            if (container?.scrollTop <= 50 && !isLoadingMessage && hasMoreMessages) {
                loadMessages();
            }
        };

        const container = messagesContainerRef.current;
        container?.addEventListener("scroll", handleScroll);
        return () => {
            container?.removeEventListener("scroll", handleScroll);
        };
    }, [isLoadingMessage, hasMoreMessages]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container && offset === 20) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages, offset]);

    function formatChatDate(dateString) {
        const date = parseISO(dateString);
        if (isToday(date)) return "Сегодня";
        if (isYesterday(date)) return "Вчера";
        if (isThisYear(date)) return format(date, "d MMM", { locale: ru });
        return format(date, "d MMM yyyy", { locale: ru });
    }

    useEffect(() => {
        const ws = new WebSocket("wss://api.dapomogu.ru/ws/");

        ws.onopen = () => {
            console.log("✅ Соединение установлено");
            const initMessage = {
                action: "SetUser",
                token,
                room_id: activeChat?.id,
            };
            ws.send(JSON.stringify(initMessage));
        };

        ws.onerror = (error) => console.log("❌ Ошибка WebSocket:", error);
        ws.onclose = () => console.log("🔴 Соединение закрыто");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "chat") {
                try {
                    const parsedMessages = typeof data.data === "string" ? JSON.parse(data.data) : data.data;
                    isNewMessageRef.current = true;
                    setMessages(prev => Array.isArray(parsedMessages.rows)
                        ? [...prev, ...parsedMessages.rows.reverse()]
                        : [...prev, parsedMessages.rows]);
                } catch (error) {
                    console.error("Ошибка WebSocket:", error);
                }
            }
        };

        setSocket(ws);
        return () => ws.close();
    }, [token, activeChat]);

    const sendMessage = () => {
        if (socket?.readyState === WebSocket.OPEN) {
            const msg = {
                action: "CreateMessage",
                data: message,
                user_id: Number(id),
                token,
                room_id: activeChat?.id,
            };
            isNewMessageRef.current = true;
            socket.send(JSON.stringify(msg));
        } else {
            console.log("⚠️ WebSocket не подключен");
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <RoleHeader />
            <div className="flex flex-1 bg-neutral-50 p-2 sm:p-4 gap-2 sm:gap-4 relative">
                {/* Мобильное модальное окно */}
                <Dialog open={isApplicationsOpen} onClose={() => setIsApplicationsOpen(false)} className="sm:hidden z-50">
                    <div className="fixed inset-0 bg-black/50" />
                    <Dialog.Panel className="fixed top-0 left-0 bottom-0 w-[80%] max-w-xs bg-white p-4 overflow-y-auto shadow-lg">
                        <Dialog.Title className="text-base font-semibold mb-4">Сообщения</Dialog.Title>
                        <button
                            className="absolute top-3 right-4 text-xl text-gray-400"
                            onClick={() => setIsApplicationsOpen(false)}
                        >
                            &times;
                        </button>
                        {chats.length === 0 && !isLoading && <p>Нет активных чатов</p>}
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => {
                                    if (!isLoadingMessage){
                                        setActiveChat(chat);
                                        setIsApplicationsOpen(false);
                                    }
                                }}
                                className={`cursor-pointer rounded-lg border p-2 mb-2 hover:bg-neutral-100 ${
                                    activeChat?.id === chat.id ? "bg-neutral-200" : ""
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={chat.avatar}
                                        alt="Аватар"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium truncate">
                                            {chat.name + " " + chat.patronymic}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            {formatChatDate(chat.updated_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Dialog.Panel>
                </Dialog>

                <div className="hidden sm:block sm:w-1/3 md:w-[30%] lg:w-1/4 rounded-lg border bg-white p-4 overflow-auto">
                    <h2 className="text-base font-semibold mb-3">Сообщения</h2>
                    {chats.length === 0 && !isLoading && <p>Нет активных чатов</p>}
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => {if (!isLoadingMessage) setActiveChat(chat)}}
                            className={`cursor-pointer rounded-lg border p-3 mb-2 hover:bg-neutral-100 ${
                                activeChat?.id === chat.id ? "bg-neutral-200" : ""
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    className="h-9 w-9 rounded-full"
                                    src={chat.avatar}
                                    alt="Аватар"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium truncate">
                                        {chat.name + " " + chat.patronymic}
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        {formatChatDate(chat.updated_at)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col">
                    {activeChat ? (
                        <>
                            <Header onMenuClick={() => setIsApplicationsOpen(true)} chat={activeChat} />
                            <div
                                ref={messagesContainerRef}
                                className="flex-1 overflow-y-auto px-2 sm:px-4"
                                style={{ maxHeight: 'calc(100vh - 240px)' }}
                            >
                                <ChatContainer messages={messages} id={id} />
                            </div>
                            <Footer
                                sendMessage={sendMessage}
                                setMessage={setMessage}
                                message={message}
                            />
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-sm text-neutral-500">
                            Выберите чат, чтобы начать общение
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;
