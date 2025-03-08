function buttonsPanel() {
    // убрать верхний div
    return (
        <div>
            <div className="col-span-1">
                <div id="task-actions" className="bg-white p-6 rounded-lg border sticky top-4">
                    <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4">
                        Принять участие
                    </button>
                    <button className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center">
                        <img style={{ width: 16, height: 16 }} src={ require("../../images/camera_red.svg").default } alt="icon" />
                        <span style={{ paddingLeft: 10 }}>Сделать фотоотчет</span>
                    </button>
                    <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 16, height: 16 }} src={ require("../../images/clock_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">4 часа</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 20, height: 16 }} src={ require("../../images/people_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">Нужно 10 волонтеров</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img style={{ width: 12, height: 16 }} src={ require("../../images/placemark_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">ул. Ленина, 123</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div id="task-actions" className="bg-white p-6 rounded-lg border sticky top-4">
                    <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4">
                        Отменить отклик
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 16, height: 16 }} src={ require("../../images/clock_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">4 часа</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 20, height: 16 }} src={ require("../../images/people_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">Нужно 10 волонтеров</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img style={{ width: 12, height: 16 }} src={ require("../../images/placemark_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">ул. Ленина, 123</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div id="task-actions" className="bg-white p-6 rounded-lg border sticky top-4">
                    <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 mb-4">
                        Отказаться от участия
                    </button>
                    <button className="w-full border border-neutral-300 px-6 py-3 rounded-lg hover:bg-red-50 flex items-center justify-center">
                        <img style={{ width: 16, height: 16 }} src={ require("../../images/camera_red.svg").default } alt="icon" />
                        <span style={{ paddingLeft: 10 }}>Сделать фотоотчет</span>
                    </button>
                    <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 16, height: 16 }} src={ require("../../images/clock_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">4 часа</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 20, height: 16 }} src={ require("../../images/people_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">Нужно 10 волонтеров</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img style={{ width: 12, height: 16 }} src={ require("../../images/placemark_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">ул. Ленина, 123</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div id="task-actions" className="bg-white p-6 rounded-lg border sticky top-4">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 16, height: 16 }} src={ require("../../images/clock_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">4 часа</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <img style={{ width: 20, height: 16 }} src={ require("../../images/people_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">Нужно 10 волонтеров</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img style={{ width: 12, height: 16 }} src={ require("../../images/placemark_grey.svg").default } alt="icon" />
                            <span className="text-neutral-700">ул. Ленина, 123</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default buttonsPanel;