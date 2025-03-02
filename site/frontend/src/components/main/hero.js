
function hero() {
    return (
        <section id="hero" class="pt-20 h-[600px] bg-gradient-to-br from-red-50 to-white">
            <div class="container mx-auto px-4 h-full flex items-center">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Объединяем неравнодушных людей</h1>
                        <p class="text-xl text-gray-600 mb-8">Найдите волонтерские проекты или добровольцев для ваших инициатив</p>
                        <div class="flex space-x-4">
                            <button class="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Стать волонтером</button>
                            <button class="px-8 py-3 text-red-600 border border-red-600 rounded-lg hover:bg-red-50">Создать проект</button>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <img class="w-full h-auto rounded-lg shadow-xl" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/78e1578dcd-f9d3012551e8cf37535a.png" alt="illustration of diverse group of volunteers helping community, modern minimal style, red and white color scheme" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default hero;