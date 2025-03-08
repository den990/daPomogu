function error() {
    return (
        <div id="error-modal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-xl w-[480px] max-w-[90%] overflow-hidden">
                <div class="bg-red-600 px-6 py-4 flex items-center justify-between">
                    <h3 class="text-white text-lg font-semibold">Ошибка</h3>
                    <button class="text-white hover:text-red-200">
                        <i class="text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i>
                    </button>
                </div>
                <div class="p-6">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <i class="text-red-600 text-2xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-exclamation" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-exclamation" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path></svg></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-gray-700">Произошла ошибка при выполнении операции. Пожалуйста, попробуйте еще раз или обратитесь в службу поддержки.</p>
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end space-x-3">
                        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                            Закрыть
                        </button>
                        <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                            Повторить
                        </button>
                    </div>
                </div>
                <div class="bg-red-50 px-6 py-4 border-t border-red-100">
                    <div class="flex items-center">
                        <i class="text-red-600 mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-code" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="code" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"></path></svg></i>
                        <p class="text-sm text-red-600 font-mono">Код ошибки: ERR_CONNECTION_FAILED</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default error;