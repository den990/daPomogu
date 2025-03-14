import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { userServiceApi } from '../utils/api/user_service';

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  profile: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem('token', newToken);
    try {
      const decoded = jwtDecode(newToken);
      setRole(decoded.role);
    } catch (error) {
      console.error("Ошибка при декодировании токена:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setProfile(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      try {
        const decoded = jwtDecode(storedToken);
        setRole(decoded.role);
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token && role) {
      if (role === "organization") {
        userServiceApi.getMyOrganizationProfile(token)
          .then(data => setProfile(data))
          .catch(error => {
            console.error('Ошибка при получении профиля организации:', error);
          });
      } else if (role === "volunteer") {
        userServiceApi.getMyVolonteerProfile(token)
          .then(data => setProfile(data))
          .catch(error => {
            console.error('Ошибка при получении профиля волонтёра:', error);
          });
      } else if (role === "admin") {
        userServiceApi.getMyVolonteerProfile(token)
          .then(data => setProfile(data))
          .catch(error => {
            console.error('Ошибка при получении профиля админа:', error);
          });
      }
    }
  }, [token, role]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, profile, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
