import { Link } from 'react-router';
import ROUTES from '../constants/routes';

function HeaderGuest() {
    return (
        <header id="header-guest" className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <img 
                            style={{ width: 24, height: 24 }} 
                            src={require("../images/heart_red.svg").default} 
                            alt="icon" 
                            className="shrink-0"
                        />
                        <Link 
                            to={ROUTES.HOME} 
                            className="text-xl font-bold text-red-600 whitespace-nowrap"
                        >
                            ДаПомогу
                        </Link>
                    </div>
                    <nav className="hidden md:flex flex-1 justify-center space-x-6 mx-4">
                        <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600 cursor-pointer">
                            Задания
                        </Link>
                        <Link to={ROUTES.ABOUT} className="text-gray-600 hover:text-red-600 cursor-pointer">
                            О нас
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Link 
                            to={ROUTES.LOGIN} 
                            className="px-3 py-2 md:px-4 text-red-600 hover:text-red-700 text-sm md:text-base"
                        >
                            Войти
                        </Link>
                        <Link 
                            to={ROUTES.REGISTER_VOLUNTEER} 
                            className="px-3 py-2 md:px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm md:text-base"
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
