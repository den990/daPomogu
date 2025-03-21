import { Link } from 'react-router';
import ROUTES from '../constants/routes';
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function HeaderOrganization() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { logout, profile, loading } = useContext(AuthContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-sm py-3 px-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img className="w-6 h-6 md:w-8 md:h-8" src={require("../images/heart_red.svg").default} alt="icon" />
                    <Link to={ROUTES.HOME} className="text-lg md:text-xl font-bold text-red-600">ДаПомогу</Link>
                </div>
                
                <nav className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
                    <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600">Задания</Link>
                    <Link to={ROUTES.ORGANIZATION_TASKS} className="text-gray-600 hover:text-red-600">Мои задания</Link>
                    <Link to={ROUTES.ABOUT} className="text-gray-600 hover:text-red-600">О нас</Link>
                </nav>
                
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Link to={ROUTES.CREATE_TASK} className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 md:w-auto md:px-4 md:py-2 md:rounded-lg md:flex md:items-center">
                        <img className="w-5 h-5 md:w-[14px] md:h-[16px]" src={require("../images/add_white.svg").default} alt="add" />
                        <span className="hidden md:inline pl-2">Добавить задание</span>
                    </Link>
                    
                    <div className="relative flex items-center" ref={menuRef}>
                        <button onClick={() => setIsOpen(!isOpen)} className="px-2 py-1 md:px-4 md:py-2 hover:bg-gray-50 rounded-md">
                            <div className="flex items-center">
                                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-8 h-8 rounded-full" alt="Organization" />
                                <span className="hidden md:inline-block px-2 lg:px-3">{loading ? "Загрузка..." : (profile ? profile.name : "Неизвестно")}</span>
                                <img className="hidden md:inline-block w-4 h-4" src={require("../images/arrow-down_grey.svg").default} alt="icon" />
                            </div>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                                <Link to={ROUTES.ACCOUNT_ORGANIZATION} className="block px-4 py-2 hover:bg-gray-50">Мой аккаунт</Link>
                                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-50">Выйти</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderOrganization;
