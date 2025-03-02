function featuredProjects() {
    return (
        <section id="featured-projects" class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Актуальные проекты</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                        <img class="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/39939d80fb-d0c4fe7ed9132296571f.png" alt="volunteers helping elderly people, modern photography style" />
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Помощь пожилым людям</h3>
                            <p class="text-gray-600 mb-4">Требуются волонтеры для помощи пожилым людям с покупками и бытовыми задачами</p>
                            <div class="flex justify-between items-center">
                                <span class="text-red-600">Требуется: 5 человек</span>
                                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Участвовать</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                        <img class="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d76fd2a961-c3ac1e20715833d5dd24.png" alt="volunteers cleaning park area, environmental project" />
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Уборка парка</h3>
                            <p class="text-gray-600 mb-4">Организация субботника в городском парке. Присоединяйтесь к нашей команде!</p>
                            <div class="flex justify-between items-center">
                                <span class="text-red-600">Требуется: 15 человек</span>
                                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Участвовать</button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                        <img class="w-full h-48 object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bb66576ffc-881036eb604606846525.png" alt="volunteers teaching children, education support project" />
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Обучение детей</h3>
                            <p class="text-gray-600 mb-4">Нужны волонтеры для проведения развивающих занятий с детьми</p>
                            <div class="flex justify-between items-center">
                                <span class="text-red-600">Требуется: 3 человека</span>
                                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Участвовать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default featuredProjects;