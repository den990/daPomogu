function tasks() {
    return (
        <section id="tasks-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div id="task-1" className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Экология</span>
                        </div>
                        <i className="text-gray-400 hover:text-red-600 cursor-pointer" data-fa-i2svg=""><svg className="svg-inline--fa fa-bookmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Уборка парка "Сокольники"</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для уборки территории парка. Инвентарь предоставляется.</p>
                    <div className="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-6 h-6 rounded-full mr-2" />
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
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Образование</span>
                        </div>
                        <i className="text-gray-400 hover:text-red-600 cursor-pointer" data-fa-i2svg=""><svg className="svg-inline--fa fa-bookmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Онлайн-уроки английского</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для проведения онлайн-уроков английского языка для детей из детских домов.</p>
                    <div className="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-6 h-6 rounded-full mr-2" />
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
                        <i className="text-gray-400 hover:text-red-600 cursor-pointer" data-fa-i2svg=""><svg className="svg-inline--fa fa-bookmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Доставка продуктов</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для доставки продуктовых наборов пожилым людям.</p>
                    <div className="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-6 h-6 rounded-full mr-2" />
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