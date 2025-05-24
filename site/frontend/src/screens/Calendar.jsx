import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { taskServiceApi } from "../utils/api/task_service";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    getISODay
} from "date-fns";
import { ru } from "date-fns/locale";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import ROUTES from "../constants/routes";
import { Link } from "react-router";

export default function Calendar() {
    const { profile, token, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (!profile || !token) return;
        taskServiceApi
            .getMyOpenedTasks(token, 1, logout)
            .then((response) => {
                const { data } = response.data;
                setTasks(data || []);
            })
            .catch(() => {
                setTasks([]);
            });
    }, [profile, token]);

    const days = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate)
    });

    const getTasksForDay = (day) =>
        tasks.filter((task) => isSameDay(new Date(task.task_date), day));

    const changeMonth = (direction) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    // Пустые ячейки перед началом месяца (с понедельника)
    const startDay = getISODay(startOfMonth(currentDate)); // 1 (пн) - 7 (вс)
    const emptyCells = Array.from({ length: startDay - 1 });

    return (
        <div>
            <RoleHeader />
            <div className="p-4 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => changeMonth(-1)}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                        ←
                    </button>
                    <h2 className="text-xl font-bold text-red-700">
                        {format(currentDate, "LLLL yyyy", { locale: ru })}
                    </h2>
                    <button
                        onClick={() => changeMonth(1)}
                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                        →
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div key={i} className="font-semibold text-red-700 uppercase text-xs">
                            {format(new Date(2023, 0, i + 1), "EEEEE", { locale: ru })}
                        </div>
                    ))}

                    {/* Пустые ячейки */}
                    {emptyCells.map((_, index) => (
                        <div key={`empty-${index}`} className="p-2" />
                    ))}

                    {/* Дни месяца */}
                    {days.map((day) => {
                        const dayTasks = getTasksForDay(day);
                        return (
                            <div
                                key={day.toISOString()}
                                className={`border rounded-xl p-2 h-24 overflow-y-auto shadow-sm ${
                                    dayTasks.length ? "bg-red-100 border-red-500" : ""
                                }`}
                            >
                                <div className="text-sm font-medium text-gray-800">
                                    {format(day, "d")}
                                </div>
                                <div className="text-xs mt-1 text-red-700 space-y-1">
                                    {dayTasks.slice(0, 2).map((task) => (
                                        <Link
                                            key={task.id}
                                            to={ROUTES.TASK.replace(":taskId", task.id)}
                                            className="truncate text-red-700 hover:underline block"
                                        >
                                            {task.name}
                                        </Link>
                                    ))}
                                    {dayTasks.length > 2 && (
                                        <div className="text-red-500">+{dayTasks.length - 2} ещё</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
