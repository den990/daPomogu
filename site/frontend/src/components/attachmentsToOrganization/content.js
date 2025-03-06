function content() {
    return (
        <main id="main-content" className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-12 gap-6">
                <div id="applications-list" className="col-span-4 rounded-lg border bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg">Заявки</h2>
                        <div className="flex gap-2">
                            <button className="rounded-md bg-neutral-100 px-3 py-1 text-sm">Новые</button>
                            <button className="rounded-md px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-100">В процессе</button>
                            <button className="rounded-md px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-100">Завершенные</button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50">
                            <div className="flex items-center gap-3">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=1" className="h-10 w-10 rounded-full" alt="user-photo" />
                                <div>
                                    <p>Анна Смирнова</p>
                                    <p className="text-sm text-neutral-600">20.02.2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer rounded-lg border bg-neutral-50 p-3">
                            <div className="flex items-center gap-3">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2" className="h-10 w-10 rounded-full" alt="user-photo" />
                                <div>
                                    <p>Иван Петров</p>
                                    <p className="text-sm text-neutral-600">19.02.2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="application-details" className="col-span-8 rounded-lg border bg-white p-6">
                    <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2" className="h-16 w-16 rounded-full" alt="user-photo" />
                            <div>
                                <h2 className="text-xl">Иван Петров</h2>
                                <p className="text-neutral-600">Новая заявка</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="rounded-lg border bg-red-600 px-4 py-2 text-white hover:bg-red-800">Принять</button>
                            <button className="rounded-lg border px-4 py-2 text-neutral-700 hover:bg-neutral-50">Отклонить</button>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3">Контактная информация</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-neutral-600">Телефон</p>
                                    <p>+7 (999) 123-45-67</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Email</p>
                                    <p>ivan.petrov@email.com</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Город</p>
                                    <p>Москва</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Район</p>
                                    <p>Центральный</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3">Навыки и компетенции</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <p>Организация мероприятий</p>
                                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm">Продвинутый</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Социальная работа</p>
                                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm">Начальный</span>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3">Опыт волонтерской деятельности</h3>
                            <div className="space-y-4">
                                <div>
                                    <p>Помощь пожилым людям</p>
                                    <p className="text-sm text-neutral-600">120 часов</p>
                                </div>
                                <div>
                                    <p>Организация городского фестиваля</p>
                                    <p className="text-sm text-neutral-600">80 часов</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default content;