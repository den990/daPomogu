import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider.js";
import { taskServiceApi } from "../../utils/api/task_service.js";
import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import { Alert, Snackbar } from "@mui/material";

function Tasks() {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [alert, setAlert] = useState(null);
    const [activeTab, setActiveTab] = useState('opened');
    const [numberOfPage, setNumberOfPage] = useState(1);

    const statuses = {
        1: "Выполнено",
        2: "Не выполнено",
        3: "В работе",
        4: "Не начато"
    };

    const getStatusClasses = (statusId) => {
        switch (statusId) {
            case 1:
                return "bg-green-100 text-green-600";
            case 2:
                return "bg-red-100 text-red-600";
            case 3:
                return "bg-yellow-100 text-yellow-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const fetchOpenedTasks = useCallback(
        (page) => {
            if (token) {
                taskServiceApi
                    .getMyOpenedTasks(token, page)
                    .then((response) => {
                        const { rows } = response.data;
                        setTasks(rows || []);
                        console.log(response.data);
                    })
                    .catch(() => {
                        setAlert({ message: "Ошибка при загрузке заданий", severity: "error" });
                        setTasks([]);
                    });
            }
        },
        [token]
    );

    const fetchClosedTasks = useCallback(
        (page) => {
            if (token) {
                taskServiceApi
                    .getMyClosedTasks(token, page)
                    .then((response) => {
                        const { rows } = response.data;
                        setTasks(rows || []);
                    })
                    .catch(() => {
                        setAlert({ message: "Ошибка при загрузке заданий", severity: "error" });
                        setTasks([]);
                    });
            }
        },
        [token]
    );

    useEffect(() => {
        if (activeTab === 'opened') {
            fetchOpenedTasks(numberOfPage);
        } else {
            fetchClosedTasks(numberOfPage);
        }
    }, [activeTab, numberOfPage, fetchOpenedTasks, fetchClosedTasks]);

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    const handleOpenedTabClick = () => {
        setActiveTab('opened');
        setNumberOfPage(1);
    };

    const handleClosedTabClick = () => {
        setActiveTab('closed');
        setNumberOfPage(1);
    };

    return (
        <div id="tasks-section" className="md:col-span-2 mx-2 md:mx-0">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold">Мои задания</h3>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        <button
                            onClick={handleOpenedTabClick}
                            className={`px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg hover:bg-red-100 min-w-max ${
                                activeTab === 'opened'
                                    ? 'text-red-600 bg-red-50'
                                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                            }`}>
                            Текущие
                        </button>
                        <button
                            onClick={handleClosedTabClick}
                            className={`px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg hover:bg-gray-100 min-w-max ${
                                activeTab === 'closed'
                                    ? 'text-red-600 bg-red-50'
                                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                            }`}>
                            Завершенные
                        </button>
                    </div>
                </div>
                {tasks.length !== 0 ? (
                    <>
                        <div id="current-tasks" className="space-y-6">
                            {tasks.map((task) =>
                                <div className="border rounded-lg p-3 md:p-4">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-base md:text-lg">
                                                {task.name}
                                            </h4>
                                            <p className="text-gray-600 text-xs md:text-sm mt-1">
                                            {new Date(task.task_date).toLocaleString("ru-RU", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                            </p>
                                            <div className="mt-2 md:mt-3 flex items-center">
                                                <span className={`text-xs px-2 py-1 rounded ${getStatusClasses(task.status_id)}`}>
                                                    {statuses[task.status_id] || "Неизвестный статус"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                    <Link
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                        to={`${ROUTES.TASK.replace(":taskId", task.id)}`}
                                    >
                                        Открыть
                                    </Link>
                                </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <span className="text-gray-500 text-lg">Нет заданий, в которых вы участвуете</span>
                    </div>
                )}
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
        </div>
    );
}

export default Tasks;
