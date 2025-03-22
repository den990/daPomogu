import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import GetRole from "../../utils/GetRole";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { taskServiceApi } from "../../utils/api/task_service";
import { useState } from "react";

function ButtonsPanel({task: initialTask}) {
    const { token } = useContext(AuthContext);
    let role = GetRole(token);
    const [task, setTask] = useState(initialTask);

    if (!task) {
        return <div>Загрузка...</div>;
    }

    let category = "";
    task.categories.map((cat) =>
        category += `${cat.name}`
    );

    let typeTask = (task.type == 1) ? "Закрытый" : "Открытый";

    const handleResponse = async (e) => {
        try {
            await taskServiceApi.postCreateResponse(token, task.id);
            setTask((prevTask) => ({
                ...prevTask,
                is_response: true,
            }));
        } catch (error) {
            console.error("Ошибка в создании отклика")
        }
    }

    return (
        <>
            <div className="col-span-1">
                <div id="task-actions" className="bg-white p-6 rounded-lg border sticky top-4">
                    {
                        (role === "volunteer")
                            ?
                                (task.is_response !== true)
                                    ?
                                        <button onClick={handleResponse} className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4">
                                            Принять участие
                                        </button>
                                    :
                                        (task.is_recorded !== true)
                                            ?
                                                <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4">
                                                    Отменить отклик
                                                </button>
                                            :
                                                <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4">
                                                    Отказаться от участия
                                                </button>
                            :
                                (task.status_id === 3)
                                    ?
                                       <>
                                           <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4">
                                                Завершить задание
                                            </button>
                                            <button className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center">
                                                <img style={{ width: 16, height: 16 }} src={ require("../../images/person_red.svg").default } alt="icon" />
                                                <Link to={ROUTES.CONFIRMATIONS_TASKS} style={{ paddingLeft: 10 }}>Проверить выполнение</Link>
                                            </button>
                                       </>
                                    :
                                        <button className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center">
                                            <img style={{ width: 16, height: 16 }} src={ require("../../images/person_red.svg").default } alt="icon" />
                                            <Link to={ROUTES.PHOTO_REPORT} style={{ paddingLeft: 10 }}>Принять участников</Link>
                                        </button>
                    }
                    <div className="pt-6 border-t">
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 16, height: 16 }} src={ require("../../images/category_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">{category}, {typeTask}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 20, height: 16 }} src={ require("../../images/people_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">Нужно {task.participants_count} волонтеров</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img style={{ width: 12, height: 16 }} src={ require("../../images/placemark_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">{task.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ButtonsPanel;