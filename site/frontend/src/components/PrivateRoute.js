import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

function PrivateRoute() {
    const token = localStorage.getItem("token");
    const location = useLocation();

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
}

export default PrivateRoute;
