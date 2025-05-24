import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { userServiceApi } from "../utils/api/user_service";

export const AuthContext = createContext({
    isAuthenticated: false,
    token: null,
    profile: null,
    role: null,
    login: () => {},
    logout: () => {},
    updateProfile: () => {},
    id: null,
});

export const AuthProvider = ({ children }) => {
    // Пытаемся загрузить токен из localStorage при инициализации
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    

    const login = (newToken) => {
        localStorage.setItem("token", newToken); // Сохраняем в localStorage
        setToken(newToken);
        setIsAuthenticated(true);
        localStorage.setItem("token", newToken);
        try {
            const decoded = jwtDecode(newToken);
            setId(decoded.user_id);
            setRole(decoded.role);
        } catch (error) {
            console.error("Ошибка при декодировании токена:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
        setProfile(null);
        setRole(null);
        setId(null);
        localStorage.removeItem("token");
        return Promise.resolve();
    };

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
    };

    const updateImage = (imageUrl) => {
        setImageUrl(imageUrl);
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            try {
                const decoded = jwtDecode(storedToken);
                setRole(decoded.role);
                setId(decoded.user_id);
            } catch (error) {
                console.error("Ошибка при декодировании токена:", error);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!(token && role)) return;
        if (role === "organization") {
            userServiceApi.getMyOrganizationAvatar(token, logout)
                .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                })
                .catch(() => {
                    console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
                });
            userServiceApi
                .getMyOrganizationProfile(token, logout)
                .then((data) => setProfile(data.data))
                .catch((error) => {
                    console.error("Ошибка при получении профиля организации:", error);
                });
        } else if (role === "volunteer") {
            userServiceApi.getMyAvatar(token, logout)
                .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                })
                .catch(() => {
                    console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
                });
            userServiceApi
                .getMyVolonteerProfile(token)
                .then((data) => {setProfile(data.data)})
                .catch((error) => {
                    console.error("Ошибка при получении профиля волонтёра:", error);
                });
        } else if (role === "admin") {
            userServiceApi.getMyAvatar(token, logout)
                .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                })
                .catch(() => {
                    console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
                });
            userServiceApi
                .getMyVolonteerProfile(token)
                .then((data) => {setProfile(data.data)})
                .catch((error) => {
                    console.error("Ошибка при получении профиля админа:", error);
                });
        }
    }, [token, role]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, profile, role, login, logout, updateProfile, loading, id, imageUrl, updateImage }}>
            {children}
        </AuthContext.Provider>
    );
};
