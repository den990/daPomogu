import { Link } from "react-router-dom";
import ROUTES from "../../constants/routes";

function Tasks() {
    return (
        <section id="tasks-grid" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {[1, 2, 3].map((taskId) => (
                <div 
                    key={taskId} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                    <div className="p-4 md:p-6">
                        {/* Заголовок и теги */}
                        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                            {taskId === 2 ? (
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
                                    {taskId === 1 ? 'Экология' : 'Помощь пожилым'}
                                </span>
                            )}
                        </div>

                        {/* Заголовок задания */}
                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                            {taskId === 1 && 'Уборка парка "Сокольники"'}
                            {taskId === 2 && 'Онлайн-уроки английского'}
                            {taskId === 3 && 'Доставка продуктов'}
                        </h3>

                        {/* Описание */}
                        <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-2">
                            {taskId === 1 && 'Требуются волонтеры для уборки территории парка. Инвентарь предоставляется.'}
                            {taskId === 2 && 'Требуются волонтеры для проведения онлайн-уроков английского языка для детей из детских домов.'}
                            {taskId === 3 && 'Требуются волонтеры для доставки продуктовых наборов пожилым людям.'}
                        </p>

                        {/* Организация */}
                        <div className="flex items-center mb-3 md:mb-4">
                            <img 
                                src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-${taskId}.jpg`} 
                                className="w-6 h-6 rounded-full mr-2" 
                                alt="Логотип организации" 
                            />
                            <span className="text-gray-600 text-sm md:text-base">
                                {taskId === 1 && 'Экологическое движение'}
                                {taskId === 2 && 'Образовательный центр'}
                                {taskId === 3 && 'Забота о старших'}
                            </span>
                        </div>

                        {/* Детали */}
                        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                                <img 
                                    className="w-3 h-3.5 md:w-4 md:h-4 mr-1.5" 
                                    src={require("../../images/calendar_grey.svg").default} 
                                    alt="Дата" 
                                />
                                <span>
                                    {taskId === 1 && '15 мая 2025'}
                                    {taskId === 2 && '20 мая 2025'}
                                    {taskId === 3 && '25 мая 2025'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <img 
                                    className="w-4 h-3 md:w-5 md:h-4 mr-1.5" 
                                    src={require("../../images/people_grey.svg").default} 
                                    alt="Участники" 
                                />
                                <span>
                                    {taskId === 1 && '12/20'}
                                    {taskId === 2 && '5/20'}
                                    {taskId === 3 && '8/15'}
                                </span>
                            </div>
                        </div>

                        {/* Кнопка */}
                        <Link 
                            to={ROUTES.TASK} 
                            className="block w-full py-2 bg-red-600 text-white rounded-lg text-center hover:bg-red-700 text-sm md:text-base"
                        >
                            Принять участие
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Tasks;