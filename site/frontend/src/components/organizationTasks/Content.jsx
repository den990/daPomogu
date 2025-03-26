import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function Content({ tasks, activeTab, onOpenedTabClick, onClosedTabClick, handleDeleteTask }) {
    const statuses = {
        1: "Выполнено",
        2: "Не выполнено",
        3: "В работе",
        4: "Не начато",
    };

    const getStatusClasses = (statusId) => {
        switch (statusId) {
            case 1:
                return "bg-green-100 text-green-600";
            case 2:
                return "bg-red-100 text-red-600";
            case 3:
                return "bg-yellow-100 text-yellow-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div id="tasks-section" className="md:col-span-2 mx-2 md:mx-0 md:p-8">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold">Мои задания</h3>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        <button
                            onClick={onOpenedTabClick}
                            className={`px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg hover:bg-red-100 min-w-max ${
                                activeTab === 'opened'
                                    ? 'text-red-600 bg-red-50'
                                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                            }`}>
                            Текущие
                        </button>
                        <button
                            onClick={onClosedTabClick}
                            className={`px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg hover:bg-gray-100 min-w-max ${
                                activeTab === 'closed'
                                    ? 'text-red-600 bg-red-50'
                                    : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                            }`}>
                            Завершенные
                        </button>
                    </div>
                </div>
                <div id="current-tasks" className="space-y-6">
                    {tasks.length !== 0 ? tasks.map((task) => (
                        <div key={task.id} className="border rounded-lg p-3 md:p-4">
                            <div className="flex justify-between items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <Link
                                        className="font-semibold text-base md:text-lg hover:underline"
                                        to={`${ROUTES.TASK.replace(":taskId", task.id)}`}
                                    >
                                        {task.name}
                                    </Link>
                                    <div className="mt-2 md:mt-3 flex items-center">
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${getStatusClasses(task.status_id)}`}
                                        >
                                            {statuses[task.status_id] || "Неизвестный статус"}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                        to={`${ROUTES.TASK.replace(":taskId", task.id)}`}
                                    >
                                        Открыть
                                    </Link>
                                </div>
                                <button onClick={() => handleDeleteTask(task.id)}>
                                    <img
                                        className="w-4 h-4"
                                        src={require("../../images/delete_red.svg").default}
                                        alt="delete"
                                    />
                                </button>
                            </div>
                        </div>
                    )) : <div className="flex justify-center items-center h-64">
                    <span className="text-gray-500 text-lg">
                        {activeTab === 'opened' 
                                ? "Нет текущих заданий" 
                                : "Нет завершенных заданий"}
                    </span>
                </div>}
                </div>
            </div>
        </div>
    );
}

export default Content;
