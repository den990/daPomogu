// src/screens/EditTask.jsx
import {useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router";
import ROUTES from "../constants/routes";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import FormHeader from "../components/createTask/formHeader";
import TaskForm from "../components/createTask/taskForm";
import PopUp from "../layouts/popUp/PopUp";
import { taskServiceApi } from "../utils/api/task_service";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {AuthContext} from "../context/AuthProvider";

export default function EditTask() {
    const { token, logout } = useContext(AuthContext);
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState(null);
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    useEffect(() => {
        taskServiceApi
            .getTaskById(token, taskId, logout)
            .then((res) => setTaskData(res.data))
            .catch(() => navigate(ROUTES.ORGANIZATION_TASKS));
    }, [taskId, navigate]);

    if (!taskData) return <div>Загрузка...</div>;

    return (
        <>
            <Helmet><title>Редактировать задание</title></Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`h-full text-base-content ${isPopUpVisible ? "blurred" : ""}`}
            >
                <div className="bg-gray-50 min-h-screen">
                    <RoleHeader />
                    <main className="container mx-auto px-4 py-6 md:py-8">
                        <div className="max-w-full md:max-w-3xl mx-auto">
                            <FormHeader isNew={false}>
                            </FormHeader>
                            <TaskForm
                                initialData={taskData}
                                isEditMode
                                onSuccess={() => setIsPopUpVisible(true)}
                            />
                        </div>
                    </main>
                </div>
            </motion.div>
            <PopUp
                isVisible={isPopUpVisible}
                onClose={() => {
                    setIsPopUpVisible(false);
                    navigate(ROUTES.ORGANIZATION_TASKS);
                }}
                mainMessage="Задание успешно обновлено!"
                buttonMessage="К моим заданиям"
                link={ROUTES.ORGANIZATION_TASKS}
            />
        </>
    );
}
