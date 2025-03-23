import { useCallback, useContext, useEffect, useState } from "react";
import { userServiceApi } from "../../utils/api/user_service";
import { AuthContext } from "../../context/AuthProvider";
import { Alert, Snackbar } from "@mui/material";
import ROUTES from "../../constants/routes";
import { Link } from "react-router";

function Organizations() {
    const { token } = useContext(AuthContext);
    const [organizations, setOrganizations] = useState([]);
    const [alert, setAlert] = useState(null);

    const fetchOrganizations = useCallback(() => {
        if (!token) return;
        userServiceApi
            .getAcceptedOrganizations(token)
            .then((data) => {
                setOrganizations(data || []);
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке организаций", severity: "error" });
                setOrganizations([]);
            });
    }, [token]);

    useEffect(() => {
        fetchOrganizations();
    }, [fetchOrganizations]);

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    return (
        <div id="tasks-section" className="md:col-span-2 mx-2 md:mx-0 md:p-8">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div id="current-tasks" className="space-y-6">
                    {organizations.length > 0 ? (
                        organizations.map((organization) => (
                            <div key={organization.id} className="border rounded-lg p-3 md:p-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg`}
                                        className="w-12 h-12 rounded-full"
                                        alt="Логотип организации"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <Link
                                            to={`${ROUTES.PUBLIC_ACCOUNT_ORGANIZATION.replace(
                                                ":organizationId",
                                                organization.id
                                            )}`}
                                            className="font-semibold text-base md:text-lg hover:underline"
                                        >
                                            {organization.name}
                                        </Link>
                                        <p className="text-gray-600 text-xs md:text-sm mt-1">
                                            Дата создания:{" "}
                                            {new Date(organization.created_at).toLocaleDateString("ru-RU")}
                                        </p>
                                    </div>
                                    <Link
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors hover:underline"
                                        to={`${ROUTES.PUBLIC_ACCOUNT_ORGANIZATION.replace(
                                            ":organizationId",
                                            organization.id
                                        )}`}
                                    >
                                        Открыть
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center">Нет доступных организаций</div>
                    )}
                </div>
            </div>

            {alert && (
                <Snackbar
                    open={true}
                    autoHideDuration={4000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default Organizations;
