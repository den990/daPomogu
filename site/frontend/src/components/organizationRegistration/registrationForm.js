function registrationForm() {
    return (
        <div id="auth-right-panel" class="w-full lg:w-1/2 px-6 py-12 lg:px-12">
            <div class="max-w-md mx-auto">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold text-gray-900">Регистрация организации</h2>
                    <p class="text-gray-600 mt-2">Заполните форму для создания аккаунта</p>
                </div>
                <form id="registration-form" class="space-y-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Юридическое название</label>
                            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Телефон</label>
                            <input type="tel" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">ИНН</label>
                            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Юридический адрес</label>
                            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Фактический адрес</label>
                            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Руководитель организации</label>
                            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Отправить заявку
                        </button>
                    </div>
                </form>
                <div class="mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Уже есть аккаунт? 
                        <span class="font-medium text-red-600 hover:text-red-500 cursor-pointer">Войти</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default registrationForm;