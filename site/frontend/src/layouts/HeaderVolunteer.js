function HeaderVolunteer() {
    return (
        <header id="header-volunteer" class="bg-white shadow-sm py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <img style={{ width: 24, height: 24 }} src={ require("../images/heart_red.svg").default } alt="icon" />
                        <span class="text-xl font-bold text-red-600">ДаПомогу</span>
                    </div>
                    <nav class="hidden md:flex space-x-6">
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Задания</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">Мои задания</span>
                        <span class="text-gray-600 hover:text-red-600 cursor-pointer">О нас</span>
                    </nav>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" class="w-8 h-8 rounded-full" alt="Profile" />
                            <span class="text-gray-600">Волонтер</span>
                            <img style={{width: 14, height: 14}} src={ require("../images/arrow-down_grey.svg").default } alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderVolunteer;