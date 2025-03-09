function dashboard() {
    return (
        <div className="ml-64 p-8 h-full">
            <div id="header" className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Главная страница</h2>
                </div>
            </div>
            <div id="stats-grid" className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 25, height: 24 }} src={require("../../images/people_red.svg").default} alt="people" />
                        </div>
                        <span className="text-green-500 flex items-center gap-1">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/up-arrow_green.svg").default} alt="up-arrow"/>
                            12%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Количество пользователей</h3>
                    <p className="text-2xl font-bold text-gray-800">2,453</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 20, height: 24 }} src={require("../../images/stats_red.svg").default} alt="stats" />
                        </div>
                        <span className="text-green-500 flex items-center gap-1">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/up-arrow_green.svg").default} alt="up-arrow"/>
                            8%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Количество активных заданий</h3>
                    <p className="text-2xl font-bold text-gray-800">186</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 20, height: 24 }} src={require("../../images/ban_red.svg").default} alt="ban" />
                        </div>
                        <span className="text-red-500 flex items-center gap-1">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/down-arrow_red.svg").default} alt="up-arrow"/>
                            3%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Количество заблокированных пользователей</h3>
                    <p className="text-2xl font-bold text-gray-800">23</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 20, height: 24 }} src={require("../../images/circle-check_red.svg").default} alt="circle-check" />
                        </div>
                        <span className="text-green-500 flex items-center gap-1">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/up-arrow_green.svg").default} alt="up-arrow"/>
                            15%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Выполненных заданий</h3>
                    <p className="text-2xl font-bold text-gray-800">1,429</p>
                </div>
            </div>
        </div>
    );
}

export default dashboard;