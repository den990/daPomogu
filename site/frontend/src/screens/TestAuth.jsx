import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

function TestAuth() {
    const { token, logout } = useContext(AuthContext);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [error, setError] = useState("");
    const [capturedImage, setCapturedImage] = useState(null);
    let decodedToken = null;

    useEffect(() => {
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
                setError("Ошибка доступа к камере: " + err.message);
                console.error(err);
            }
        };

        requestCameraAccess();
    }, []);

    const handleCapture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas && video.videoWidth && video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL("image/png");
            console.log("Сделанное фото:", imageDataUrl);
            setCapturedImage(imageDataUrl);
        } else {
            console.error("Видео не готово для захвата. Попробуйте позже.");
        }
    };

    const handleDownload = () => {
        if (capturedImage) {
            const link = document.createElement("a");
            link.href = capturedImage;
            link.download = "photo.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (token) {
        try {
            decodedToken = jwtDecode(token);
        } catch (error) {
            console.error("Ошибка декодирования токена:", error);
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Проверка аутентификации</h1>
            {token ? (
                <div className="mb-6">
                    <p className="mb-4">
                        Токен выдан: <code>{token}</code>
                    </p>
                    {decodedToken && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Декодированная информация:</h2>
                            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(decodedToken, null, 2)}</pre>
                        </div>
                    )}
                    <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded">
                        Выйти
                    </button>
                </div>
            ) : (
                <p>Токен не найден. Пожалуйста, выполните вход.</p>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Камера</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div>
                    <video ref={videoRef} autoPlay playsInline className="w-full max-w-md border border-gray-300" />
                </div>
                <button onClick={handleCapture} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                    Сделать фото
                </button>
                <canvas ref={canvasRef} style={{ display: "none" }} />
                {capturedImage && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Сделанное фото:</h3>
                        <img src={capturedImage} alt="Captured" className="mt-2 border border-gray-300" />
                        <button onClick={handleDownload} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
                            Сохранить фото
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TestAuth;
