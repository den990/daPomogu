import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { jwtDecode } from "jwt-decode";

function TestAuth() {
    const { token, logout } = useContext(AuthContext);
    let decodedToken = null;

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
            <div>
            <p className="mb-4">
                Токен выдан: <code>{token}</code>
            </p>
            {decodedToken && (
                <div className="mb-4">
                <h2 className="text-lg font-semibold">Декодированная информация:</h2>
                <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(decodedToken, null, 2)}
                </pre>
                </div>
            )}
            <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded"
            >
                Выйти
            </button>
            </div>
        ) : (
            <p>Токен не найден. Пожалуйста, выполните вход.</p>
        )}
        </div>
    );
}

export default TestAuth;
