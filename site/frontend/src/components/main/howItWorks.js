function howItWorks() {
    return (
        <section id="how-it-works" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Как это работает</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <img style={{width: 24, height: 24}} src={require("../../images/registration_red.svg").default} alt="registration" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Регистрация</h3>
                        <p className="text-gray-600">Создайте аккаунт волонтера или организации</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <img style={{width: 24, height: 24}} src={require("../../images/find_red.svg").default} alt="find" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Поиск</h3>
                        <p className="text-gray-600">Найдите интересующий проект или волонтеров</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <img style={{width: 24, height: 24}} src={require("../../images/heart_red.svg").default} alt="heart" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Участие</h3>
                        <p className="text-gray-600">Присоединяйтесь к проектам и помогайте другим</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default howItWorks;