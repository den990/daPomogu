function team() {
    return (
        <section id="team" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Team Member" className="w-40 h-40 rounded-full mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold">Анна Петрова</h3>
                        <p className="text-gray-600">Руководитель проекта</p>
                    </div>
                    <div className="text-center">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="Team Member" className="w-40 h-40 rounded-full mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold">Михаил Иванов</h3>
                        <p className="text-gray-600">Координатор волонтеров</p>
                    </div>
                    <div className="text-center">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Team Member" className="w-40 h-40 rounded-full mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold">Елена Сидорова</h3>
                        <p className="text-gray-600">Менеджер проектов</p>
                    </div>
                    <div className="text-center">
                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" alt="Team Member" className="w-40 h-40 rounded-full mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold">Дмитрий Козлов</h3>
                        <p className="text-gray-600">Технический директор</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default team;