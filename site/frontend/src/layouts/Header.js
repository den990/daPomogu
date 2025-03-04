import './Header.css';

function Header() {
    return (
        <header id="header-guest" className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <i className="text-red-600 text-2xl" data-fa-i2svg="">
                            <svg className="svg-inline--fa fa-heart" aria-hidden="true" focusable="false"
                                 data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                      d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                            </svg>
                        </i>
                        <span className="text-xl font-bold text-red-600">VolunteerHub</span>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">О нас</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Проекты</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Организации</span>
                        <span className="text-gray-600 hover:text-red-600 cursor-pointer">Контакты</span>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button className="px-4 py-2 text-red-600 hover:text-red-700">Войти</button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;