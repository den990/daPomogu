function Info({ task }) {
    return (
        <div className="col-span-2">
            <div id="task-header" className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-3xl mb-4">{task.name}</h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=456"
                            className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                            alt="organization"
                        />
                        <span className="text-neutral-900 hover:underline cursor-pointer text-sm md:text-base">
                            {task.organization_name}
                        </span>
                    </div>
                    <span className="text-neutral-500 hidden md:block">•</span>
                    <span className="text-neutral-600 text-sm md:text-base">
                        {new Date(task.task_date).toLocaleString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>

            <div id="task-description" className="prose max-w-none mb-6 md:mb-8">
                <p className="text-neutral-700 text-sm md:text-base">{task.description}</p>
            </div>

            <div id="task-location" className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl mb-4">Местоположение</h2>
                <div className="w-full h-[200px] md:h-[300px] bg-neutral-200 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-600">Карта местоположения</span>
                </div>
            </div>

            <div id="task-comments" className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl mb-4">Комментарии</h2>
                <div className="space-y-4 mb-4">
                    <div className="bg-white p-3 md:p-4 rounded-lg border">
                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=789"
                                className="w-6 md:w-8 h-6 md:h-8 rounded-full"
                                alt="person"
                            />
                            <div>
                                <div className="text-sm md:text-base">Анна Петрова</div>
                                <div className="text-xs md:text-sm text-neutral-500">10 марта 2025</div>
                            </div>
                        </div>
                        <p className="text-neutral-700 text-sm md:text-base">
                            Участвовала в подобном мероприятии в прошлом году. Было очень здорово!
                        </p>
                    </div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg border">
                    <textarea
                        className="w-full border rounded-lg p-2 md:p-3 mb-3 text-sm md:text-base"
                        placeholder="Написать комментарий..."
                    ></textarea>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm md:text-base">
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Info;
