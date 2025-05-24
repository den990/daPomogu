import { format, parseISO, isToday, isYesterday, isThisYear } from "date-fns";
import { ru } from "date-fns/locale";

function getDateKey(dateString) {
    return format(parseISO(dateString), "yyyy-MM-dd");
}

// Форматируем заголовок группы
function formatGroupTitle(dateKey) {
    const date = parseISO(dateKey);
    if (isToday(date)) return "Сегодня";
    if (isYesterday(date)) return "Вчера";
    if (isThisYear(date)) return format(date, "d MMM", { locale: ru });
    return format(date, "d MMM yyyy", { locale: ru });
}

// Группируем в исходном порядке (НЕ сортируем)
function groupMessagesPreservingOrder(messages) {
    const result = [];
    let currentGroup = null;

    for (const msg of messages) {
        const dateKey = getDateKey(msg.created_at);

        if (!currentGroup || currentGroup.dateKey !== dateKey) {
            currentGroup = {
                dateKey,
                messages: [],
            };
            result.push(currentGroup);
        }

        currentGroup.messages.push(msg);
    }

    return result;
}

function formatMessageDate(dateString) {
    const date = parseISO(dateString);

    if (isToday(date)) {
        return format(date, "HH:mm", { locale: ru });
    }

    if (isYesterday(date)) {
        return "Вчера, " + format(date, "HH:mm", { locale: ru });
    }

    if (isThisYear(date)) {
        return format(date, "d MMM, HH:mm", { locale: ru });
    }

    return format(date, "d MMM yyyy, HH:mm", { locale: ru });
}

function ChatContainer({ messages, id }) {
    const groupedMessages = groupMessagesPreservingOrder(messages);

    return (
        <main className="pt-14 sm:pt-16 md:pt-20 pb-14 sm:pb-16 md:pb-20 h-full">
            <div className="px-2 sm:px-3 md:px-4 h-full">
                <div className="space-y-3 sm:space-y-4 md:space-y-5 h-full">
                    <div className="flex flex-col gap-2 sm:gap-3 md:gap-4" id="message-container">
                        {groupedMessages.map((group, groupIdx) => (
                            <div key={groupIdx} className="flex flex-col-reverse gap-2">
                                {group.messages.slice().reverse().map((msg, idx) => (
                                    <div key={idx} className={`flex ${id === msg.user.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`
                                            ${id === msg.user.id ? 'bg-red-600 text-white rounded-tr-none' : 'bg-neutral-100 text-black rounded-tl-none'}
                                            rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 max-w-[80%] sm:max-w-[75%] md:max-w-[70%]
                                        `}>
                                            <div className="flex items-center">
                                                <img className="h-7 w-7 sm:h-8 sm:w-8 rounded-full flex-shrink-0" src={msg.user.avatar} />
                                                <p className="ms-1 text-xs sm:text-sm md:text-base">{msg.user.name}</p>
                                            </div>
                                            <p className="ms-1 text-xs sm:text-sm md:text-base">{msg.message}</p>
                                            <div className={`mt-0.5 ${msg.from === 'user' ? 'flex justify-end gap-1 items-center' : ''}`}>
                                                <span className={`text-[9px] sm:text-[10px] md:text-xs ${msg.from === 'user' ? 'text-red-200' : 'text-neutral-500'}`}>
                                                    {format(parseISO(msg.created_at), "HH:mm")}
                                                </span>
                                                {msg.from === 'user' && (
                                                    <img
                                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                                        src={require("../../images/double-check_white.svg").default}
                                                        alt="status"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Заголовок даты */}
                                <div className="text-center text-[10px] sm:text-xs md:text-sm text-neutral-500 mt-2">
                                    {formatGroupTitle(group.dateKey)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
export default ChatContainer;
