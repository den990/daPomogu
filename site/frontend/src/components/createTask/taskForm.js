import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function TaskForm() {
    return (
        <form id="task-form" className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="space-y-4 md:space-y-6">
                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название задания</label>
                    <input 
                        type="text" 
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                        focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
                    <select 
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                        focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                    >
                        <option>Выберите тип задания</option>
                        <option>Помощь пожилым</option>
                        <option>Экологическая акция</option>
                        <option>Социальная поддержка</option>
                        <option>Организация мероприятий</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea 
                        rows="3" 
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                        focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                    <div className="flex flex-wrap gap-2">
                        <input 
                            type="text" 
                            className="flex-grow min-w-[200px] px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                            focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                            placeholder="Адрес" 
                        />
                        <button 
                            type="button" 
                            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 flex-shrink-0"
                        >
                            <img 
                                className="w-3 h-4 md:w-4 md:h-5" 
                                src={require("../../images/placemark_grey.svg").default} 
                                alt="placemark" 
                            />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                        <input 
                            type="date" 
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                            focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                        <input 
                            type="time" 
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                            focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Количество участников</label>
                    <input 
                        type="number" 
                        min="1" 
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                        focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Координаторы</label>
                    <div className="flex flex-wrap gap-2">
                        <select 
                            className="flex-grow min-w-[150px] px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                            focus:ring-red-500 focus:border-red-500 text-sm md:text-base"
                        >
                            <option>Выберите координатора</option>
                        </select>
                        <button 
                            type="button" 
                            className="px-2 md:px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex-shrink-0"
                        >
                            <img 
                                className="w-3 h-4 md:w-4 md:h-5" 
                                src={require("../../images/add_red.svg").default} 
                                alt="add" 
                            />
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Категории</label>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs md:text-sm 
                            cursor-pointer hover:bg-red-100">
                            Экология
                        </span>
                        <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs md:text-sm 
                            cursor-pointer hover:bg-red-100">
                            Образование
                        </span>
                        <span className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs md:text-sm 
                            cursor-pointer hover:bg-red-100">
                            Спорт
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs md:text-sm 
                            cursor-pointer hover:bg-gray-200 flex items-center gap-1">
                            <img 
                                className="w-3 h-3 md:w-4 md:h-4" 
                                src={require("../../images/add_dark.svg").default} 
                                alt="add" 
                            />
                            Добавить
                        </span>
                    </div>
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Максимальное количество баллов</label>
                    <input 
                        type="number" 
                        min="0" 
                        className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-md 
                        focus:ring-red-500 focus:border-red-500 text-sm md:text-base" 
                    />
                </div>

                <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 pt-6">
                    <Link 
                        to={ROUTES.ACCOUNT_ORGANIZATION} 
                        className="px-4 md:px-6 py-2 border border-gray-300 rounded-md text-gray-700 
                        hover:bg-gray-50 text-center text-sm md:text-base"
                    >
                        Отмена
                    </Link>
                    <button 
                        type="submit" 
                        className="px-4 md:px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                        text-sm md:text-base"
                    >
                        Создать задание
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TaskForm;