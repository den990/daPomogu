import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import ROUTES from "../../constants/routes";
import { AuthContext } from "../../context/AuthProvider";

function PrivateRoute() {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
    );
}

export default PrivateRoute;
