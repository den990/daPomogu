import { useContext, useEffect, useRef, useState } from "react";
import { taskServiceApi } from "../../utils/api/task_service";
import { AuthContext } from "../../context/AuthProvider";
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router";

function Content({ taskId, setIsPopUpVisible }) {
    const { token, id, logout } = useContext(AuthContext);
    const [infoAboutTask, setInfoAboutTask] = useState([]);
    const [, setHasPermission] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [alert, setAlert] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const task_id = Number(taskId);

    useEffect(() => {
        if (!token) return;
        taskServiceApi
            .getTaskById(token, task_id, logout)
            .then((data) => {
                setInfoAboutTask(data.data);
            })
            .catch(() => {
                setAlert({ message: "Ошибка при загрузке информации о задании", severity: "error" });
                setInfoAboutTask([]);
            });
    }, [token, task_id]);

    useEffect(() => {
        if (showCamera) {
            const requestCameraAccess = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.onloadedmetadata = () => {
                            videoRef.current.play();
                            setHasPermission(true);
                        };
                    }
                } catch (err) {
                    setAlert({ message: "Ошибка доступа к камере", severity: "error" });
                    console.error(err);
                }
            };
            requestCameraAccess();
        }
    }, [showCamera]);

    const formattedDate = infoAboutTask?.task_date
        ? new Date(infoAboutTask.task_date).toLocaleString("ru-RU", {
              dateStyle: "long",
              timeStyle: "short",
          })
        : "Не указано";

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas && video.videoWidth && video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL("image/png");
            setCapturedImage(imageDataUrl);
            setShowCamera(false);
        } else {
            setAlert({ message: "Видео не готово для захвата. Попробуйте позже.", severity: "error" });
        }
    };

    const dataURLtoBlob = (dataurl) => {
        const arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
            u8arr[i] = bstr.charCodeAt(i);
        }
        return new Blob([u8arr], { type: mime });
    };

    const handleSend = async () => {
        if (capturedImage) {
            try {
                const imageBlob = dataURLtoBlob(capturedImage);
                const response = await taskServiceApi.postSendPhotoReport(token, task_id, id, imageBlob, logout);

                console.log("Фотоотчет успешно отправлен:", response);
                setIsPopUpVisible(true);
            } catch (error) {
                console.error("Ошибка отправки фотоотчета:", error);
                setAlert({ message: "Ошибка отправки фотоотчета", severity: "error" });
            }
        } else {
            console.error("Нет фото для отправки");
            setAlert({ message: "Сначала сделайте фото", severity: "warning" });
        }
    };

    const handleClear = () => {
        setCapturedImage(null);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    return (
        <main id="main-content" className="container mx-auto px-4 pt-20 pb-8">
            <section id="task-info" className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg mb-4">{infoAboutTask?.name || "Не указано"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img
                                style={{ width: 14, height: 16 }}
                                src={require("../../images/calendar_red.svg").default}
                                alt="calendar"
                            />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                style={{ width: 12, height: 16 }}
                                src={require("../../images/placemark_red.svg").default}
                                alt="placemark"
                            />
                            <span>{infoAboutTask?.location || "Не указано"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                style={{ width: 14, height: 16 }}
                                src={require("../../images/person_red.svg").default}
                                alt="person"
                            />
                            <span>Координатор(ы): </span>
                            {infoAboutTask?.coordinators && infoAboutTask.coordinators.length > 0 ? (
                                infoAboutTask.coordinators.map((co, index) => (
                                    <span key={co.id}>
                                        <Link className="hover:underline" to={`/account-volunteer/${co.id}`}>
                                            {co.name} {co.surname}
                                        </Link>
                                        {index !== infoAboutTask.coordinators.length - 1 && ", "}
                                    </span>
                                ))
                            ) : (
                                <span>Не указано</span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section id="photo-upload" className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg mb-4">Добавление фотографий</h3>
                <div className="mb-4">
                    {showCamera ? (
                        <div>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full max-w-md border border-gray-300"
                            />
                            <canvas ref={canvasRef} style={{ display: "none" }} />
                            <button onClick={handleCapture} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                                Сделать фото
                            </button>
                        </div>
                    ) : (
                        <div
                            onClick={() => setShowCamera(true)}
                            className="cursor-pointer border-2 border-dashed border-neutral-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px]"
                        >
                            <img
                                style={{ width: 30, height: 30 }}
                                src={require("../../images/camera_red.svg").default}
                                alt="camera"
                            />
                            <span className="text-sm text-neutral-500">Сделать фото</span>
                        </div>
                    )}
                </div>
                {capturedImage && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Сделанное фото:</h3>
                        <img src={capturedImage} alt="Captured" className="mt-2 border border-gray-300" />
                    </div>
                )}
            </section>

            <section id="action-buttons" className="flex flex-col md:flex-row gap-4 justify-end">
                <button onClick={handleClear} className="px-4 py-2 bg-neutral-200 rounded-lg hover:bg-neutral-300">
                    Очистить форму
                </button>
                <button onClick={handleSend} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Отправить отчет
                </button>
            </section>

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
