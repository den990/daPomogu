import Pagination from "../layouts/pagination/pagination.jsx";
import Users from "../components/listUsersInOrganization/users.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider.js";
import { userServiceApi } from "../utils/api/user_service.js";
import { Alert, Snackbar } from "@mui/material";
import { Helmet } from 'react-helmet';
import {taskServiceApi} from "../utils/api/task_service";

function ListUsersInOrganization() {
    const { token, logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [countOfPages, setCountOfPages] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [alert, setAlert] = useState(null);

    const fetchUsers = useCallback(
        (page) => {
            userServiceApi
                .getUsersInOrganization(token, page)
                .then((data) => {
                    setUsers(data.data.data || []);
                    setCountOfPages(data.data.total_pages);
                })
                .catch(() => {
                    setAlert({ message: "Ошибка при загрузке пользователей", severity: "error" });
                    setUsers([]);
                });
        },
        [token]
    );

    useEffect(() => {
        fetchUsers(numberOfPage);
    }, [numberOfPage, fetchUsers]);

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    const handlePageChange = (page) => {
        setNumberOfPage(page);
    };

    const handleDetachUser = (id) => {
        if (token) {
            userServiceApi
                .putDetachUser(token, id, logout)
                .then(() => {
                    fetchUsers(numberOfPage);
                })
                .catch((error) => {
                    console.error("Ошибка при отреплении юзера", error);
                });
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Helmet>
                <title>Список волонтеров</title>
            </Helmet>
            <RoleHeader />
            <main className="flex-grow  bg-gray-50">
                <div className="container mx-auto px-4">
                    {users.length !== 0 ? (
                        <>
                            <Users users={users}
                                   handleDetachUser={handleDetachUser} />
                            {<Pagination
                                numberOfPageOut={numberOfPage}
                                countOfPages={countOfPages}
                                onPageChange={handlePageChange}
                            />}
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <span className="text-gray-500 text-lg">Нет прикрепленных пользователей</span>
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

export default ListUsersInOrganization;
