function HeaderAdmin() {
    return (
        <header id="header-admin" class="bg-white shadow-sm py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <img style={{ width: 24, height: 24 }} src={ require("../images/heart_red.svg").default } alt="icon" />
                        <span class="text-xl font-bold text-red-600">VolunteerHub</span>
                    </div>
                    <nav class="hidden md:flex space-x-6">
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Организации</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Пользователи</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Модерация</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Настройки</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Аналитика</span>
                    </nav>
                    <div class="flex items-center space-x-4">
                        <span class="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Администратор</span>
                        <div class="flex items-center space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" class="w-8 h-8 rounded-full" alt="Admin" />
                            <span class="text-gray-600">Админ</span>
                            <img style={{width: 14, height: 14}} src={ require("../images/arrow-down_grey.svg").default } alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAdmin;