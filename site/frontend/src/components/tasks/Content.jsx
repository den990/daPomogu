function Content() {
    return (
        <div id="tasks-section" className="md:col-span-2 mx-2 md:mx-0 md:p-8">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold">Мои задания</h3>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-red-600 bg-red-50 rounded-lg hover:bg-red-100 min-w-max">
                            Текущие
                        </button>
                        <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 min-w-max">
                            Завершенные
                        </button>
                    </div>
                </div>

                <div id="current-tasks" className="space-y-6">
                    <div className="border rounded-lg p-3 md:p-4">
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-base md:text-lg">
                                    Помощь в организации благотворительного концерта
                                </h4>
                                <p className="text-gray-600 text-xs md:text-sm mt-1">
                                    15 марта 2025 • Центральный парк
                                </p>
                                <div className="mt-2 md:mt-3 flex items-center">
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                                        В процессе
                                    </span>
                                </div>
                            </div>
                            <button className="text-red-600 hover:text-red-700 shrink-0 ml-2">
                                <i className="text-lg md:text-xl"> </i>
                            </button>
                        </div>
                    </div>

                    <div className="border rounded-lg p-3 md:p-4">
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-base md:text-lg">Раздача еды бездомным</h4>
                                <p className="text-gray-600 text-xs md:text-sm mt-1">
                                    20 марта 2025 • Благотворительный фонд "Надежда"
                                </p>
                                <div className="mt-2 md:mt-3 flex items-center">
                                    <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">
                                        Ожидает начала
                                    </span>
                                </div>
                            </div>
                            <button className="text-red-600 hover:text-red-700 shrink-0 ml-2">
                                <i className="text-lg md:text-xl"> </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
