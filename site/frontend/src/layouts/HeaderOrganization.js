import { Link } from 'react-router';
import ROUTES from '../constants/routes';
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function HeaderOrganization() {
    const [isOpen, setIsOpen] = useState(false);
        const menuRef = useRef(null);
        const { logout } = useContext(AuthContext);
    
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
        <header id="header-organization" className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img style={{ width: 24, height: 24 }} src={ require("../images/heart_red.svg").default } alt="icon" />
                        <Link to={ROUTES.HOME} className="text-xl font-bold text-red-600">ДаПомогу</Link>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600 cursor-pointer">Задания</Link>
                        <Link to={ROUTES.HOME} className="text-gray-600 hover:text-red-600 cursor-pointer">Мои задания</Link>
                        <Link to={ROUTES.ABOUT} className="text-gray-600 hover:text-red-600 cursor-pointer">О нас</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link to={ROUTES.CREATE_TASK} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                            <img style={{width: 14, height: 16}} src={ require("../images/add_white.svg").default } alt="icon" /><span style={{paddingLeft: 10}}>Добавить задание</span>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-8 h-8 rounded-full" alt="Organization" />
                            <div className="relative" ref={menuRef}>
                                <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 hover:bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                        <span style={{paddingRight: 10}}>Организация</span>
                                        <img style={{ width: 14, height: 14 }} src={ require("../images/arrow-down_grey.svg").default } alt="icon" />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                                            <Link to={ROUTES.ACCOUNT_ORGANIZATION} >Мой аккаунт</Link>
                                        </button>
                                        <button onClick={logout} className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                                           Выйти
                                        </button>
                                    </div>
                                    
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderOrganization;