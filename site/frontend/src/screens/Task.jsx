import Footer from "../layouts/Footer.jsx";
import Info from "../components/task/info.jsx";
import ButtonsPanel from "../components/task/buttonsPanel.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.js";
import { taskServiceApi } from "../utils/api/task_service.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Task() {
    const { token } = useContext(AuthContext);
    const [task, setTask] = useState(null);
    const { taskId } = useParams();

    useEffect(() => {
        taskServiceApi
            .getTaskById(token, taskId)
            .then((data) => {
                setTask(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке задания:", error);
            });
    }, [token, taskId]);

    if (!task) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <RoleHeader />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Info task={task} />
                        </div>
                        <div className="lg:col-span-1">
                            <ButtonsPanel task={task} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Task;
