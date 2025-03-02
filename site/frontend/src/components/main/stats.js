function stats() {
    return (
        <section id="stats" class="py-16 bg-white">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center p-6 rounded-lg bg-red-50">
                        <div class="text-3xl font-bold text-red-600 mb-2">5,000+</div>
                        <div class="text-gray-600">Активных волонтеров</div>
                    </div>
                    <div class="text-center p-6 rounded-lg bg-red-50">
                        <div class="text-3xl font-bold text-red-600 mb-2">300+</div>
                        <div class="text-gray-600">Успешных проектов</div>
                    </div>
                    <div class="text-center p-6 rounded-lg bg-red-50">
                        <div class="text-3xl font-bold text-red-600 mb-2">50+</div>
                        <div class="text-gray-600">Организаций</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default stats;