
function registrationForm() {
    return (
        <div id="registration-form" class="w-full lg:w-1/2 px-6 lg:px-12 py-12">
            <div class="max-w-md mx-auto">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Регистрация волонтера</h2>
                    <p class="text-gray-600 mt-2">Создайте аккаунт, чтобы начать помогать</p>
                </div>
                <form class="space-y-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="lastname">Фамилия</label>
                            <input type="text" id="lastname" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="firstname">Имя</label>
                            <input type="text" id="firstname" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="middlename">Отчество</label>
                            <input type="text" id="middlename" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="email">Email</label>
                            <input type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="phone">Телефон</label>
                            <input type="tel" id="phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="birthdate">Дата рождения</label>
                            <input type="date" id="birthdate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="address">Адрес регистрации</label>
                            <textarea id="address" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="password">Пароль</label>
                            <input type="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700" for="password_confirmation">Подтверждение пароля</label>
                            <input type="password" id="password_confirmation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="terms" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <label for="terms" class="ml-2 block text-sm text-gray-700">
                            Я согласен с условиями использования и политикой конфиденциальности
                        </label>
                    </div>
                    <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Зарегистрироваться
                    </button>
                </form>
                <p class="mt-6 text-center text-sm text-gray-600">
                    Уже есть аккаунт? 
                    <span class="font-medium text-red-600 hover:text-red-500 cursor-pointer">Войти</span>
                </p>
            </div>
        </div>
    );
}

export default registrationForm;