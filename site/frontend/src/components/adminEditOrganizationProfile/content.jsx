function Content({ isSidebarOpen, toggleSidebar }) {
    return (
        <main
            id="main-content"
            className={`flex-1 transition-all duration-300 min-h-[calc(100vh-64px)] overflow-y-auto
                ${isSidebarOpen ? "md:ml-64" : ""}`}
        >
            <div className="container mx-auto px-3 sm:px-4">
                {/* Mobile menu button */}
                <div className="md:hidden py-3 border-b flex justify-end sticky top-0 bg-white z-10">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                <div className="py-4 sm:py-6">
                    <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                        <div className="md:w-[320px] md:order-1">
                            <div className="rounded-lg border bg-white p-3 sm:p-4">
                                <div className="mb-3 sm:mb-4">
                                    <h2 className="text-base sm:text-lg font-medium">Заявки</h2>
                                </div>
                                <div className="space-y-2 sm:space-y-3 h-[calc(100vh-380px)] sm:h-[400px] overflow-y-auto">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-lg border p-2 sm:p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=${item}`}
                                                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex-shrink-0"
                                                    alt="user-photo"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm sm:text-base truncate">
                                                        Волонтерская организация #{item}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        {item === 1 ? "20.02.2025" : "19.02.2025"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 md:order-2">
                            <div className="rounded-lg border bg-white p-4 sm:p-6">
                                {/* Заголовок с кнопками */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 sm:mb-6">
                                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                                        <img
                                            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=2"
                                            className="h-12 w-12 sm:h-16 sm:w-16 rounded-full flex-shrink-0"
                                            alt="user-photo"
                                        />
                                        <div className="min-w-0">
                                            <h2 className="text-lg sm:text-xl md:truncate">
                                                Волонтерская организация #2
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Кнопки управления */}
                                    <div className="flex flex-col sm:flex-row gap-2 md:ml-4 md:mt-0 mt-2">
                                        <button className="rounded-lg bg-red-600 px-3 py-1.5 sm:px-4 sm:py-2 text-sm text-white hover:bg-red-700 whitespace-nowrap">
                                            Принять
                                        </button>
                                        <button className="rounded-lg border px-3 py-1.5 sm:px-4 sm:py-2 text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                                            Отклонить
                                        </button>
                                    </div>
                                </div>

                                {/* Детали организации */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="rounded-lg border p-3 sm:p-4">
                                        <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
                                            Текущие данные
                                        </h3>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Название организации</p>
                                                <p className="text-sm sm:text-base">Волонтерская организация #2</p>
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Контактный телефон</p>
                                                <p className="text-sm sm:text-base">+7 (999) 123-45-67</p>
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Адрес</p>
                                                <p className="text-sm sm:text-base">ул. Ленина, 123</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border p-3 sm:p-4">
                                        <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">
                                            Предлагаемые изменения
                                        </h3>
                                        <div className="space-y-3 sm:space-y-4">
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Название организации</p>
                                                <p className="text-sm sm:text-base">Волонтерская организация #1</p>
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Контактный телефон</p>
                                                <p className="text-sm sm:text-base">+7 (999) 123-45-67</p>
                                            </div>
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Адрес</p>
                                                <p className="text-sm sm:text-base">ул. Ленина, 123</p>
                                            </div>
                                        </div>
                                    </div>
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
