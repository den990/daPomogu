import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { taskServiceApi } from "../../utils/api/task_service";
import { useState } from "react";

function ButtonsPanel({ task: initialTask }) {
    const { token, id, role } = useContext(AuthContext);
    const [task, setTask] = useState(initialTask);

    if (!task) {
        return <div>Загрузка...</div>;
    }

    let category = "";
    task.categories.map((cat) => (category += `${cat.name}, `));

    let typeTask = task.type_id === 2 ? "Закрытый" : "Открытый";
    let taskRole = task.role_in_task;

    const handleResponse = async (e) => {
        try {
            await taskServiceApi.postCreateResponse(token, task.id);
            setTask((prevTask) => ({
                ...prevTask,
                is_response: true,
            }));
        } catch (error) {
            console.error("Ошибка в создании отклика");
        }
    };

    const handleReject = async (e) => {
        try {
            await taskServiceApi.deleteResponse(token, task.id, id);
            setTask((prevTask) => ({
                ...prevTask,
                is_response: false,
            }));
        } catch (error) {
            console.error("Ошибка в отмене отклика");
        }
    };

    const handleCancel = async (e) => {
        try {
            console.log(id);
            await taskServiceApi.deleteResponse(token, task.id, id);
            setTask((prevTask) => ({
                ...prevTask,
                is_recorded: false,
            }));
        } catch (error) {
            console.error("Ошибка в отказе от участия");
        }
    };

    const handleCompleteTask = async (e) => {
        try {
            console.log(id);
            await taskServiceApi.putCompleteTask(token, task.id);
            setTask((prevTask) => ({
                ...prevTask,
                status_id: 1,
            }));
        } catch (error) {
            console.error("Ошибка в завершении задания");
        }
    };

    console.log(taskRole);

    return (
        <>
            <div className="col-span-1">
                <div id="task-actions" className="bg-white p-6 rounded-lg border sticky top-4">
                    {
                        !(role === "admin" || (role === "organization" && taskRole !== "owner"))
                        ?
                            taskRole === "user" || taskRole === "participant"
                            ?
                                (
                                    task.is_response !== true && task.is_recorded !== true 
                                    ? 
                                        (
                                            <button
                                                onClick={handleResponse}
                                                className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4"
                                            >
                                                Принять участие
                                            </button>
                                        ) 
                                    :   task.is_recorded !== true
                                        ?
                                            (
                                                <button
                                                    onClick={handleReject}
                                                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4"
                                                >
                                                    Отменить отклик
                                                </button>
                                            ) 
                                        :
                                            (
                                                (task.status_id === 4) 
                                                ?
                                                    <button
                                                        onClick={handleCancel}
                                                        className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4"
                                                    >
                                                        Отказаться от участия
                                                    </button>
                                                :
                                                    (task.points !== null) 
                                                    ?
                                                        <span className="text-neutral-700">Баллы: {task.points}/{task.max_score}</span>
                                                    :
                                                        <Link
                                                            className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center"
                                                            to={ROUTES.PHOTO_REPORT.replace(":taskId", task.id)}
                                                            style={{ paddingLeft: 10 }}
                                                        >
                                                            <img className="w-4 h-4" src={require("../../images/camera_red.svg").default} alt="camera" />
                                                            <span style={{paddingLeft: 10}}>Отправить фотоотчёт</span>
                                                        </Link>
                                            )
                                )
                            :
                                task.status_id === 3 || task.status_id === 1
                                ?
                                    taskRole === "owner"
                                    ?
                                        (
                                            <>
                                                <Link
                                                    className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center"
                                                    to={ROUTES.CONFIRMATIONS_TASKS.replace(":taskId", task.id)}
                                                >
                                                    <img
                                                        style={{ width: 16, height: 16 }}
                                                        src={require("../../images/person_red.svg").default}
                                                        alt="icon"
                                                    />
                                                    <span
                                                        style={{ paddingLeft: 10 }}
                                                    >
                                                        Проверить выполнение
                                                    </span>
                                                </Link>
                                            </>
                                        )
                                    :
                                        (
                                        
                                            (task.status_id !== 1)
                                            ?
                                                <button
                                                    className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4"
                                                    onClick={handleCompleteTask}
                                                >
                                                    Завершить задание
                                                </button>
                                            :   
                                                <Link
                                                    to={ROUTES.CONFIRMATIONS_TASKS.replace(":taskId", task.id)}
                                                    className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center"
                                                >
                                                    <img
                                                        style={{ width: 16, height: 16 }}
                                                        src={require("../../images/person_red.svg").default}
                                                        alt="icon"
                                                    />
                                                    <span
                                                        style={{ paddingLeft: 10 }}
                                                    >
                                                        Проверить выполнение
                                                    </span>
                                                </Link>
                                        )
                                :
                                    (
                                        <>
                                            <Link
                                                to={ROUTES.CONFIRMATIONS_RESPONSES.replace(":taskId", task.id)}
                                                className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center"
                                            >
                                                <img
                                                    style={{ width: 16, height: 16 }}
                                                    src={require("../../images/person_red.svg").default}
                                                    alt="icon"
                                                />
                                                <span
                                                    style={{ paddingLeft: 10 }}
                                                >
                                                    Принять участников
                                                </span>
                                            </Link>
                                        </>
                                    )
                        :
                        <></>
                    }
                    <div className={!(role === "admin" || (role === "organization" && taskRole !== "owner")) ? `pt-6 mt-6 border-t` : ``}>
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                style={{ width: 16, height: 16 }}
                                src={require("../../images/category_grey.svg").default}
                                alt="icon"
                            />
                            <span className="text-neutral-700">
                                {category}
                                {typeTask}
                            </span>
                        </div>
                        {
                            (task.status_id === 4)
                            ?    
                                <div className="flex items-center gap-2 mb-4">
                                    <img
                                        style={{ width: 20, height: 16 }}
                                        src={require("../../images/people_grey.svg").default}
                                        alt="icon"
                                    />
                                    <span className="text-neutral-700">Нужно {task.participants_count - task.recorded_count} волонтеров</span>
                                </div>
                            :   <></>
                        }
                        <div className="flex items-center gap-2">
                            <img
                                style={{ width: 12, height: 16 }}
                                src={require("../../images/placemark_grey.svg").default}
                                alt="icon"
                            />
                            <span className="text-neutral-700">{task.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ButtonsPanel;
