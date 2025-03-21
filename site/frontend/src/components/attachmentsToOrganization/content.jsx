import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { userServiceApi } from "../../utils/api/user_service";
import { Alert, Snackbar } from "@mui/material";

function Content() {
    const { token } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [alert, setAlert] = useState(null);

    const fetchRequests = useCallback(() => {
        if (!token) return;
        userServiceApi
            .getRequestsToApply(token)
            .then((data) => {
                const list = Array.isArray(data.data) ? data.data : [];
                setRequests(list);
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке заявок", severity: "error" });
                setRequests([]);
            });
    }, [token]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const handleRequestSelect = (id) => {
        setSelectedRequest(id);
        if (!token) return;
        userServiceApi
            .getVolonteerProfileById(token, id)
            .then(setUserDetails)
            .catch(() => setAlert({ message: "Ошибка загрузки данных заявки", severity: "error" }));
    };

    const handleAcceptRequest = (id) => {
        if (!token) return;
        userServiceApi
            .putAcceptUserAttachment(token, id)
            .then(() => {
                fetchRequests();
                setUserDetails(null);
                setSelectedRequest(null);
                setAlert({ message: "Волонтёр успешно принят в организацию!", severity: "success" });
            })
            .catch(() => setAlert({ message: "Ошибка при регистрации заявки", severity: "error" }));
    };

    const handleRejectRequest = (id) => {
        setAlert({ message: "Метода нет", severity: "error" });
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    return (
        <>
            <main id="main-content" className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    <div
                        style={{ height: "fit-content" }}
                        id="applications-list"
                        className="col-span-4 rounded-lg border bg-white p-4"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg">Заявки</h2>
                        </div>
                        <div className="space-y-3">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50"
                                    onClick={() => handleRequestSelect(request.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2`}
                                            className="h-10 w-10 rounded-full"
                                            alt="user-photo"
                                        />
                                        <div>
                                            <p>{request.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        style={{ height: "fit-content" }}
                        id="application-details"
                        className="col-span-8 rounded-lg border bg-white p-6"
                    >
                        {userDetails ? (
                            <>
                                <div className="mb-6 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2"
                                            className="h-16 w-16 rounded-full"
                                            alt="user-photo"
                                        />
                                        <div>
                                            <h2 className="text-xl">{userDetails.name}</h2>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            className="rounded-lg border bg-red-600 px-4 py-2 text-white hover:bg-red-800"
                                            onClick={() => handleAcceptRequest(selectedRequest)}
                                        >
                                            Принять
                                        </button>
                                        <button
                                            className="rounded-lg border px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                                            onClick={() => handleRejectRequest(selectedRequest)}
                                        >
                                            Отклонить
                                        </button>
                                    </div>
                                </div>
                                <div className="full-w">
                                    <div className="rounded-lg border p-4">
                                        <h3 className="mb-3">Данные пользователя</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <p className="text-sm text-neutral-600">Имя</p>
                                                <p>{userDetails.name || "Не указано"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-neutral-600">Фамилия</p>
                                                <p>{userDetails.surname || "Не указано"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-neutral-600">Отчество</p>
                                                <p>{userDetails.patronymic || "Не указано"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-neutral-600">Дата рождения</p>
                                                <p>{userDetails.date_of_birthday || "Не указано"}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-neutral-600">Адрес регистрации</p>
                                                <p>{userDetails.address || "Не указано"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Выберите заявку, чтобы увидеть подробности.</p>
                        )}
                    </div>
                </div>
            </main>
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
        </>
    );
}

export default Content;
