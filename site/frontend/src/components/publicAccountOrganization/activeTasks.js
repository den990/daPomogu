function ActiveTasks() {
    return (
        <section id="active-tasks" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Активные задания</h3>
            <div className="space-y-4">
                <div id="task-1" className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-gray-900">Помощь пожилым людям</h4>
                            <p className="text-gray-600 text-sm mt-1">Требуется 5 волонтеров • Срок: 25.03.2025</p>
                        </div>
                        <button className="text-red-600 hover:text-red-700">
                            <img style={{width: 16, height: 16}} src={require("../../images/edit_red.svg").default} alt="edit" />
                        </button>
                    </div>
                </div>
                <div id="task-2" className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-gray-900">Уборка парка</h4>
                            <p className="text-gray-600 text-sm mt-1">Требуется 10 волонтеров • Срок: 28.03.2025</p>
                        </div>
                        <button className="text-red-600 hover:text-red-700">
                            <img style={{width: 16, height: 16}} src={require("../../images/edit_red.svg").default} alt="edit" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ActiveTasks;