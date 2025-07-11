import { useState, useEffect } from "react";
import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import { userServiceApi } from "../../utils/api/user_service.js";

function Tasks({ tasks }) {
    const [avatars, setAvatars] = useState({});

    useEffect(() => {
        const orgIds = [...new Set(tasks.map((task) => task.tasks.organization_id))];

        orgIds.forEach((orgId) => {
            if (!avatars[orgId]) {
                userServiceApi.getAvatarOrganizationByID(orgId)
                    .then((blob) => {
                        const url = URL.createObjectURL(blob);
                        setAvatars((prev) => ({
                            ...prev,
                            [orgId]: url,
                        }));
                    })
                    .catch(() => {
                        console.log({ message: `Ошибка при загрузке фото организации ${orgId}`, severity: "error" });
                    });
            }
        });
    }, [tasks]);

    return (
        <section id="tasks-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {tasks.map((task, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="p-4 md:p-6 flex flex-col h-full">
                        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                            {task.categories.map((category, idx) => (
                                <span key={idx} className="px-2 py-1 bg-red-500 text-white rounded-full text-xs md:text-sm whitespace-nowrap">
                                    {category.name}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                            <Link className="hover:underline" to={`${ROUTES.TASK.replace(":taskId", task.tasks.id)}`}>
                                {task.tasks.name}
                            </Link>
                        </h3>

                        <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2">
                            {task.tasks.description}
                        </p>

                        <div className="mt-auto">
                            <div className="flex items-center mb-3 md:mb-4">
                                <img
                                    src={avatars[task.tasks.organization_id] || "/default-avatar.png"}
                                    className="w-6 h-6 rounded-full mr-2"
                                    alt="Логотип организации"
                                />
                                <span className="text-gray-600 text-sm md:text-base">{task.organization_name}</span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                    <img
                                        className="w-3 h-3.5 md:w-4 md:h-4 mr-1.5"
                                        src={require("../../images/calendar_grey.svg").default}
                                        alt="Дата"
                                    />
                                    <span>
                                        {new Date(task.tasks.task_date).toLocaleDateString("ru-RU", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        className="w-4 h-3 md:w-5 md:h-4 mr-1.5"
                                        src={require("../../images/people_grey.svg").default}
                                        alt="Участники"
                                    />
                                    <span>{`${task.count_applying}/${task.tasks.participants_count}`}</span>
                                </div>
                            </div>
                            <Link
                                to={`${ROUTES.TASK.replace(":taskId", task.tasks.id)}`}
                                className="block w-full py-2 bg-red-600 text-white rounded-lg text-center hover:bg-red-700 text-sm md:text-base"
                            >
                                Принять участие
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Tasks;
