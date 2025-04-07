import { Link } from "react-router";
import React, { useContext } from "react";
import ROUTES from "../../constants/routes";
import { AuthContext } from "../../context/AuthProvider";

function Profile() {
    const { profile, loading, imageUrl } = useContext(AuthContext);

    return (
        <div id="profile-section" className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col items-center">
                    {imageUrl ? (
                            <img
                                src={imageUrl}
                                className="w-32 h-32 rounded-full object-cover"
                                alt="volunteer"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">
                                    {profile?.name?.charAt(0) || 'A'}
                                </span>
                            </div>
                        )}
                    <h2 className="mt-4 text-xl font-semibold">
                        {loading ? "Загрузка..." : profile ? `${profile.name} ${profile.surname}` : "Нет данных"}
                    </h2>
                    <p className="text-gray-600" style={{ display: "flex", alignItems: "center" }}>
                        <img
                            style={{ width: 12, height: 16 }}
                            src={require("../../images/placemark_grey.svg").default}
                            alt="placemark"
                        />
                        <span style={{ paddingLeft: 10 }}>
                            {loading ? "Загрузка..." : profile ? profile.address : "Нет данных"}
                        </span>
                    </p>
                </div>
                <div className="mt-6 gap-4 text-center flex flex-col justify-center">
                    <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-red-600">{profile ? profile.count_tasks : "0"}</div>
                        <div className="text-sm text-gray-600">Выполнено заданий</div>
                    </div>
                    <Link
                        to={ROUTES.EDIT_VOLUNTEER_PROFILE}
                        className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    >
                        Редактировать профиль
                    </Link>
                    <Link
                        to={ROUTES.EDIT_PASSWORD}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    >
                        Сменить пароль
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
