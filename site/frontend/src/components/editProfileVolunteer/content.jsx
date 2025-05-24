import { useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import { userServiceApi } from "../../utils/api/user_service";
import { useContext, useEffect, useState, useRef } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { AuthContext } from "../../context/AuthProvider";

export default function Content() {
    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation("volunteerUpdate");
    const { token, id, updateProfile, updateImage, logout } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        console.log(token);
        userServiceApi.getAvatarByID(token, id, logout)
            .then(blob => setAvatarPreview(URL.createObjectURL(blob)))
            .catch(console.error);

        userServiceApi.getMyVolonteerProfile(token)
            .then(({ data }) => {
                const transformed = {
                    surname: data.surname,
                    name: data.name,
                    patronymic: data.patronymic,
                    email: data.email,
                    phone: data.phone,
                    date_of_birthday: data.date_of_birthday,
                    registration_address: data.address,
                };
                setProfileData(transformed);
                resetForm(transformed, {}, true);
            })
            .catch(console.error);
    }, [token, id, logout, resetForm]);

    const handleAvatarChange = e => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => fileInputRef.current.click();

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");

        const formData = new FormData();
        formData.append('surname', values.surname || "");
        formData.append('name', values.name || "");
        formData.append('patronymic', values.patronymic || "");
        formData.append('email', values.email || "");
        formData.append('phone', values.phone || "");
        formData.append('date_of_birthday', values.date_of_birthday || "");
        formData.append('address', values.registration_address || "");
        if (avatarFile) formData.append('avatar', avatarFile);

        try {
            await userServiceApi.putEditVolonteer(token, formData);
            updateProfile({ ...values, address: values.registration_address });
            if (avatarFile) {
                const url = URL.createObjectURL(avatarFile);
                setAvatarPreview(url);
                updateImage(url);
            }
            navigate(ROUTES.ACCOUNT_VOLUNTEER);
        } catch {
            setError("Произошла ошибка при обновлении профиля");
        }
    };

    if (!profileData) return <div>Загрузка...</div>;

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Редактирование профиля</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img
                                src={avatarPreview || "/images/default-avatar.png"}
                                alt="Avatar"
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                            >
                                <img
                                    src={require("../../images/camera_white.svg").default}
                                    alt="icon"
                                    className="w-4 h-4"
                                />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            ["surname","Фамилия"],
                            ["name","Имя"],
                            ["patronymic","Отчество"],
                            ["email","Email"],
                            ["phone","Телефон"],
                            ["date_of_birthday","Дата рождения"]
                        ].map(([field,label]) => (
                            <div key={field} className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    type={field==="email"?"email": field==="date_of_birthday"?"date":"text"}
                                    name={field}
                                    value={values[field]||""}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Адрес регистрации</label>
                        <input
                            type="text"
                            name="registration_address"
                            value={values.registration_address||""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        {errors.registration_address && <p className="text-red-500 text-sm">{errors.registration_address}</p>}
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-full py-3 rounded-md text-white font-medium ${
                            isValid ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Сохранить изменения
                    </button>
                </form>
            </div>
        </main>
    );
}
