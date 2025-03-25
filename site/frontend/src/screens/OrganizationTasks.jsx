import { Alert, Snackbar } from "@mui/material";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import Content from "../components/organizationTasks/Content.jsx";
import Pagination from "../layouts/pagination/pagination.jsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider.js";
import { taskServiceApi } from "../utils/api/task_service.js";

function Tasks() {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [countOfPages, setCountOfPages] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [alert, setAlert] = useState(null);
    const [activeTab, setActiveTab] = useState('opened');

    const fetchOpenedTasks = useCallback(
        (page) => {
            if (token) {
                taskServiceApi
                    .getMyOpenedTasks(token, page)
                    .then((response) => {
                        const { rows, totalPages } = response.data;
                        setTasks(rows || []);
                        setCountOfPages(totalPages);
                        console.log(response.data);
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
                    .getMyClosedTasks(token, page)
                    .then((response) => {
                        const { rows, totalPages } = response.data;
                        setTasks(rows || []);
                        setCountOfPages(totalPages);
                    })
                    .catch(() => {
                        setAlert({ message: "Ошибка при загрузке заданий", severity: "error" });
                        setTasks([]);
                    });
            }
        },
        [token]
    );

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
            <RoleHeader />
            {tasks.length !== 0 ? (
                <>
                    <Content
                        tasks={tasks}
                        activeTab={activeTab}
                        onOpenedTabClick={handleOpenedTabClick}
                        onClosedTabClick={handleClosedTabClick}
                    />
                    <Pagination
                        numberOfPageOut={numberOfPage}
                        countOfPages={countOfPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <span className="text-gray-500 text-lg">
                        {activeTab === 'opened' 
                                ? "Нет текущих заданий" 
                                : "Нет завершенных заданий"}
                    </span>
                </div>
            )}
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
