import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { userServiceApi } from "../../utils/api/user_service";
import { Alert, Snackbar } from "@mui/material";

function Dashboard({ isSidebarOpen, setIsSidebarOpen }) {
    const { token } = useContext(AuthContext);
    const [statistics, setStatistics] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (!token) return;
        userServiceApi
            .getAdminStatistics(token)
            .then((data) => {
                setStatistics(data);
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке статистики", severity: "error" });
                setStatistics([]);
            });
    }, [token]);

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    const stats = statistics?.data
        ? [
              {
                  icon: require("../../images/people_red.svg").default,
                  title: "Пользователи",
                  value: statistics.data.count_user,
              },
              {
                  icon: require("../../images/stats_red.svg").default,
                  title: "Активные задания",
                  value: statistics.data.count_active_tasks,
              },
              {
                  icon: require("../../images/ban_red.svg").default,
                  title: "Заблокированные",
                  value: statistics.data.count_blocked_users,
              },
              {
                  icon: require("../../images/circle-check_red.svg").default,
                  title: "Выполнено",
                  value: statistics.data.count_finished_tasks,
              },
          ]
        : [];

    return (
        <main className="w-full p-4 sm:p-6 lg:p-8">
            <div className="mb-6 sm:mb-8 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Главная страница</h2>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden p-2 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
                    aria-label="Открыть меню"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                            <div className="bg-red-100 p-2 sm:p-3 rounded-lg">
                                <img className="w-6 h-6" src={stat.icon} alt={stat.title} />
                            </div>
                        </div>
                        <h3 className="text-gray-600 text-sm sm:text-base mb-1 line-clamp-2">{stat.title}</h3>
                        <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                ))}
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
        </main>
    );
}

export default Dashboard;
