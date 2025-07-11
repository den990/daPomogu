import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import ROUTES from "../constants/routes";

export const ProtectedRoute = ({ allowedRoles, redirectPath = "/login", children }) => {
    const { isAuthenticated, role, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    console.log(role);

    if (role === null) {
        return <Navigate
                    to={ROUTES.ERROR}
                    state={{ errorCode: 401, errorMessage: "Для посещения этой страницы Вам нужно авторизоваться." }}
                    replace
                />;
    }

    // Если не авторизован или роль не подходит
    if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role))) {
        return <Navigate
                    to={ROUTES.ERROR}
                    state={{ errorCode: 403, errorMessage: "Доступ запрещен. У вас нет прав для просмотра этой страницы." }}
                    replace
                />;
    }

    return children ? children : <Outlet />;
};