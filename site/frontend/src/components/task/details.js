
function details() {
    return (
        <div class="lg:col-span-1">
          <section id="task-action" class="bg-white rounded-xl shadow-sm p-6 mb-8 sticky top-24">
            <button class="w-full bg-red-600 text-white rounded-lg py-4 px-6 text-lg font-semibold hover:bg-red-700 transition duration-200 mb-6">
              Принять участие
            </button>
            <div class="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <span class="text-gray-600">Требуется волонтеров:</span>
              <span class="text-red-600 font-semibold">15</span>
            </div>
            <div class="flex items-center justify-between mb-6">
              <span class="text-gray-600">Уже участвуют:</span>
              <span class="text-gray-900 font-semibold">8</span>
            </div>
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold mb-4">Организатор</h3>
              <a href="#" class="flex items-center space-x-4 group">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" class="w-12 h-12 rounded-full" alt="Organization" />
                <div>
                  <h4 class="text-gray-900 font-medium group-hover:text-red-600">Благотворительный фонд "Надежда"</h4>
                  <p class="text-gray-600 text-sm">Помощь детям</p>
                </div>
              </a>
            </div>
          </section>
        </div>
    );
}

export default details;