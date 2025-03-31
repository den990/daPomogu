import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { taskServiceApi } from "../../utils/api/task_service";

function FeaturedProjects() {
    const { token } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = useCallback(
        () => {
            taskServiceApi
                .getAllTasks(token, 1)
                .then((data) => {
                    setTasks(data.data || []);
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке всех заданий: ", error);
                    setTasks([]);
                });
        },
        [token]
    );
    
    useEffect(() => {
        fetchTasks(1);
    }, [fetchTasks]);

    return (
        <section
            id="featured-projects"
            className="py-8 md:py-16 bg-gray-50"
            style={{ position: "relative", zIndex: 20 }}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
                    Актуальные проекты
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {
                        tasks.map((task) => 
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                                <div className="p-4 md:p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{task.tasks.name}</h3>
                                    <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                                        {task.tasks.description}
                                    </p>
                                    <div className="mt-auto space-y-3">
                                        <div className="text-red-600 text-sm md:text-base text-center">
                                            Требуется: {task.tasks.participants_count - task.count_applying} человек
                                        </div>
                                        <Link
                                            to={`${ROUTES.TASK.replace(":taskId", task.tasks.id)}`}
                                            className="w-full md:w-3/4 mx-auto block px-4 py-2 bg-red-600 text-white rounded-lg 
                                            hover:bg-red-700 whitespace-nowrap text-center text-sm md:text-base"
                                        >
                                            Участвовать
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default FeaturedProjects;
