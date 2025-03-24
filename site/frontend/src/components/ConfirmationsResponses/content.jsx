import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Alert, Snackbar } from "@mui/material";
import { taskServiceApi } from "../../utils/api/task_service";
import { userServiceApi } from "../../utils/api/user_service";

function Content({ taskId }) {
    const { token } = useContext(AuthContext);
    const [responses, setResponses] = useState([]);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [alert, setAlert] = useState(null);
    const task_id = Number(taskId);

    const fetchResponses = useCallback(() => {
        if (!token) return;
        taskServiceApi
            .getNotConfirmedResponses(token, taskId)
            .then((response) => {
                const rows = response?.data?.rows;
                if (rows && Array.isArray(rows)) {
                    setResponses(rows);
                } else {
                    setResponses([]);
                }
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке откликов", severity: "error" });
                setResponses([]);
            });
    }, [token, taskId]);

    useEffect(() => {
        fetchResponses();
    }, [fetchResponses]);

    const handleResponseSelect = async (id) => {
        setSelectedResponse(id);
        if (!token) return;
        try {
            const response = await taskServiceApi.getResponseById(token, id);
            const userId = response.data.UserID;
            setSelectedVolunteerId(userId);
            try {
                const profile = await userServiceApi.getVolonteerProfileById(token, userId);
                setUserDetails(profile);
            } catch (error) {
                setAlert({
                    message: "Ошибка загрузки данных волонтёра",
                    severity: "error",
                });
            }
        } catch (error) {
            setAlert({
                message: "Ошибка загрузки информации о волонтёре",
                severity: "error",
            });
        }
    };

    const handleConfirmResponse = async () => {
        if (!token || !selectedResponse) return;
        try {
            await taskServiceApi.putConfirmResponse(token, selectedResponse);
            fetchResponses();
            setUserDetails(null);
            setSelectedResponse(null);
            setSelectedVolunteerId(null);
            setAlert({ message: "Волонтёр успешно принят в задание!", severity: "success" });
        } catch (error) {
            setAlert({ message: "Ошибка при принятии волонтёра", severity: "error" });
        }
    };

    const handleRejectResponse = async () => {
        if (!token || !selectedVolunteerId) return;
        try {
            await taskServiceApi.deleteResponse(token, task_id, selectedVolunteerId);
            fetchResponses();
            setUserDetails(null);
            setSelectedResponse(null);
            setSelectedVolunteerId(null);
            setAlert({ message: "Волонтёр успешно отклонён!", severity: "success" });
        } catch (error) {
            setAlert({ message: "Ошибка при отклонении отклика", severity: "error" });
        }
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    return (
        <main className="container mx-auto px-4 py-4 md:py-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                <div className="md:col-span-4 order-1">
                    <div className="rounded-lg border bg-white p-3 md:p-4">
                        <h2 className="text-base md:text-lg mb-3 md:mb-4">Отклики на участие в задании</h2>
                        <div className="space-y-2 md:space-y-3">
                            {responses.map((response) => (
                                <div
                                    key={response.ID}
                                    className="rounded-lg border p-2 md:p-3 hover:bg-neutral-50 cursor-pointer"
                                    onClick={() => handleResponseSelect(response.ID)}
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <img
                                            src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=${response.User.id}`}
                                            className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                                            alt="Фото пользователя"
                                        />
                                        <p className="text-sm md:text-base">
                                            {response.User.name + " " + response.User.surname}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-8 order-2">
                    {selectedResponse ? (
                        <div className="rounded-lg border bg-white p-4 md:p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                                <div className="flex items-center gap-3 md:gap-4 w-full">
                                    <img
                                        src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=2"
                                        className="h-12 w-12 md:h-16 md:w-16 rounded-full"
                                        alt="Фото пользователя"
                                    />
                                    <h2 className="text-lg md:text-xl">
                                        {`${userDetails?.name || "Не указано"} ${userDetails?.surname || ""}`.trim() ||
                                            "Не указано"}
                                    </h2>
                                </div>
                                <div className="hidden md:flex gap-2">
                                    <button
                                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-800"
                                        onClick={handleConfirmResponse}
                                    >
                                        Принять
                                    </button>
                                    <button
                                        className="rounded-lg border px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                                        onClick={handleRejectResponse}
                                    >
                                        Отклонить
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                {userDetails ? (
                                    <div className="rounded-lg border p-3 md:p-4">
                                        <h3 className="mb-3">Данные пользователя</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Имя</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails?.name || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Фамилия</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails?.surname || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Отчество</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails?.patronymic || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Дата рождения</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails?.date_of_birthday || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Адрес регистрации</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails?.address || "Не указано"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="md:hidden flex flex-col gap-2 mt-4">
                                            <button
                                                className="w-full rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-800"
                                                onClick={handleConfirmResponse}
                                            >
                                                Принять
                                            </button>
                                            <button
                                                className="w-full rounded-lg border px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                                                onClick={handleRejectResponse}
                                            >
                                                Отклонить
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Загрузка данных...</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg border bg-white p-4 md:p-6">
                            <p>Выберите заявку, чтобы увидеть подробности.</p>
                        </div>
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
        </main>
    );
}

export default Content;
