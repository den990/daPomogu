function info() {
    return (
        <div className="col-span-2">
            <div id="task-banner" className="w-full h-[300px] bg-neutral-300 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-white">Фото задания</span>
            </div>
            <div id="task-header" className="mb-8">
                <h1 className="text-3xl mb-4">Помощь в организации благотворительной ярмарки</h1>
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=456" className="w-10 h-10 rounded-full" />
                        <span className="text-neutral-900 hover:underline cursor-pointer">Благотворительный фонд "Надежда"</span>
                    </div>
                    <span className="text-neutral-500">•</span>
                    <span className="text-neutral-600">15 марта 2025</span>
                </div>
            </div>
            <div id="task-description" className="prose max-w-none mb-8">
                <p className="text-neutral-700">Требуются волонтеры для помощи в организации благотворительной ярмарки. Задачи включают установку столов, оформление площадки, помощь продавцам и поддержание порядка во время мероприятия.</p>
            </div>
            <div id="task-location" className="mb-8">
                <h2 className="text-xl mb-4">Местоположение</h2>
                <div className="w-full h-[300px] bg-neutral-200 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-600">Карта местоположения</span>
                </div>
            </div>
            <div id="task-comments" className="mb-8">
                <h2 className="text-xl mb-4">Комментарии</h2>
                <div className="space-y-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-3 mb-2">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=789" className="w-8 h-8 rounded-full" />
                            <div>
                                <div>Анна Петрова</div>
                                <div className="text-sm text-neutral-500">10 марта 2025</div>
                            </div>
                        </div>
                        <p className="text-neutral-700">Участвовала в подобном мероприятии в прошлом году. Было очень здорово!</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                    <textarea className="w-full border rounded-lg p-3 mb-3" placeholder="Написать комментарий..."></textarea>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Отправить</button>
                </div>
            </div>
        </div>
    );
}

export default info;