import { Link } from "react-router";
import { registerOrganization } from "../../utils/auth";
import ROUTES from "../../constants/routes";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { useState } from "react";

function RegistrationForm({ setIsPopUpVisible }) {
    const { values, errors, isValid, handleChange } = useFormWithValidation("organization");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { email, phone, inn, legal_name, legal_address, actual_address, full_name_owner } = values;

        try {
            await registerOrganization(email, phone, inn, legal_name, legal_address, actual_address, full_name_owner);
            setIsPopUpVisible(true);
        } catch {
            setError("Произошла ошибка при регистрации. Попробуйте снова");
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
                            <label className="block text-sm font-medium text-gray-700">Юридическое название*</label>
                            <input
                                type="text"
                                name="legal_name"
                                value={values?.legal_name || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        {errors.legal_name && <span className="text-red-600 text-xs">{errors.legal_name}</span>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email*</label>
                            <input
                                type="email"
                                name="email"
                                value={values?.email || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Телефон*</label>
                            <input
                                type="tel"
                                name="phone"
                                value={values?.phone || ""}
                                onChange={handleChange}
                                placeholder="+7 (___) ___-__-__"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        {errors.phone && <span className="text-red-600 text-xs">{errors.phone}</span>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ИНН*</label>
                            <input
                                type="text"
                                name="inn"
                                value={values?.inn || ""}
                                onChange={handleChange}
                                required
                                pattern="^\d{10}(\d{2})?$"
                                title="ИНН должен быть 10 или 12 цифр (например, 123456789012)"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        {errors.inn && <span className="text-red-600 text-xs">{errors.inn}</span>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Юридический адрес*</label>
                            <input
                                type="text"
                                name="legal_address"
                                value={values?.legal_address || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        {errors.legal_address && <span className="text-red-600 text-xs">{errors.legal_address}</span>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Фактический адрес*</label>
                            <input
                                type="text"
                                name="actual_address"
                                value={values?.actual_address || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        {errors.actual_address && <span className="text-red-600 text-xs">{errors.actual_address}</span>}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Руководитель организации*</label>
                            <input
                                type="text"
                                name="full_name_owner"
                                value={values?.full_name_owner || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        {errors.full_name_owner && (
                            <span className="text-red-600 text-xs">{errors.full_name_owner}</span>
                        )}
                    </div>
                    <div>
                        {error && <div className="text-red-600 text-sm text-center my-4">{error}</div>}
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium ${
                                isValid
                                    ? "text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    : "text-gray-400 bg-gray-200"
                            }`}
                            disabled={!isValid}
                        >
                            Отправить заявку
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Уже есть аккаунт?
                        <Link
                            to={ROUTES.LOGIN}
                            className="font-medium text-gray-600 hover:text-gray-500 cursor-pointer"
                            style={{ paddingLeft: 4 }}
                        >
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
