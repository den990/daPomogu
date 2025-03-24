import React, { useContext, useState } from "react";
import { userServiceApi } from "../../utils/api/user_service";
import { AuthContext } from "../../context/AuthProvider";
import { Snackbar, Alert } from "@mui/material";
import { Link } from "react-router";

function Profile({ profile }) {
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

    return (
        <section id="org-profile" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-6">
                <img
                    className="w-48 h-48 rounded-lg object-cover"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cb61e8f45a-5ee863536d744c529bb2.png"
                    alt="humanitarian organization logo with volunteers in red and white colors"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{profile ? profile.name : "Нет данных"}</h2>
                    {role === "volunteer" && (
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
                    )}
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
