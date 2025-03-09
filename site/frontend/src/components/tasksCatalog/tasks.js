function tasks() {
    return (
        <section id="tasks-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div id="task-1" className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Экология</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Уборка парка "Сокольники"</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для уборки территории парка. Инвентарь предоставляется.</p>
                    <div className="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-6 h-6 rounded-full mr-2" alt="organization" />
                        <span className="text-gray-600">Экологическое движение</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                            <img style={{width: 12, height: 14}} src={require("../../images/calendar_grey.svg").default} alt="calendar" />
                            <span style={{paddingLeft: 10}}>15 мая 2025</span>
                        </div>
                        <div className="flex items-center">
                            <img style={{width: 17, height: 14}} src={require("../../images/people_grey.svg").default} alt="people" />
                            <span style={{paddingLeft: 10}}>12/20</span>
                        </div>
                    </div>
                    <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Принять участие</button>
                </div>
            </div>
            <div id="task-2" className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                    <div className="flex items-start mb-4 space-x-3">
                        <div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Образование</span>
                        </div>
                        <div>
                            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">Задание организации</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Онлайн-уроки английского</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для проведения онлайн-уроков английского языка для детей из детских домов.</p>
                    <div className="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-6 h-6 rounded-full mr-2" alt="organization" />
                        <span className="text-gray-600">Образовательный центр</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        
                    <div className="flex items-center">
                            <img style={{width: 12, height: 14}} src={require("../../images/calendar_grey.svg").default} alt="calendar" />
                            <span style={{paddingLeft: 10}}>20 мая 2025</span>
                        </div>
                        <div className="flex items-center">
                            <img style={{width: 17, height: 14}} src={require("../../images/people_grey.svg").default} alt="people" />
                            <span style={{paddingLeft: 10}}>5/20</span>
                        </div>
                    </div>
                    <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Принять участие</button>
                </div>
            </div>
            <div id="task-3" className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Помощь пожилым</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Доставка продуктов</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для доставки продуктовых наборов пожилым людям.</p>
                    <div className="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-6 h-6 rounded-full mr-2" alt="organization" />
                        <span className="text-gray-600">Забота о старших</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                            <img style={{width: 12, height: 14}} src={require("../../images/calendar_grey.svg").default} alt="calendar" />
                            <span style={{paddingLeft: 10}}>25 мая 2025</span>
                        </div>
                        <div className="flex items-center">
                            <img style={{width: 17, height: 14}} src={require("../../images/people_grey.svg").default} alt="people" />
                            <span style={{paddingLeft: 10}}>8/15</span>
                        </div>
                    </div>
                    <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Принять участие</button>
                </div>
            </div>
        </section>
    );
}

export default tasks;