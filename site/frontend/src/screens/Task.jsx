import Footer from "../layouts/Footer.jsx";
import Info from "../components/task/info.jsx";
import ButtonsPanel from "../components/task/buttonsPanel.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider.js";
import { taskServiceApi } from "../utils/api/task_service.js";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router";
import { userServiceApi } from "../utils/api/user_service.js";
import { Helmet } from 'react-helmet';
import ROUTES from "../constants/routes";

function Task() {
    const { token, logout } = useContext(AuthContext);
    const [task, setTask] = useState(null);
    const { taskId } = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        taskServiceApi
            .getTaskById(token, taskId, logout)
            .then((data) => {
                setTask(data.data);
                console.log(data.data);
                userServiceApi.getAvatarOrganizationByID(data.data.organization_id, logout)
                    .then((blob) => {
                        const url = URL.createObjectURL(blob);
                        setImageUrl(url);
                    })
                    .catch(() => {
                        console.log({ message: "Ошибка при загрузке фото организации", severity: "error" });
                    });
            })
            .catch((error) => {
                navigate(ROUTES.ERROR);
            });
    }, [token, taskId]);

    if (!task) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <RoleHeader />
            <Helmet>
                <title>{task.name}</title>
            </Helmet>
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Info task={task} imageUrl={imageUrl} />
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
