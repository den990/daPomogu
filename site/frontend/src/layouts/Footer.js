function Footer() {
    return (
        <footer id="footer" className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">VolunteerHub</h3>
                        <p className="text-gray-400">Платформа для объединения волонтеров и организаций</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Навигация</h4>
                        <ul className="space-y-2">
                            <li><span className="text-gray-400 hover:text-white cursor-pointer">Главная</span></li>
                            <li><span className="text-gray-400 hover:text-white cursor-pointer">Проекты</span></li>
                            <li><span className="text-gray-400 hover:text-white cursor-pointer">Волонтеры</span></li>
                            <li><span className="text-gray-400 hover:text-white cursor-pointer">О нас</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Контакты</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400 flex items-center"><img style={{ width: 16, height: 16 }} src={ require("../images/message_grey.svg").default } alt="icon"/><span style={{paddingLeft: 10}}>info@volunteerhub.ru</span></li>
                            <li className="text-gray-400 flex items-center"><img style={{ width: 16, height: 16 }} src={ require("../images/phone_grey.svg").default } alt="icon" /><span style={{paddingLeft: 10}}>+7 (999) 123-45-67</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Социальные сети</h4>
                        <div className="flex space-x-4">
                            <span className="text-gray-400 hover:text-white cursor-pointer"><img style={{ width: 21, height: 24 }} src={ require("../images/vk_grey.svg").default } alt="icon"/></span>
                            <span className="text-gray-400 hover:text-white cursor-pointer"><img style={{ width: 23, height: 24 }} src={ require("../images/tg_grey.svg").default } alt="icon"/></span>
                            <span className="text-gray-400 hover:text-white cursor-pointer"><img style={{ width: 21, height: 24 }} src={ require("../images/instagram_grey.svg").default } alt="icon"/></span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2025 VolunteerHub. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;