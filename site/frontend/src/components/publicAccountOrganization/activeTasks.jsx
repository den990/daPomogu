import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function ActiveTasks({ tasks }) {
    return (
        <section id="active-tasks" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Активные задания</h3>
            <div className="space-y-4">
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <Link
                                        to={`${ROUTES.TASK.replace(":taskId", task.id)}`}
                                        className="font-semibold text-gray-900 hover:underline"
                                    >
                                        {task.name}
                                    </Link>
                                    <p className="text-gray-600 text-sm mt-1">
                                        Дата начала:{" "}
                                        {new Date(task.task_date).toLocaleDateString("ru-RU", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                        to={`${ROUTES.TASK.replace(":taskId", task.id)}`}
                                    >
                                        Открыть
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Нет активных заданий</p>
                )}
            </div>
        </section>
    );
}

export default ActiveTasks;
