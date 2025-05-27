import { Link } from "react-router";
import { registerVolunteer } from "../../utils/auth";
import { useState } from "react";
import ROUTES from "../../constants/routes";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import RoleHeader from "../RoleHeader/RoleHeader";

function RegistrationForm({ setIsPopUpVisible }) {
    const { values, errors, isValid, handleChange } = useFormWithValidation("volunteer");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!values.terms) {
            setError("Вы должны согласиться с условиями использования и политикой конфиденциальности");
            return;
        }

        const { surname, name, patronymic, email, phone, date_of_birthday, address, password } = values;

        try {
            await registerVolunteer(
                email,
                phone,
                name,
                surname,
                patronymic,
                date_of_birthday,
                address,
                password
            );
            setIsPopUpVisible(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div id="registration-form" className="w-full lg:w-1/2 px-6 lg:px-12 py-12">
            <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Регистрация волонтера</h2>
                    <p className="text-gray-600 mt-2">Создайте аккаунт, чтобы начать помогать</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="surname">
                                Фамилия*
                            </label>
                            <input
                                type="text"
                                name="surname"
                                value={values?.surname || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.surname && <span className="text-red-600 text-xs">{errors.surname}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                                Имя*
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={values?.name || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="patronymic">
                                Отчество
                            </label>
                            <input
                                type="text"
                                name="patronymic"
                                value={values?.patronymic || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.patronymic && <span className="text-red-600 text-xs">{errors.patronymic}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email*
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={values?.email || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                                Телефон*
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={values?.phone || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.phone && <span className="text-red-600 text-xs">{errors.phone}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="date_of_birthday">
                                Дата рождения*
                            </label>
                            <input
                                type="date"
                                name="date_of_birthday"
                                value={values?.date_of_birthday || ""}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.date_of_birthday && <span className="text-red-600 text-xs">{errors.date_of_birthday}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                                Адрес регистрации*
                            </label>
                            <textarea
                                name="address"
                                value={values?.address || ""}
                                onChange={handleChange}
                                rows="3"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            ></textarea>
                            {errors.address && <span className="text-red-600 text-xs">{errors.address}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                Пароль*
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={values?.password || ""}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.password && <span className="text-red-600 text-xs">{errors.password}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">
                                Подтверждение пароля*
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={values?.password_confirmation || ""}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            />
                            {errors.password_confirmation && (
                                <span className="text-red-600 text-xs">{errors.password_confirmation}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={values.terms || false}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            required
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            Я согласен с условиями использования и политикой конфиденциальности*
                        </label>
                    </div>
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
                        Зарегистрироваться
                    </button>
                    <div className="mt-4 md:hidden text-center">
                        <p className="text-sm text-gray-600">
                            Представляете организацию?
                            <Link
                                to={ROUTES.REGISTER_ORGANIZATION}
                                className="ml-1 font-medium text-red-600 hover:text-red-500"
                            >
                                Зарегистрировать организацию
                            </Link>
                        </p>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Уже есть аккаунт?
                    <Link
                        to={ROUTES.LOGIN}
                        className="font-medium text-red-600 hover:text-red-500 cursor-pointer"
                        style={{ paddingLeft: 4 }}
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegistrationForm;