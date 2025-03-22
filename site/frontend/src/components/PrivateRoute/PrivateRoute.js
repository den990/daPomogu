import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import ROUTES from "../../constants/routes";
import { AuthContext } from "../../context/AuthProvider";
import { ROLE_ROUTES } from "../../constants/roleRoutes";

function PrivateRoute() {
    const { isAuthenticated, loading, role } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    const accessibleRoutes = ROLE_ROUTES[role];
    const routeRegex = (route) => new RegExp(`^${route.replace(/:[^\s/]+/g, "[^/]+")}$`);
    const isAccessible = accessibleRoutes.some((route) => routeRegex(route).test(location.pathname));

    if (!isAccessible) {
        return (
            <Navigate
                to={ROUTES.ERROR}
                state={{ errorCode: 403, errorMessage: "Доступ запрещен. У вас нет прав для просмотра этой страницы." }}
                replace
            />
        );
    }

    return <Outlet />;
}

export default PrivateRoute;
