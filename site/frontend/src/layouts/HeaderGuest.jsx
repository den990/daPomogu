import { Link } from "react-router";
import ROUTES from "../constants/routes";

function HeaderGuest() {
    return (
        <header id="header-guest" className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="flex items-center justify-between gap-2">
                    {/* Логотип */}
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
                        <Link
                            to={ROUTES.TASKS_CATALOG}
                            className="text-gray-600 hover:text-red-600 text-sm sm:text-base"
                        >
                            Задания
                        </Link>
                        <Link to={ROUTES.ABOUT} className="text-gray-600 hover:text-red-600 text-sm sm:text-base">
                            О нас
                        </Link>
                        <Link
                            to={ROUTES.LIST_ORGANIZATION}
                            className="text-gray-600 hover:text-red-600 text-sm sm:text-base"
                        >
                            Организации
                        </Link>
                    </nav>

                    <div className="flex items-center gap-1 sm:gap-3 min-w-max">
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
            </div>
        </header>
    );
}

export default HeaderGuest;
