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
    const [userDetailsAvatar, setUserDetailsAvatar] = useState(null);

    const fetchRequests = useCallback(() => {
        if (!token) return;
        userServiceApi
            .getRequestsToApply(token)
            .then((data) => {
                const list = Array.isArray(data.data) ? data.data : [];
                setRequests(list);
                console.log(list);
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

        userServiceApi
            .getAvatarByID(id)
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setUserDetailsAvatar(url);
                
            })
            .catch(() => setAlert({message: "Ошибка загрузки аватар заявки", severity: "error"}));
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
        if (!token) return;
        userServiceApi
            .putRejectUserAttachment(token, id)
            .then(() => {
                fetchRequests();
                setUserDetails(null);
                setSelectedRequest(null);
                setAlert({ message: "Волонтёр успешно отклонён!", severity: "success" });
            })
            .catch(() => setAlert({ message: "Ошибка при отклонении заявки", severity: "error" }));
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    console.log(userDetails);

    return (
        <>
            <main id="main-content" className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    <div id="applications-list" className="md:col-span-4 rounded-lg border bg-white p-3 md:p-4">
                        <div className="mb-3 md:mb-4 flex items-center justify-between">
                            <h2 className="text-lg">Заявки на вступление в организацию</h2>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="cursor-pointer rounded-lg border p-2 md:p-3 hover:bg-neutral-50"
                                    onClick={() => handleRequestSelect(request.id)}
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <img
                                            src={request.avatar_base64}
                                            className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                                            alt="user-photo"
                                        />
                                        <div>
                                            <p className="text-sm md:text-base">{request.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        id="application-details"
                        className="md:col-span-8 rounded-lg border bg-white p-4 md:p-6 mt-4 md:mt-0"
                    >
                        {userDetails ? (
                            <>
                                <div className="mb-4 md:mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={userDetailsAvatar}
                                            className="h-12 w-12 md:h-16 md:w-16 rounded-full"
                                            alt="user-photo"
                                        />
                                        <div>
                                            <h2 className="text-lg md:text-xl">{userDetails.name}</h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                                        <button
                                            className="rounded-lg border bg-red-600 px-3 py-2 md:px-4 md:py-2 text-white hover:bg-red-800 text-sm md:text-base"
                                            onClick={() => handleAcceptRequest(selectedRequest)}
                                        >
                                            Принять
                                        </button>
                                        <button
                                            className="rounded-lg border px-3 py-2 md:px-4 md:py-2 text-neutral-700 hover:bg-neutral-50 text-sm md:text-base"
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
                                                <p className="text-xs md:text-sm text-neutral-600">Имя</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails.name || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Фамилия</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails.surname || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Отчество</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails.patronymic || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Дата рождения</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails.date_of_birthday || "Не указано"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs md:text-sm text-neutral-600">Адрес регистрации</p>
                                                <p className="text-sm md:text-base">
                                                    {userDetails.address || "Не указано"}
                                                </p>
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
