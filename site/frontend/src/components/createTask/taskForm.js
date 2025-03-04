function taskForm() {
    return (
        <form id="task-form" className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
                <div id="task-name-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название задания</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                </div>
                <div id="task-type-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                        <option>Выберите тип задания</option>
                        <option>Помощь пожилым</option>
                        <option>Экологическая акция</option>
                        <option>Социальная поддержка</option>
                        <option>Организация мероприятий</option>
                    </select>
                </div>
                <div id="description-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"></textarea>
                </div>
                <div id="location-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                    <div className="flex space-x-4">
                        <input type="text" className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Введите адрес" />
                        <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                            <img style={{width: 12, height: 16}} src={require("../../images/placemark_grey.svg").default} alt="placemark" />
                        </button>
                    </div>
                </div>
                <div id="datetime-field" className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                        <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                        <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                    </div>
                </div>
                <div id="participants-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Количество участников</label>
                    <input type="number" min="1" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                </div>
                <div id="coordinators-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Координаторы</label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <select className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                                <option>Выберите координатора</option>
                            </select>
                            <button type="button" className="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                                <img style={{width: 14, height: 24}} src={require("../../images/add_red.svg").default} alt="add" />
                            </button>
                        </div>
                    </div>
                </div>
                <div id="categories-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Категории</label>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm cursor-pointer hover:bg-red-100">Экология</span>
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm cursor-pointer hover:bg-red-100">Образование</span>
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm cursor-pointer hover:bg-red-100">Спорт</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm cursor-pointer hover:bg-gray-200 flex gap-2">
                            <img style={{width: 13, height: 17}} src={require("../../images/add_dark.svg").default} alt="add" /> 
                            Добавить
                        </span>
                    </div>
                </div>
                <div id="points-field" className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Максимальное количество баллов</label>
                    <input type="number" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                </div>
                <div id="form-actions" className="flex items-center justify-end space-x-4 pt-6">
                    <button type="button" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Отмена
                    </button>
                    <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Создать задание
                    </button>
                </div>
            </div>
        </form>
    );
}

export default taskForm;