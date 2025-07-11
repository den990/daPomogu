import Pagination from "../layouts/pagination/pagination.jsx";
import Organizations from "../components/listOrganization/organizations.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider.js";
import { userServiceApi } from "../utils/api/user_service.js";
import { Alert, Snackbar } from "@mui/material";
import { Helmet } from 'react-helmet';

function ListOrganization() {
    const { token, logout } = useContext(AuthContext);
    const [organizations, setOrganizations] = useState([]);
    const [countOfPages, setCountOfPages] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [alert, setAlert] = useState(null);

    const fetchOrganizations = useCallback(
        (page) => {
            userServiceApi
                .getAcceptedOrganizations(token, page, logout)
                .then((data) => {
                    setOrganizations(data.data.data || []);
                    setCountOfPages(data.data.total_pages);
                })
                .catch(() => {
                    setAlert({ message: "Ошибка при загрузке организаций", severity: "error" });
                    setOrganizations([]);
                });
        },
        [token]
    );

    useEffect(() => {
        fetchOrganizations(numberOfPage);
    }, [numberOfPage, fetchOrganizations]);

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    const handlePageChange = (page) => {
        setNumberOfPage(page);
    };

    console.log(organizations);

    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <title>Список организаций</title>
            </Helmet>
            <RoleHeader />
            <main className="flex-grow  bg-gray-50">
                <div className="container mx-auto px-4">
                    {organizations.length !== 0 ? (
                        <>
                            <Organizations organizations={organizations} />
                            <Pagination
                                numberOfPageOut={numberOfPage}
                                countOfPages={countOfPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <span className="text-gray-500 text-lg">Нет доступных организаций</span>
                        </div>
                    )}
                </div>

                {alert && (
                    <Snackbar
                        open={true}
                        autoHideDuration={4000}
                        onClose={handleCloseAlert}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
                            {alert.message}
                        </Alert>
                    </Snackbar>
                )}
            </main>
        </div>
    );
}

export default ListOrganization;
