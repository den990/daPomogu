import { useState } from "react";
import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function RegistrationForm() {

    const [formData, setFormData] = useState({
        surname: "",
        name: "",
        patronymic: "",
        email: "",
        phone: "",
        date_of_birthday: "",
        registration_address: "",
        password: "",
        password_confirmation: "",
        terms: false,
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!formData.terms) {
            setErrorMessage("Вы должны согласиться с условиями использования.");
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setErrorMessage("Пароли не совпадают.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    phone: formData.phone,
                    name: formData.name,
                    surname: formData.surname,
                    patronymic: formData.patronymic,
                    date_of_birthday: formData.date_of_birthday,
                    registration_address: formData.registration_address,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Регистрация прошла успешно!");
                setFormData({
                    surname: "",
                    name: "",
                    patronymic: "",
                    email: "",
                    phone: "",
                    date_of_birthday: "",
                    registration_address: "",
                    password: "",
                    password_confirmation: "",
                    terms: false,
                });
            } else {
                setErrorMessage(data.message || "Ошибка регистрации");
            }
        } catch (error) {
            setErrorMessage("Ошибка сети. Попробуйте позже.");
        }
    };

    return (
        <div id="registration-form" className="w-full lg:w-1/2 px-6 lg:px-12 py-12">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Регистрация волонтера</h2>
                    <p className="text-gray-600 mt-2">Создайте аккаунт, чтобы начать помогать</p>
                </div>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="surname">Фамилия</label>
                            <input type="text" id="surname" value={formData.surname} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Имя</label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="patronymic">Отчество</label>
                            <input type="text" id="patronymic" value={formData.patronymic} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Телефон</label>
                            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="date_of_birthday">Дата рождения</label>
                            <input type="date" id="date_of_birthday" value={formData.date_of_birthday} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="registration_address">Адрес регистрации</label>
                            <textarea id="registration_address" value={formData.registration_address} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Пароль</label>
                            <input type="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">Подтверждение пароля</label>
                            <input type="password" id="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="terms" checked={formData.terms} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" />
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
                    <Link to={ROUTES.LOGIN} className="font-medium text-red-600 hover:text-red-500 cursor-pointer" style={{ paddingLeft: 4 }}>Войти</Link>
                </p>
            </div>
        </div>
    );
}

export default RegistrationForm;