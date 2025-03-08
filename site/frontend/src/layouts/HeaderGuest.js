function HeaderGuest() {
    return (
        <header id="header-guest" className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img style={{ width: 24, height: 24 }} src={ require("../images/heart_red.svg").default } alt="icon" />
                        <span className="text-xl font-bold text-red-600">VolunteerHub</span>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">О нас</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Проекты</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Организации</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Контакты</span>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button className="px-4 py-2 text-red-600 hover:text-red-700">Войти</button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderGuest;