
function volunteers() {
    return (
        <section id="volunteers" class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Активные волонтеры</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div id="volunteer-1" class="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" class="w-12 h-12 rounded-full" />
                    <div>
                        <h4 class="font-semibold text-gray-900">Анна Петрова</h4>
                        <p class="text-gray-600 text-sm">3 активных задания</p>
                    </div>
                </div>
                <div id="volunteer-2" class="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" class="w-12 h-12 rounded-full" />
                    <div>
                        <h4 class="font-semibold text-gray-900">Иван Смирнов</h4>
                        <p class="text-gray-600 text-sm">2 активных задания</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default volunteers;