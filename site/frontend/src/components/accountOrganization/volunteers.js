
function volunteers() {
    return (
        <section id="volunteers" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Активные волонтеры</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div id="volunteer-1" className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-12 h-12 rounded-full" />
                    <div>
                        <h4 className="font-semibold text-gray-900">Анна Петрова</h4>
                        <p className="text-gray-600 text-sm">3 активных задания</p>
                    </div>
                </div>
                <div id="volunteer-2" className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-12 h-12 rounded-full" />
                    <div>
                        <h4 className="font-semibold text-gray-900">Иван Смирнов</h4>
                        <p className="text-gray-600 text-sm">2 активных задания</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default volunteers;