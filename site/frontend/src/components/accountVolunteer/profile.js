import { Link } from "react-router";
import React, { useEffect, useState } from "react";
import ROUTES from "../../constants/routes";
import RequestToServerWithAuth from "../../utils/RequestToServerWithAuth";
import { useAuthContext } from "../../context/AuthContext";

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        if (!token) return;

        const fetchProfile = async () => {
    
        try {
            const response = await RequestToServerWithAuth("http://localhost:8080/api/profile", "GET", token);
    
            if (!response.ok) {
                throw new Error("Не удалось получить данные профиля");
            }
    
            const data = await response.json();
            setProfileData(data);
        } catch (error) {
            console.error("Ошибка при загрузке профиля:", error);
        }
        };
    
        fetchProfile();
    }, [token]);

    const userName = profileData
    ? `${profileData.name} ${profileData.surname}`
    : "Загрузка...";
    
    return (
        <div id="profile-section" className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-32 h-32 rounded-full" alt="Profile" />
                <h2 className="mt-4 text-xl font-semibold">{userName}</h2>
                <p className="text-gray-600" style={{display: "flex", alignItems: "center"}}>
                    <img style={{ width: 12, height: 16 }} src={require("../../images/placemark_grey.svg").default} alt="placemark" />
                    <span style={{paddingLeft: 10}}>Москва</span>
                </p>
            </div>
            <div className="mt-6 gap-4 text-center flex flex-col justify-center">
                <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-600">47</div>
                    <div className="text-sm text-gray-600">Выполнено заданий</div>
                </div>
                <Link to={ROUTES.EDIT_VOLUNTEER_PROFILE} className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    Редактировать профиль
                </Link>
                <Link to={ROUTES.EDIT_PASSWORD} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    Сменить пароль
                </Link>
            </div>
            </div>
        </div>
    );
}

export default Profile;