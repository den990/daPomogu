import { useState } from "react";

export default function useAuth() {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setError(null);
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error("Ошибка логина");
            }
            const data = await response.json();
            setToken(data.token);
            localStorage.setItem("token", data.token);
            return data.token;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return { token, login, logout, error };
}
