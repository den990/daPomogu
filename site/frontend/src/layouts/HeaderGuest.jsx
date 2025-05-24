import { Link } from "react-router";
import ROUTES from "../constants/routes";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function HeaderGuest() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header id="header-guest" className="bg-white shadow-sm py-4 px-4 relative">
            <div className="container mx-auto flex items-center justify-between gap-2">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden mr-2 text-xl text-red-600"
                >
                    <FaBars />
                </button>

                <div className="flex items-center gap-2 min-w-0">
                    <img
                        className="w-6 h-6 md:w-8 md:h-8 shrink-0"
                        src={require("../images/heart_red.svg").default}
                        alt="Логотип"
                    />
                    <Link to={ROUTES.HOME} className="text-lg sm:text-xl font-bold text-red-600 truncate">
                        ДаПомогу
                    </Link>
                </div>

                <nav className="hidden md:flex flex-1 justify-center gap-4 mx-4">
                    <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600 text-sm sm:text-base">
                        Задания
                    </Link>
                    <Link to={ROUTES.ABOUT} className="text-gray-600 hover:text-red-600 text-sm sm:text-base">
                        О нас
                    </Link>
                    <Link to={ROUTES.LIST_ORGANIZATION} className="text-gray-600 hover:text-red-600 text-sm sm:text-base">
                        Организации
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-1 sm:gap-3 min-w-max">
                    <Link
                        to={ROUTES.LOGIN}
                        className="px-2 py-1 sm:px-3 sm:py-2 text-red-600 hover:text-red-700 text-xs sm:text-sm md:text-base"
                    >
                        Войти
                    </Link>
                    <Link
                        to={ROUTES.REGISTER_VOLUNTEER}
                        className="px-2 py-1 sm:px-3 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs sm:text-sm md:text-base"
                    >
                        Регистрация
                    </Link>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40" onClick={() => setMobileMenuOpen(false)}>
                    <div
                        className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-5 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm text-gray-500 mb-4"
                        >
                            ✕ Закрыть
                        </button>
                        <Link to={ROUTES.TASKS_CATALOG} className="block text-gray-700 hover:text-red-600">Задания</Link>
                        <Link to={ROUTES.ABOUT} className="block text-gray-700 hover:text-red-600">О нас</Link>
                        <Link to={ROUTES.LIST_ORGANIZATION} className="block text-gray-700 hover:text-red-600">Организации</Link>
                        <hr />
                        <Link to={ROUTES.LOGIN} className="block text-gray-700 hover:text-red-600">Войти</Link>
                        <Link to={ROUTES.REGISTER_VOLUNTEER} className="block text-gray-700 hover:text-red-600">Регистрация</Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default HeaderGuest;
