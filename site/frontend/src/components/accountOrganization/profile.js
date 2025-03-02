
function profile() {
    return (
        <section id="org-profile" class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div class="flex items-start space-x-6">
                <img class="w-48 h-48 rounded-lg object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cb61e8f45a-5ee863536d744c529bb2.png" alt="humanitarian organization logo with volunteers in red and white colors, professional photo" />
                <div class="flex-1">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Название Организации</h2>
                    <p class="text-gray-600 mb-4">Описание организации и её миссии. Мы помогаем людям и делаем мир лучше через волонтерскую деятельность.</p>
                    <div class="flex space-x-4">
                        <button class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                            <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-user-plus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg></i>Заявки на вступление
                        </button>
                        <button class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                            <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></i>Добавить задание
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default profile;