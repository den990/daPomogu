function HeaderOrganization() {
    return (
        <header id="header-organization" className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img style={{ width: 24, height: 24 }} src={ require("../images/heart_red.svg").default } alt="icon" />
                        <span className="text-xl font-bold text-red-600">ДаПомогу</span>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Задания</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Мои задания</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">О нас</span>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                            <img style={{width: 14, height: 16}} src={ require("../images/add_white.svg").default } alt="icon" /><span style={{paddingLeft: 10}}>Добавить задание</span>
                        </button>
                        <div className="flex items-center space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-8 h-8 rounded-full" alt="Organization" />
                            <span className="text-gray-600">Организация</span>
                            <img style={{width: 14, height: 14}} src={ require("../images/arrow-down_grey.svg").default } alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderOrganization;