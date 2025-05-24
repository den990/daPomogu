import { Link, useNavigate } from "react-router";
import ROUTES from "../constants/routes";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import heartRedIcon from "../images/heart_red.svg";
import addWhiteIcon from "../images/add_white.svg";
import arrowDownGreyIcon from "../images/arrow-down_grey.svg";
import { FaBars } from "react-icons/fa";

function HeaderOrganization() {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { logout, profile, loading, imageUrl } = useContext(AuthContext);
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        await logout();
        navigate(ROUTES.HOME);
    };

    return (
        <header className="bg-white shadow-sm py-3 px-4 relative">
            <div className="container mx-auto flex items-center justify-between">
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="md:hidden mr-2 text-xl text-red-600"
                >
                    <FaBars />
                </button>

                <div className="flex items-center space-x-2">
                    <img className="w-6 h-6" src={heartRedIcon} alt="icon" />
                    <Link to={ROUTES.HOME} className="text-lg font-bold text-red-600 whitespace-nowrap">
                        ДаПомогу
                    </Link>
                </div>

                <nav className="hidden md:flex space-x-4 lg:space-x-6">
                    <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600">Задания</Link>
                    <Link to={ROUTES.ORGANIZATION_TASKS} className="text-gray-600 hover:text-red-600">Мои задания</Link>
                    <Link to={ROUTES.LIST_USERS_IN_ORGANIZATION} className="text-gray-600 hover:text-red-600">Волонтеры</Link>
                    <Link to={ROUTES.STATISTIC} className="text-gray-600 hover:text-red-600">Рейтинг</Link>
                    <Link to={ROUTES.CALENDAR} className="text-gray-600 hover:text-red-600">Календарь</Link>
                </nav>

                <div className="flex items-center">
                    <Link
                        to={ROUTES.CREATE_TASK}
                        className="hidden md:flex items-center bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700 mr-4"
                    >
                        <img src={addWhiteIcon} className="w-4 h-4 mr-2" alt="add" />
                        Добавить задание
                    </Link>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center hover:bg-gray-50 rounded-md p-1"
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    className="w-8 h-8 rounded-full object-cover"
                                    alt="organization"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">
                                        {profile?.name?.charAt(0) || 'A'}
                                    </span>
                                </div>
                            )}
                            <span className="hidden md:inline pl-2 pr-1">
                                {loading ? "Загрузка..." : profile?.name || "Неизвестно"}
                            </span>
                            <img className="hidden md:inline w-4 h-4" src={arrowDownGreyIcon} alt="icon" />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                <Link to={ROUTES.ACCOUNT_ORGANIZATION} className="block px-4 py-2 hover:bg-gray-50">
                                    Мой аккаунт
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                                >
                                    Выйти
                                </button>
                            </div>
                        )}
                    </div>
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
                        <Link to={ROUTES.ORGANIZATION_TASKS} className="block text-gray-700 hover:text-red-600">Мои задания</Link>
                        <Link to={ROUTES.LIST_USERS_IN_ORGANIZATION} className="block text-gray-700 hover:text-red-600">Волонтеры</Link>
                        <Link to={ROUTES.STATISTIC} className="block text-gray-700 hover:text-red-600">Рейтинг</Link>
                        <Link to={ROUTES.CREATE_TASK} className="block text-red-600 hover:text-red-700">Добавить задание</Link>
                        <Link to={ROUTES.CALENDAR} className="block text-red-600 hover:text-red-700">Календарь</Link>
                        <hr />
                        <Link to={ROUTES.ACCOUNT_ORGANIZATION} className="block text-gray-700 hover:text-red-600">Мой аккаунт</Link>
                        <button onClick={handleLogout} className="block w-full text-left text-gray-700 hover:text-red-600">Выйти</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default HeaderOrganization;
