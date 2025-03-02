function profile() {
    return (
        <div id="profile-section" class="md:col-span-1">
            <div class="bg-white rounded-lg shadow p-6">
            <div class="flex flex-col items-center">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" class="w-32 h-32 rounded-full" alt="Profile Picture" />
                <h2 class="mt-4 text-xl font-semibold">Анна Петрова</h2>
                <p class="text-gray-600"><i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-location-dot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i>Москва</p>
            </div>
            <div class="mt-6 grid grid-cols-2 gap-4 text-center">
                <div class="bg-red-50 rounded-lg p-4">
                <div class="text-2xl font-bold text-red-600">47</div>
                <div class="text-sm text-gray-600">Выполнено заданий</div>
                </div>
                <div class="bg-red-50 rounded-lg p-4">
                <div class="text-2xl font-bold text-red-600">4.8</div>
                <div class="text-sm text-gray-600">Рейтинг</div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default profile;