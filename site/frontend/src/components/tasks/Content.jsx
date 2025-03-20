function Content() {
    return (
        <div id="tasks-section" className="md:col-span-2">
            <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Мои задания</h3>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100">Текущие</button>
                        <button className="px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">Завершенные</button>
                    </div>
                </div>
                <div id="current-tasks" className="space-y-4">
                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">Помощь в организации благотворительного концерта</h4>
                                <p className="text-gray-600 text-sm mt-1">15 марта 2025 • Центральный парк</p>
                                <div className="mt-2 flex items-center">
                                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">В процессе</span>
                                </div>
                            </div>
                            <button className="text-red-600 hover:text-red-700">
                                <i className="text-xl" data-fa-i2svg=""><svg className="svg-inline--fa fa-circle-xmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"></path></svg></i>
                            </button>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">Раздача еды бездомным</h4>
                                <p className="text-gray-600 text-sm mt-1">20 марта 2025 • Благотворительный фонд "Надежда"</p>
                                <div className="mt-2 flex items-center">
                                    <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">Ожидает начала</span>
                                </div>
                            </div>
                            <button className="text-red-600 hover:text-red-700">
                                <i className="text-xl" data-fa-i2svg=""><svg className="svg-inline--fa fa-circle-xmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"></path></svg></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;