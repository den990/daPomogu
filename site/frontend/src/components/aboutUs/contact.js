function contact() {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Контакты для сотрудничества</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-red-50 p-8 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">Свяжитесь с нами</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <img style={{ width: 16, height: 16 }} src={require("../../images/message.svg").default} alt="message" />
                            <span className="ml-3">info@volunteerhub.ru</span>
                        </div>
                        <div className="flex items-center">
                            <img style={{ width: 16, height: 16 }} src={require("../../images/phone.svg").default} alt="phone" />
                            <span className="ml-3">+7 (999) 123-45-67</span>
                        </div>
                        <div className="flex items-center">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/placemark_red.svg").default} alt="placemark" />
                            <span className="ml-3">Москва, ул. Волонтерская, 1</span>
                        </div>
                    </div>
                </div>
                <div className="bg-red-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Социальные сети</h3>
                <div className="flex space-x-6">
                    <a href="#" className="text-red-600 hover:text-red-700">
                        <img style={{ width: 30, height: 30 }} src={require("../../images/tg.svg").default} alt="tg" />
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-700">
                        <img style={{ width: 30, height: 30 }} src={require("../../images/vk.svg").default} alt="vk" />
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-700">
                        <img style={{ width: 30, height: 30 }} src={require("../../images/yt.svg").default} alt="yt" />
                    </a>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}

export default contact;