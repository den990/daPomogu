function Content() {
    return (
        <main id="main-content" className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                {/* Список заявок */}
                <div id="applications-list" className="md:col-span-4 rounded-lg border bg-white p-3 md:p-4">
                    <div className="mb-3 md:mb-4 flex items-center justify-between">
                        <h2 className="text-lg">Заявки</h2>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <div className="cursor-pointer rounded-lg border p-2 md:p-3 hover:bg-neutral-50">
                            <div className="flex items-center gap-2 md:gap-3">
                                <img 
                                    src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=1" 
                                    className="h-8 w-8 md:h-10 md:w-10 rounded-full" 
                                    alt="user-photo" 
                                />
                                <div>
                                    <p className="text-sm md:text-base">Анна Смирнова</p>
                                    <p className="text-xs md:text-sm text-neutral-600">20.02.2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer rounded-lg border bg-neutral-50 p-2 md:p-3">
                            <div className="flex items-center gap-2 md:gap-3">
                                <img 
                                    src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=2" 
                                    className="h-8 w-8 md:h-10 md:w-10 rounded-full" 
                                    alt="user-photo" 
                                />
                                <div>
                                    <p className="text-sm md:text-base">Иван Петров</p>
                                    <p className="text-xs md:text-sm text-neutral-600">19.02.2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Детали заявки */}
                <div id="application-details" className="md:col-span-8 rounded-lg border bg-white p-4 md:p-6 mt-4 md:mt-0">
                    <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <img 
                                src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=2" 
                                className="h-12 w-12 md:h-16 md:w-16 rounded-full" 
                                alt="user-photo" 
                            />
                            <div>
                                <h2 className="text-lg md:text-xl">Иван Петров</h2>
                                <p className="text-sm md:text-base text-neutral-600">Новая заявка</p>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {/* Контактная информация */}
                        <div className="rounded-lg border p-3 md:p-4">
                            <h3 className="mb-2 md:mb-3 text-md md:text-lg">Контактная информация</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div>
                                    <p className="text-xs md:text-sm text-neutral-600">Телефон</p>
                                    <p className="text-sm md:text-base">+7 (999) 123-45-67</p>
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-neutral-600">Email</p>
                                    <p className="text-sm md:text-base">ivan.petrov@email.com</p>
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-neutral-600">Город</p>
                                    <p className="text-sm md:text-base">Москва</p>
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-neutral-600">Район</p>
                                    <p className="text-sm md:text-base">Центральный</p>
                                </div>
                            </div>
                        </div>

                        {/* Навыки */}
                        <div className="rounded-lg border p-3 md:p-4">
                            <h3 className="mb-2 md:mb-3 text-md md:text-lg">Навыки и компетенции</h3>
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm md:text-base">Организация мероприятий</p>
                                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs md:text-sm">Продвинутый</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm md:text-base">Социальная работа</p>
                                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs md:text-sm">Начальный</span>
                                </div>
                            </div>
                        </div>

                        {/* Опыт */}
                        <div className="rounded-lg border p-3 md:p-4">
                            <h3 className="mb-2 md:mb-3 text-md md:text-lg">Опыт волонтерской деятельности</h3>
                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <p className="text-sm md:text-base">Помощь пожилым людям</p>
                                    <p className="text-xs md:text-sm text-neutral-600">120 часов</p>
                                </div>
                                <div>
                                    <p className="text-sm md:text-base">Организация городского фестиваля</p>
                                    <p className="text-xs md:text-sm text-neutral-600">80 часов</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <button className="rounded-lg border bg-red-600 px-3 py-2 md:px-4 md:py-2 text-white hover:bg-red-800 text-sm md:text-base">
                                Принять
                            </button>
                            <button className="rounded-lg border px-3 py-2 md:px-4 md:py-2 text-neutral-700 hover:bg-neutral-50 text-sm md:text-base">
                                Отклонить
                            </button>
                        </div>    
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Content;