
function registrationForm() {
    return (
        <div id="registration-form" className="w-full lg:w-1/2 px-6 lg:px-12 py-12">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Регистрация волонтера</h2>
                    <p className="text-gray-600 mt-2">Создайте аккаунт, чтобы начать помогать</p>
                </div>
                <form className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="lastname">Фамилия</label>
                            <input type="text" id="lastname" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="firstname">Имя</label>
                            <input type="text" id="firstname" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="middlename">Отчество</label>
                            <input type="text" id="middlename" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                            <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Телефон</label>
                            <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="birthdate">Дата рождения</label>
                            <input type="date" id="birthdate" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Адрес регистрации</label>
                            <textarea id="address" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Пароль</label>
                            <input type="password" id="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">Подтверждение пароля</label>
                            <input type="password" id="password_confirmation" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            Я согласен с условиями использования и политикой конфиденциальности
                        </label>
                    </div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Зарегистрироваться
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Уже есть аккаунт? 
                    <span className="font-medium text-red-600 hover:text-red-500 cursor-pointer" style={{ paddingLeft: 4 }}>Войти</span>
                </p>
            </div>
        </div>
    );
}

export default registrationForm;