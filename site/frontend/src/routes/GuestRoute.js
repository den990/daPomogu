import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

export const GuestRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children ? children : <Outlet />;
};