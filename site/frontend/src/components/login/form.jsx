import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import { authorizeUser } from "../../utils/auth";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { AuthContext } from "../../context/AuthProvider";

function LoginForm() {
    const { values, errors, isValid, handleChange } = useFormWithValidation();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const { email, password } = values;

        authorizeUser(email, password)
            .then((token) => {
                if (token) {
                    login(token);
                    navigate(ROUTES.HOME);
                }
            })
            .catch((err) =>{ 
                // Если сервер возвращает { message: "Текст ошибки" }, используем его
            let errorMessage = err.message || "Неверный email или пароль";

            if (errorMessage === "Invalid email or password")
            {
                errorMessage = "Неверный email или пароль";
            }
            else if (errorMessage === "You are blocked")
            {
                errorMessage = "Вы заблокированы";
            }
            setError(errorMessage);
            
            // Для отладки можно вывести ошибку в консоль
            console.error("Ошибка авторизации:", err);
            });
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1">
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={values?.email || ""}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <div className="mt-1">
                            <input
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={values?.password || ""}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                            />
                            {errors.password && <span className="text-red-600 text-xs">{errors.password}</span>}
                        </div>
                    </div>
                    {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium ${
                                isValid
                                    ? "text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    : "text-gray-400 bg-gray-200"
                            }`}
                            disabled={!isValid}
                        >
                            Войти
                        </button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Нет аккаунта?</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to={ROUTES.REGISTER_VOLUNTEER}
                            className="w-full flex justify-center py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Зарегистрироваться
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
