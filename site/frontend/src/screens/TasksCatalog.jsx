import Tasks from "../components/tasksCatalog/tasks.jsx";
import Pagination from "../layouts/pagination/pagination.jsx";
import Footer from "../layouts/Footer.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { taskServiceApi } from "../utils/api/task_service";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthProvider";

function TasksCatalog() {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [countOfPages, setCountOfPages] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(1);

    const fetchTasks = useCallback(
        (page) => {
            taskServiceApi
                .getAllTasks(token, page)
                .then((data) => {
                    setTasks(data.data || []);
                    console.log(data);
                    setCountOfPages(data.total_pages);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке всех заданий: ", error);
                    setTasks([]);
                });
        },
        [token]
    );

    useEffect(() => {
        fetchTasks(numberOfPage);
    }, [numberOfPage, fetchTasks]);

    const handlePageChange = (page) => {
        setNumberOfPage(page);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <RoleHeader />
            <main className="flex-grow pt-20 pb-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {tasks.length !== 0 ? (
                        <>
                            <Tasks tasks={tasks} />
                            <Pagination
                                numberOfPageOut={numberOfPage}
                                countOfPages={countOfPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <span className="text-gray-500 text-lg">Нет доступных заданий</span>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default TasksCatalog;
