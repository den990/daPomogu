import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import useAuth from "../../hooks/useAuth";

function LoginForm() {
    const { login, error } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await login(email, password);
        if (token) {
            setMessage("Логин успешен!");
            setTimeout(() => {
                navigate(ROUTES.ACCOUNT_VOLUNTEER);
            }, 2000);
        } else {
            setMessage(error || "Ошибка аутентификации");
        }
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor ="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" 
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor ="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <div className="mt-1">
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                autoComplete="current-password" 
                                required=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" 
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                            <label htmlFor ="remember-me" className="ml-2 block text-sm text-gray-900">
                                Запомнить меня
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="/#" className="font-medium text-red-600 hover:text-red-500">
                                Забыли пароль?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Войти
                        </button>
                    </div>
                </form>
                {message && <p className="mt-4 text-center text-sm">{message}</p>}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Нет аккаунта?
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link to={ROUTES.REGISTER_VOLUNTEER} className="w-full flex justify-center py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Зарегистрироваться
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;