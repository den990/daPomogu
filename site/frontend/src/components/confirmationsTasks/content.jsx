import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Alert, Snackbar } from "@mui/material";
import { taskServiceApi } from "../../utils/api/task_service";

function Content({ taskId }) {
    const { token } = useContext(AuthContext);
    const [approves, setApproves] = useState([]);
    const [selectedApprove, setSelectedApprove] = useState(null);
    const [approveDetails, setApproveDetails] = useState(null);
    const [maxScore, setMaxScore] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [score, setScore] = useState("");
    const [alert, setAlert] = useState(null);
    const task_id = Number(taskId);

    const fetchApproves = useCallback(() => {
        if (!token) return;
        taskServiceApi
            .getAllApproves(token, task_id)
            .then((response) => {
                const rows = response?.pagination?.rows;
                if (rows && Array.isArray(rows)) {
                    setApproves(rows);
                    taskServiceApi.getTaskById(token, task_id).then((data) => {
                        setMaxScore(data.max_score);
                    });
                } else {
                    setApproves([]);
                }
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке заявок на подтверждение", severity: "error" });
                setApproves([]);
            });
    }, [token, task_id]);

    useEffect(() => {
        fetchApproves();
    }, [fetchApproves]);

    const handleApproveSelect = async (id) => {
        setSelectedApprove(id);
        if (!token) return;
        taskServiceApi
            .getApproveById(token, id)
            .then((data) => {
                setApproveDetails(data.approve);
                setScore("");
                if (data.approve?.file) {
                    fetchImage(data.approve.file);
                }
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке инфромации о подтверждении", severity: "error" });
                setApproveDetails([]);
            });
    };

    const fetchImage = (filePath) => {
        if (!token || !filePath) return;
        taskServiceApi
            .getImageForConfirmation(token, filePath)
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке фото подтверждения", severity: "error" });
            });
    };

    const handleConfirmApprove = async () => {
        if (!token || !selectedApprove) return;
        if (score === "" || isNaN(Number(score))) {
            setAlert({ message: "Укажите корректное количество баллов", severity: "warning" });
            return;
        }
        const numericScore = Number(score);
        if (numericScore < 0 || numericScore > maxScore) {
            setAlert({ message: `Баллы должны быть от 0 до ${maxScore}`, severity: "warning" });
            return;
        }
        try {
            await taskServiceApi.putConfirmApprove(token, selectedApprove, numericScore, task_id);
            fetchApproves();
            setApproveDetails(null);
            setSelectedApprove(null);
            setImageUrl(null);
            setScore("");
            setAlert({ message: "Фотоотчёт успешно принят!", severity: "success" });
        } catch (error) {
            setAlert({ message: "Ошибка при принятии фотоотчёта", severity: "error" });
        }
    };

    const handleRejectApprove = async () => {
        if (!token || !selectedApprove) return;
        try {
            await taskServiceApi.putRejectApprove(token, selectedApprove);
            fetchApproves();
            setApproveDetails(null);
            setSelectedApprove(null);
            setImageUrl(null);
            setScore("");
            setAlert({ message: "Фотоотчёт успешно отклонён!", severity: "success" });
        } catch (error) {
            setAlert({ message: "Ошибка при отклонении фотоотчёта", severity: "error" });
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
                        <h2 className="text-base md:text-lg mb-3 md:mb-4">
                            Заявки на подтверждение выполнения задания
                        </h2>
                        <div className="space-y-2 md:space-y-3">
                            {approves.map((approve) => (
                                <div
                                    key={approve.ID}
                                    className="rounded-lg border p-2 md:p-3 hover:bg-neutral-50 cursor-pointer"
                                    onClick={() => handleApproveSelect(approve.ID)}
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <img
                                            src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=${approve.User.id}`}
                                            className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                                            alt="Фото пользователя"
                                        />
                                        <p className="text-sm md:text-base">
                                            {approve.User.name + " " + approve.User.surname}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:col-span-8 order-2">
                    {selectedApprove ? (
                        <div className="rounded-lg border bg-white p-4 md:p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                                <div className="flex items-center gap-3 md:gap-4 w-full">
                                    <img
                                        src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=2"
                                        className="h-12 w-12 md:h-16 md:w-16 rounded-full"
                                        alt="Фото пользователя"
                                    />
                                    <h2 className="text-lg md:text-xl">
                                        {`${approveDetails?.user.name || "Не указано"} ${
                                            approveDetails?.user.surname || ""
                                        }`.trim() || "Не указано"}
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                {approveDetails ? (
                                    <div className="rounded-lg border p-3 md:p-4 flex flex-col items-center">
                                        <h3 className="mb-3 text-center text-xl">Фото для подтверждения участия</h3>
                                        <div className="grid grid-cols-1 gap-4 w-full">
                                            <div className="text-center">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt="Фото подтверждения"
                                                        className="mt-4 rounded-lg shadow-md mx-auto"
                                                    />
                                                ) : (
                                                    <p>Загрузка фото...</p>
                                                )}
                                            </div>
                                            {maxScore !== null && (
                                                <div className="mt-4 text-center">
                                                    <p className="text-lg">
                                                        Максимальный балл за задание:{" "}
                                                        <span className="font-bold">{maxScore}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 w-full flex flex-col items-center gap-4">
                                            <input
                                                type="number"
                                                placeholder="Введите баллы"
                                                value={score}
                                                onChange={(e) => {
                                                    let val = e.target.value;
                                                    if (val === "") {
                                                        setScore("");
                                                        return;
                                                    }
                                                    const numericVal = Number(val);
                                                    if (numericVal < 0) {
                                                        setScore("0");
                                                    } else if (maxScore !== null && numericVal > maxScore) {
                                                        setScore(String(maxScore));
                                                    } else {
                                                        setScore(val);
                                                    }
                                                }}
                                                min="0"
                                                max={maxScore}
                                                className="border rounded p-3 w-60 text-center text-lg"
                                            />
                                            <div className="flex gap-4">
                                                <button
                                                    className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-800"
                                                    onClick={handleConfirmApprove}
                                                >
                                                    Принять
                                                </button>
                                                <button
                                                    className="rounded-lg border px-6 py-3 text-neutral-700 hover:bg-neutral-50"
                                                    onClick={handleRejectApprove}
                                                >
                                                    Отклонить
                                                </button>
                                            </div>
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
