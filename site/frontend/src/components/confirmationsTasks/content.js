function Content() {
    return (
        <main className="container mx-auto px-4 py-4 md:py-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                {/* Список заявок */}
                <div className="md:col-span-4 order-2 md:order-1">
                    <div className="rounded-lg border bg-white p-3 md:p-4">
                        <div className="mb-3 md:mb-4">
                            <h2 className="text-base md:text-lg">Заявки</h2>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            {[1, 2].map((item) => (
                                <div key={item} className="rounded-lg border p-2 md:p-3 hover:bg-neutral-50">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <img 
                                            src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=${item}`} 
                                            className="h-8 w-8 md:h-10 md:w-10 rounded-full" 
                                            alt="Фото пользователя" 
                                        />
                                        <div>
                                            <p className="text-sm md:text-base">
                                                {item === 1 ? 'Анна Смирнова' : 'Иван Петров'}
                                            </p>
                                            <p className="text-xs md:text-sm text-neutral-600">
                                                {item === 1 ? '20.02.2025' : '19.02.2025'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Детали заявки */}
                <div className="md:col-span-8 order-1 md:order-2">
                    <div className="rounded-lg border bg-white p-4 md:p-6">
                        <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <img 
                                    src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=2" 
                                    className="h-12 w-12 md:h-16 md:w-16 rounded-full" 
                                    alt="Фото пользователя" 
                                />
                                <h2 className="text-lg md:text-xl">Иван Петров</h2>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                                <button className="w-full md:w-auto rounded-lg border bg-red-600 px-3 py-1.5 md:px-4 md:py-2 text-white text-sm md:text-base hover:bg-red-800">
                                    Принять
                                </button>
                                <button className="w-full md:w-auto rounded-lg border px-3 py-1.5 md:px-4 md:py-2 text-neutral-700 text-sm md:text-base hover:bg-neutral-50">
                                    Отклонить
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="rounded-lg border p-3 md:p-4">
                                <h3 className="text-base md:text-lg mb-2 md:mb-3">Фотоотчет</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div key={item} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                            <p className="text-neutral-500 text-sm md:text-base">
                                                Картинка {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Content;