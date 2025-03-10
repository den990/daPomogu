// src/components/PrivateRoute.js (React Router v6)
import React from "react";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
    const token = localStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
