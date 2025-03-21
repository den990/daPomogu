function content() {
    return (
        <main id="main-content" className="container mx-auto px-4 pt-20 pb-8">
            <section id="task-info" className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg mb-4">Сбор мусора в парке</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img style={{width: 14, height: 16}} src={require("../../images/calendar_red.svg").default} alt="calendar" />
                            <span>15 марта 2025, 10:00</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img style={{width: 12, height: 16}} src={require("../../images/placemark_red.svg").default} alt="placemark" />
                            <span>Центральный парк</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img style={{width: 14, height: 16}} src={require("../../images/person_red.svg").default} alt="person" />
                            <span>Координатор: Иван Петров</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-neutral-600">Требования к отчету: минимум 3 фотографии, показывающие процесс работы</p>
                    </div>
                </div>
            </section>
            <section id="photo-upload" className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg mb-4">Добавление фотографий</h3>
                <div className="grid grid-cols-1">
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px]">
                       <img style={{width: 30, height: 30}} src={require("../../images/camera_red.svg").default} alt="camera" />
                        <span className="text-sm text-neutral-500">Сделать фото</span>
                    </div>
                </div>
            </section>
            <section id="additional-info" className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg mb-4">Дополнительная информация</h3>
                <div className="space-y-4">
                    <textarea className="w-full border border-neutral-300 rounded-lg p-3" rows="4" placeholder="Добавьте комментарий к отчету..."></textarea>
                </div>
            </section>
            <section id="action-buttons" className="flex flex-col md:flex-row gap-4 justify-end">
                <button className="px-4 py-2 bg-neutral-200 rounded-lg hover:bg-neutral-300">
                    Очистить форму
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Отправить отчет
                </button>
            </section>
        </main>
    );
}

export default content;