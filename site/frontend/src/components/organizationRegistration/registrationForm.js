import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function registrationForm() {
    return (
        <div id="auth-right-panel" className="w-full lg:w-1/2 px-6 py-12 lg:px-12">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Регистрация организации</h2>
                    <p className="text-gray-600 mt-2">Заполните форму для создания аккаунта</p>
                </div>
                <form id="registration-form" className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Юридическое название</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Телефон</label>
                            <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ИНН</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Юридический адрес</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Фактический адрес</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Руководитель организации</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Отправить заявку
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Уже есть аккаунт? 
                        <Link to={ROUTES.LOGIN} className="font-medium text-red-600 hover:text-red-500 cursor-pointer" style={{ paddingLeft: 4 }}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default registrationForm;