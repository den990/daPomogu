import React, { useContext, useState } from "react";
import { userServiceApi } from "../../utils/api/user_service";
import { AuthContext } from "../../context/AuthProvider";
import { Snackbar, Alert } from "@mui/material";
import { Link } from "react-router";

function Profile({ profile, imageUrl }) {
    const { token, role } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);

    const handleAttach = () => {
        if (!token || !profile) return;
        userServiceApi
            .postAttachUserToOrganization(token, profile.id)
            .then(() => {
                setAlert({ message: "Заявка успешно отправлена!", severity: "success" });
            })
            .catch((error) => {
                console.error("Ошибка при присоединении к организации:", error);
                setAlert({ message: "Ошибка при присоединении к организации", severity: "error" });
            });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    if (!profile) {
        return <div className="bg-white rounded-lg shadow-sm p-6 mb-8">Загрузка профиля...</div>;
    }

    return (
        <section id="org-profile" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-6">
                {imageUrl ? (
                        <img
                            src={imageUrl}
                            className="w-48 h-48 rounded-full object-cover"
                            alt="humanitarian organization logo with volunteers in red and white colors"
                        />
                    ) : (
                        <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">
                                {profile?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                    )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{profile ? profile.name : "Нет данных"}</h2>
                    {(profile.is_attached === false) ? role === "volunteer" && (
                        <button
                            onClick={handleAttach}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center"
                        >
                            <img
                                style={{ width: 20, height: 16 }}
                                src={require("../../images/registration_white.svg").default}
                                alt="registration"
                            />
                            <span style={{ paddingLeft: 10 }}>Присоединиться к организации</span>
                        </button>
                    ) : <></>} 
                </div>
            </div>
            {alert && (
                <Snackbar
                    open={Boolean(alert)}
                    autoHideDuration={4000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            )}
        </section>
    );
}

export default Profile;
