import { useNavigate } from "react-router";
import ROUTES from "../../constants/routes";
import { userServiceApi } from "../../utils/api/user_service";
import { useContext, useEffect, useState, useRef } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { AuthContext } from "../../context/AuthProvider";

export default function Content() {
    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation("organizationUpdate");
    const { token, updateProfile, updateImage, logout } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;
        userServiceApi.getMyOrganizationAvatar(token, logout)
            .then(blob => setAvatarPreview(URL.createObjectURL(blob)))
            .catch(console.error);
        userServiceApi.getMyOrganizationProfile(token, logout)
            .then(({ data }) => {
                setProfileData(data);
                resetForm(data, {}, true);
            })
            .catch(console.error);
    }, [token, logout, resetForm]);

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
        formData.append("name", values.name || "");
        formData.append("email", values.email || "");
        formData.append("phone", values.phone || "");
        formData.append("inn", values.inn || "");
        formData.append("legal_address", values.legal_address || "");
        formData.append("actual_address", values.actual_address || "");
        formData.append("full_name_owner", values.full_name_owner || "");
        if (avatarFile) formData.append("avatar", avatarFile);

        try {
            await userServiceApi.putEditOrganization(token, formData);
            updateProfile(values);
            if (avatarFile) {
                const url = URL.createObjectURL(avatarFile);
                setAvatarPreview(url);
                updateImage(url);
            }
            navigate(ROUTES.ACCOUNT_ORGANIZATION);
        } catch {
            setError("Произошла ошибка при обновлении профиля");
        }
    };

    if (!profileData) return <div>Загрузка...</div>;

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Редактирование профиля организации</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <img
                                src={avatarPreview || "/images/no-avatar.jpg"}
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
                        <Field label="Юридическое название" name="name" value={values.name} onChange={handleChange} error={errors.name}/>
                        <Field label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email}/>
                        <Field label="Телефон" name="phone" value={values.phone} onChange={handleChange} error={errors.phone}/>
                        <Field label="ИНН" name="inn" value={values.inn} onChange={handleChange} error={errors.inn}/>
                        <Field label="Юридический адрес" name="legal_address" value={values.legal_address} onChange={handleChange} error={errors.legal_address}/>
                        <Field label="Фактический адрес" name="actual_address" value={values.actual_address} onChange={handleChange} error={errors.actual_address}/>
                    </div>

                    <div className="mt-6">
                        <Field label="Руководитель организации" name="full_name_owner" value={values.full_name_owner} onChange={handleChange} error={errors.full_name_owner}/>
                    </div>

                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`mt-6 w-full py-3 rounded-md text-white font-medium transition ${
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

function Field({ label, name, type = "text", value, onChange, error }) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
