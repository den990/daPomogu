import { Alert, Snackbar } from "@mui/material";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import Content from "../components/organizationTasks/Content.jsx";
import Pagination from "../layouts/pagination/pagination.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider.js";
import { taskServiceApi } from "../utils/api/task_service.js";
import { Helmet } from 'react-helmet';

function Tasks() {
    const { token, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [countOfPages, setCountOfPages] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [alert, setAlert] = useState(null);
    const [activeTab, setActiveTab] = useState('opened');

    const fetchOpenedTasks = useCallback(
        (page) => {
            if (token) {
                taskServiceApi
                    .getMyOpenedTasks(token, page, logout)
                    .then((response) => {
                        const { data, total_pages } = response.data;
                        setTasks(data || []);
                        setCountOfPages(total_pages);
                    })
                    .catch(() => {
                        setAlert({ message: "Ошибка при загрузке заданий", severity: "error" });
                        setTasks([]);
                    });
            }
        },
        [token]
    );

    const fetchClosedTasks = useCallback(
        (page) => {
            if (token) {
                taskServiceApi
                    .getMyClosedTasks(token, page, logout)
                    .then((response) => {
                        const { data, total_pages } = response.data;
                        setTasks(data || []);
                        setCountOfPages(total_pages);
                    })
                    .catch(() => {
                        setAlert({ message: "Ошибка при загрузке заданий", severity: "error" });
                        setTasks([]);
                    });
            }
        },
        [token]
    );

    const handleDeleteTask = (id) => {
        if (token) {
            taskServiceApi
                .deleteTask(token, id, logout)
                .then(() => {
                    if (activeTab === 'opened') {
                        fetchOpenedTasks(numberOfPage);
                    } else {
                        fetchClosedTasks(numberOfPage);
                    }
                })
                .catch((error) => {
                    console.error("Ошибка при удалении задания", error);
                });
        }
    }

    useEffect(() => {
        if (activeTab === 'opened') {
            fetchOpenedTasks(numberOfPage);
        } else {
            fetchClosedTasks(numberOfPage);
        }
    }, [numberOfPage, activeTab, fetchOpenedTasks, fetchClosedTasks]);

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") return;
        setAlert(null);
    };

    const handlePageChange = (page) => {
        setNumberOfPage(page);
    };

    const handleOpenedTabClick = () => {
        setActiveTab('opened');
        setNumberOfPage(1);
    };

    const handleClosedTabClick = () => {
        setActiveTab('closed');
        setNumberOfPage(1);
    };

    return (
        <div>
            <Helmet>
                <title>Мои задания</title>
            </Helmet>
            <RoleHeader />
            <Content
                tasks={tasks}
                activeTab={activeTab}
                onOpenedTabClick={handleOpenedTabClick}
                onClosedTabClick={handleClosedTabClick}
                handleDeleteTask={handleDeleteTask}
            />
            {tasks.length !== 0 ? (
                <>
                    <Pagination
                        numberOfPageOut={numberOfPage}
                        countOfPages={countOfPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : <></>}
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
        </div>
    );
}

export default Tasks;
