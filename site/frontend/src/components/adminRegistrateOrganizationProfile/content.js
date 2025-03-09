function content() {
    return (
        <main id="main-content" className="container ml-64 px-4 py-6">
            <div className="grid grid-cols-12 gap-6">
                <div id="applications-list" className="col-span-4 rounded-lg border bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg">Заявки</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50">
                            <div className="flex items-center gap-3">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=1" className="h-10 w-10 rounded-full" alt="user-photo" />
                                <div>
                                    <p>Волонтерская организация #1</p>
                                    <p className="text-sm text-neutral-600">20.02.2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="cursor-pointer rounded-lg border bg-neutral-50 p-3">
                            <div className="flex items-center gap-3">
                                <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2" className="h-10 w-10 rounded-full" alt="user-photo" />
                                <div>
                                    <p>Волонтерская организация #2</p>
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
                                <h2 className="text-xl">Волонтерская организация #2</h2>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="rounded-lg border bg-red-600 px-4 py-2 text-white hover:bg-red-800">Принять</button>
                            <button className="rounded-lg border px-4 py-2 text-neutral-700 hover:bg-neutral-50">Отклонить</button>
                        </div>
                    </div>
                    <div className="full-w">
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3">Данные организации</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-sm text-neutral-600">Юридическое название</p>
                                    <p>Юридическое название</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Email</p>
                                    <p>ivan.petrov@email.com</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Телефон</p>
                                    <p>+7 (999) 123-45-67</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">ИНН</p>
                                    <p>18231273183712371</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Юридический адрес</p>
                                    
                                    <p>Юридический адрес</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Фактический адрес</p>
                                    <p>Фактический адрес</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Руководитель организации</p>
                                    <p>Руководитель организации</p>
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