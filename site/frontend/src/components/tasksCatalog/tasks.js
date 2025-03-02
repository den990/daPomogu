function tasks() {
    return (
        <section id="tasks-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div id="task-1" class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Экология</span>
                        </div>
                        <i class="text-gray-400 hover:text-red-600 cursor-pointer" data-fa-i2svg=""><svg class="svg-inline--fa fa-bookmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Уборка парка "Сокольники"</h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для уборки территории парка. Инвентарь предоставляется.</p>
                    <div class="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" class="w-6 h-6 rounded-full mr-2" />
                        <span class="text-gray-600">Экологическое движение</span>
                    </div>
                    <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div><i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>15 мая 2025</div>
                        <div><i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-users" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg></i>12/20</div>
                    </div>
                    <button class="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Принять участие</button>
                </div>
            </div>
            <div id="task-2" class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Образование</span>
                        </div>
                        <i class="text-gray-400 hover:text-red-600 cursor-pointer" data-fa-i2svg=""><svg class="svg-inline--fa fa-bookmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Онлайн-уроки английского</h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для проведения онлайн-уроков английского языка для детей из детских домов.</p>
                    <div class="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" class="w-6 h-6 rounded-full mr-2" />
                        <span class="text-gray-600">Образовательный центр</span>
                    </div>
                    <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div><i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>20 мая 2025</div>
                        <div><i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-users" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg></i>5/10</div>
                    </div>
                    <button class="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Принять участие</button>
                </div>
            </div>
            <div id="task-3" class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Помощь пожилым</span>
                        </div>
                        <i class="text-gray-400 hover:text-red-600 cursor-pointer" data-fa-i2svg=""><svg class="svg-inline--fa fa-bookmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bookmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path></svg></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Доставка продуктов</h3>
                    <p class="text-gray-600 mb-4 line-clamp-2">Требуются волонтеры для доставки продуктовых наборов пожилым людям.</p>
                    <div class="flex items-center mb-4">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" class="w-6 h-6 rounded-full mr-2" />
                        <span class="text-gray-600">Забота о старших</span>
                    </div>
                    <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div><i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>25 мая 2025</div>
                        <div><i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-users" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg></i>8/15</div>
                    </div>
                    <button class="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Принять участие</button>
                </div>
            </div>
        </section>
    );
}

export default tasks;