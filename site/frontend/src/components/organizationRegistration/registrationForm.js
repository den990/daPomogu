import { Link, useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import useRegistrationOrganization from "../../hooks/useRegistrationOrganization";
import { useState } from "react";

function RegistrationForm() {
    const { register, error } = useRegistrationOrganization();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        inn: "",
        name: "",
        legal_address: "",
        actual_address: "",
        full_name_owner: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        const result = await register(formData);
        if(result) {
            setSuccessMessage("Регистрация прошла успешно!");
            setTimeout(() => {
                navigate(ROUTES.HOME);
            }, 2000);
        } else {
            setErrorMessage(error || "Ошибка регистрации!");
        }
    };
    
    return (
        <div id="auth-right-panel" className="w-full lg:w-1/2 px-6 py-12 lg:px-12">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Регистрация организации</h2>
                    <p className="text-gray-600 mt-2">Заполните форму для создания аккаунта</p>
                </div>
                <form id="registration-form" className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Юридическое название</label>
                            <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Телефон</label>
                            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ИНН</label>
                            <input type="text" id="inn" value={formData.inn} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Юридический адрес</label>
                            <input type="text" id="legal_address" value={formData.legal_address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Фактический адрес</label>
                            <input type="text" id="actual_address" value={formData.actual_address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Руководитель организации</label>
                            <input type="text" id="full_name_owner" value={formData.full_name_owner} onChange={handleChange} placeholder="ФИО" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Отправить заявку
                        </button>
                    </div>
                </form>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
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

export default RegistrationForm;