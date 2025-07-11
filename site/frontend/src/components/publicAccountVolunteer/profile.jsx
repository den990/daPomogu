import React, { useContext } from "react";
import ROUTES from "../../constants/routes";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { chatServiceApi } from "../../utils/api/chat_service";
import { useNavigate } from "react-router-dom";

function Profile({ profile, imageUrl }) {
    const { role, token, id, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    if (!token)
        return

    const handleCreateChat = async () => {
        try {
            const payload = {
                user_id: profile.id,
            };
            console.log(payload);
            await chatServiceApi.postCreateChat(token, payload, logout);

            navigate(`${ROUTES.CHAT}`);
        } catch (error) {
            console.error("Ошибка при создании чата:", error);
        }
    };

    return (
        <div id="profile-section" className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col items-center">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            className="w-32 h-32 rounded-full"
                            alt="humanitarian organization logo with volunteers in red and white colors"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">
                                {profile?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                    )}
                    <h2 className="mt-4 text-xl font-semibold">
                        {profile ? `${profile.name} ${profile.surname}` : "Нет данных"}
                    </h2>
                    <p className="text-gray-600" style={{ display: "flex", alignItems: "center" }}>
                        <img
                            style={{ width: 12, height: 16 }}
                            src={require("../../images/placemark_grey.svg").default}
                            alt="placemark"
                        />
                        <span style={{ paddingLeft: 10 }}>{profile ? profile.address : "Нет данных"}</span>
                    </p>
                </div>
                <div className="mt-6 gap-4 text-center flex flex-col justify-center">
                    <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-red-600">{profile ? profile.count_tasks : "0"}</div>
                        <div className="text-sm text-gray-600">Выполнено заданий</div>
                    </div>
                    {role !== "organization" && profile?.id !== id && (
                        <button
                            onClick={handleCreateChat}
                            className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"

                        >
                            Написать сообщение
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
