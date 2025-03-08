function rejectAttachment() {
    return (
        <div id="reject-application-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white rounded-lg w-[500px] shadow-xl">
                <div class="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h3 class="text-xl font-semibold text-gray-800">Отклонение заявки</h3>
                    <button class="text-gray-400 hover:text-gray-600">
                        <i class="text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i>
                    </button>
                </div>
                <div class="px-6 py-4">
                    <div class="mb-4">
                        <p class="text-gray-600 mb-2">Пожалуйста, укажите причину отклонения заявки:</p>
                        <textarea class="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none" placeholder="Введите комментарий..."></textarea>
                    </div>
                </div>
                <div class="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
                    <button class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
                        Отмена
                    </button>
                    <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                        Отклонить заявку
                    </button>
                </div>
            </div>
        </div>
    );
}

export default rejectAttachment;