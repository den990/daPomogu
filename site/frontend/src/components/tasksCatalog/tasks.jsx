import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function Tasks({ tasks }) {
    return (
        <section id="tasks-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {
                tasks.map((task, i) => (
                    <div 
                        key={i} 
                        className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="p-4 md:p-6">
                            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                                {task === 2 ? (
                                    <>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm">
                                            Образование
                                        </span>
                                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs md:text-sm whitespace-nowrap">
                                            Задание организации
                                        </span>
                                    </>
                                ) : (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm">
                                        {task === 1 ? 'Экология' : 'Помощь пожилым'}
                                    </span>
                                )}
                            </div>
    
                            <h3 className="text-lg md:text-xl font-semibold mb-2">
                                {task.name}
                            </h3>
    
                            <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2">
                                {task.description}
                            </p>
    
                            <div className="flex items-center mb-3 md:mb-4">
                                <img 
                                    src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg`} 
                                    className="w-6 h-6 rounded-full mr-2" 
                                    alt="Логотип организации" 
                                />
                                <span className="text-gray-600 text-sm md:text-base">
                                    {task.organization_id}
                                </span>
                            </div>
    
                            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                    <img 
                                        className="w-3 h-3.5 md:w-4 md:h-4 mr-1.5" 
                                        src={require("../../images/calendar_grey.svg").default} 
                                        alt="Дата" 
                                    />
                                    <span>
                                        {new Date(task.task_date).toLocaleDateString("ru-RU", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric"
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <img 
                                        className="w-4 h-3 md:w-5 md:h-4 mr-1.5" 
                                        src={require("../../images/people_grey.svg").default} 
                                        alt="Участники" 
                                    />
                                    <span>
                                        {`0/${task.participants_count}`}
                                    </span>
                                </div>
                            </div>
    
                            <Link 
                                to={ROUTES.TASK} 
                                className="block w-full py-2 bg-red-600 text-white rounded-lg text-center hover:bg-red-700 text-sm md:text-base"
                            >
                                Принять участие
                            </Link>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}

export default Tasks;