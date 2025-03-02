
function faq() {
    return (
        <section id="faq" class="py-20 bg-gray-50">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
                <div class="max-w-3xl mx-auto space-y-6">
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-xl font-semibold mb-2">Как стать волонтером?</h3>
                    <p class="text-gray-600">Зарегистрируйтесь на платформе, заполните профиль и выберите интересующие вас проекты.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-xl font-semibold mb-2">Какие документы нужны для регистрации?</h3>
                    <p class="text-gray-600">Для регистрации достаточно паспорта и действующего email-адреса.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-xl font-semibold mb-2">Как организации могут разместить задание?</h3>
                    <p class="text-gray-600">Организации могут создать профиль и после верификации публиковать задания для волонтеров.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                    <h3 class="text-xl font-semibold mb-2">Есть ли возрастные ограничения?</h3>
                    <p class="text-gray-600">Стать волонтером может любой желающий старше 18 лет.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default faq;