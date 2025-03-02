function pagination() {
    return (
        <section id="pagination" class="flex justify-center">
            <div class="flex space-x-2">
                <button class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600">
                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-chevron-left" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg></i>
                </button>
                <button class="w-10 h-10 flex items-center justify-center rounded-lg bg-red-600 text-white">1</button>
                <button class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600">2</button>
                <button class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600">3</button>
                <button class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600">
                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-chevron-right" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg></i>
                </button>
            </div>
        </section>
    );
}

export default pagination;