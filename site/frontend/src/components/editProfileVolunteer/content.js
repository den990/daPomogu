import { Link, useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import { userServiceApi } from "../../utils/api/user_service"; 
import { useContext, useEffect, useState } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { AuthContext } from "../../context/AuthProvider";

function Content() {
    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
    const { token, updateProfile } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            userServiceApi.getMyVolonteerProfile(token)
            .then(data => {
                const transformedData = { 
                    ...data, 
                    registration_address: data.address 
                };
                setProfileData(transformedData);
                resetForm(transformedData, {}, true);
            })
            .catch(error => {
                console.error('Ошибка при загрузке профиля:', error);
            });
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const {name, surname, patronymic, date_of_birthday, registration_address, email, phone} = values;
        
        try {
            await userServiceApi.putEditVolonteer(token, name, surname, patronymic, date_of_birthday, registration_address, email, phone)
            updateProfile({ ...values, address: registration_address });
            navigate(ROUTES.ACCOUNT_VOLUNTEER);
        } catch (error) {
            console.error('Ошибка при загрузке профиля:', error);
        }
    };

    if (!profileData) {
        return <div>Загрузка...</div>;
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Редактирование профиля</h1>
                <form id="profile-form" onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-8 flex items-center justify-center flex-col">
                        <div className="relative">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                            <button className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
                                <img style={{ width: 16, height: 16 }} src={ require("../../images/camera_white.svg").default } alt="icon" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Фамилия</label>
                                <input 
                                    type="text"
                                    name="surname"
                                    value={values.surname || ""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Имя</label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    name="name"
                                    value={values.name || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Отчество</label>
                                <input 
                                    type="text" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    name="patronymic"
                                    value={values.patronymic || ""}
                                    onChange={handleChange} 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    name="email"
                                    value={values.email || ""}
                                    onChange={handleChange}  
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Телефон</label>
                                <input 
                                    type="tel" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    name="phone"
                                    value={values.phone || ""}
                                    onChange={handleChange}  
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Дата рождения</label>
                                <input 
                                    type="date" 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    name="date_of_birthday"
                                    value={values.date_of_birthday || ""}
                                    onChange={handleChange}  
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Адрес регистрации</label>
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                name="registration_address"
                                value={values.registration_address || ""}
                                onChange={handleChange} 
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="block w-full text-center bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition font-medium"
                            >
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