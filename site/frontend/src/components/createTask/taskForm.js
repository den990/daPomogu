function taskForm() {
    return (
        <form id="task-form" class="bg-white rounded-lg shadow-md p-6">
            <div class="space-y-6">
                <div id="task-name-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Название задания</label>
                    <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                </div>
                <div id="task-type-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Тип задания</label>
                    <select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                        <option>Выберите тип задания</option>
                        <option>Помощь пожилым</option>
                        <option>Экологическая акция</option>
                        <option>Социальная поддержка</option>
                        <option>Организация мероприятий</option>
                    </select>
                </div>
                <div id="description-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"></textarea>
                </div>
                <div id="location-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Местоположение</label>
                    <div class="flex space-x-4">
                        <input type="text" class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Введите адрес" />
                        <button type="button" class="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i>
                        </button>
                    </div>
                </div>
                <div id="datetime-field" class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Дата</label>
                        <input type="date" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Время</label>
                        <input type="time" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                    </div>
                </div>
                <div id="participants-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Количество участников</label>
                    <input type="number" min="1" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                </div>
                <div id="coordinators-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Координаторы</label>
                    <div class="space-y-2">
                        <div class="flex items-center space-x-2">
                            <select class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                                <option>Выберите координатора</option>
                            </select>
                            <button type="button" class="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                                <i data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div id="categories-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Категории</label>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm cursor-pointer hover:bg-red-100">Экология</span>
                        <span class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm cursor-pointer hover:bg-red-100">Образование</span>
                        <span class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm cursor-pointer hover:bg-red-100">Спорт</span>
                        <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                            <i class="mr-1" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></i> Добавить
                        </span>
                    </div>
                </div>
                <div id="points-field" class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Максимальное количество баллов</label>
                    <input type="number" min="0" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                </div>
                <div id="form-actions" class="flex items-center justify-end space-x-4 pt-6">
                    <button type="button" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                        Отмена
                    </button>
                    <button type="submit" class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                        Создать задание
                    </button>
                </div>
            </div>
        </form>
    );
}

export default taskForm;