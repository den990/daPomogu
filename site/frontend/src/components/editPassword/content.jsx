import { useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import { useState, useContext } from "react";
import { userServiceApi } from "../../utils/api/user_service";
import { AuthContext } from "../../context/AuthProvider";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import GetRole from "../../utils/GetRole";

function Content() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { values, errors, handleChange } = useFormWithValidation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (values.newPassword !== values.confirmPassword) {
            setError("Новый пароль и подтверждение не совпадают.");
            return;
        }

        const {oldPassword, newPassword} = values;

        try {
            await userServiceApi.putChangePassword(token, oldPassword, newPassword);
            alert("Пароль успешно изменен!"); 
            let role = GetRole(token);
            if (role === "organization") {
                navigate(ROUTES.ACCOUNT_ORGANIZATION);
            } else {
                navigate(ROUTES.ACCOUNT_VOLUNTEER);
            }
        } catch (err) {
            setError("Произошла ошибка при смене пароля");
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Смена пароля</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-lg shadow-sm p-6"
                >
                    <div className="space-y-6">
                        {error && <p className="text-red-500">{error}</p>}

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Старый пароль</label>
                            <input 
                                type="password" 
                                name="oldPassword"
                                value={values?.oldPassword || ''}
                                onChange={handleChange}
                                required 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Новый пароль</label>
                            <input 
                                type="password" 
                                name="newPassword"
                                value={values?.newPassword || ''}
                                onChange={handleChange}
                                minLength={6}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        {errors.newPassword && <span className="text-red-600 text-xs">{errors.newPassword}</span>}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Подтверждение пароля</label>
                            <input 
                                type="password"
                                name="confirmPassword"
                                value={values?.confirmPassword || ''}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        {errors.confirmPassword && <span className="text-red-600 text-xs">{errors.confirmPassword}</span>}
                        <div className="pt-4">
                            <button className="block w-full text-center bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition font-medium" type="submit">
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Content;