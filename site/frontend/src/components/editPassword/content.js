import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function content() {
    return (
        <main class="container mx-auto px-4 py-8">
            <div class="max-w-3xl mx-auto">
                <h1 class="text-2xl font-bold text-gray-900 mb-8">Смена пароля</h1>
                <div id="profile-form" class="bg-white rounded-lg shadow-sm p-6">
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Старый пароль</label>
                            <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Новый пароль</label>
                            <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Подтверждение пароля</label>
                            <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
                        </div>
                        <div className="pt-4">
                            <Link to={ROUTES.ACCOUNT_VOLUNTEER} 
                                className="block w-full text-center bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition font-medium">
                                Сохранить изменения
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default content;