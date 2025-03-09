function sidebar() {
    return (
        <div id="sidebar" className="fixed h-full w-64 bg-white border-r border-gray-200 pt-6">
            <div className="px-6 mb-8">
                <h1 className="text-xl font-bold text-red-600 flex items-center gap-2">
                    <img style={{ width: 20, height: 20 }} src={require("../../images/heart_red.svg").default} alt="bell" />
                    ДаПомогу-Админ
                </h1>
            </div>
            <nav className="px-4">
                <a href="/#" className="flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50 rounded-lg mb-1">
                    <img style={{width: 16, height: 16}} src={require("../../images/graphic_red.svg").default} alt="graphic" />
                    <span>Главная</span>
                </a>
                <a href="/#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-1">
                    <img style={{width: 20, height: 16}} src={require("../../images/people_grey.svg").default} alt="people" />
                    <span>Пользователи</span>
                </a>
                <a href="/#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg mb-1">
                    <img style={{width: 16, height: 16}} src={require("../../images/stats_grey.svg").default} alt="stats" />
                    <span>Задания</span>
                </a>
                <a href="/#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <img style={{width: 18, height: 16}} src={require("../../images/application_grey.svg").default} alt="application" />
                    <span>Заявки</span>
                </a>
            </nav>
        </div>
    );
}

export default sidebar;