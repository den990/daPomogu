function HeaderVolunteer() {
    return (
        <header id="header-volunteer" class="bg-white shadow-sm py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <img style={{ width: 24, height: 24 }} src={ require("../images/heart_red.svg").default } alt="icon" />
                        <span class="text-xl font-bold text-red-600">VolunteerHub</span>
                    </div>
                    <nav class="hidden md:flex space-x-6">
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Мои проекты</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Найти задачи</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Календарь</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Достижения</span>
                    </nav>
                    <div class="flex items-center space-x-4">
                        <button class="relative">
                            <img style={{ width: 18, height: 20 }} src={ require("../images/bell_grey.svg").default } alt="icon" />
                            <span class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                        </button>
                        <div class="flex items-center space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" class="w-8 h-8 rounded-full" alt="Profile" />
                            <span class="text-gray-600">Анна К.</span>
                            <img style={{width: 14, height: 14}} src={ require("../images/arrow-down_grey.svg").default } alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderVolunteer;