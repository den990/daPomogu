import { Link } from "react-router";
import ROUTES from "../constants/routes";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import heartRedIcon from "../images/heart_red.svg";
import arrowDownGreyIcon from "../images/arrow-down_grey.svg";

function HeaderVolunteer() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { logout, profile, loading, imageUrl } = useContext(AuthContext);

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
                    <img className="w-6 h-6" src={heartRedIcon} alt="icon" />
                    <Link to={ROUTES.HOME} className="text-lg font-bold text-red-600 whitespace-nowrap">
                        ДаПомогу
                    </Link>
                </div>

                <nav className="hidden md:flex space-x-4 lg:space-x-6">
                    <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600 whitespace-nowrap">
                        Задания
                    </Link>
                    <Link to={ROUTES.MY_TASKS} className="text-gray-600 hover:text-red-600 whitespace-nowrap">
                        Мои задания
                    </Link>
                    <Link
                        to={ROUTES.LIST_ORGANIZATION}
                        className="text-gray-600 hover:text-red-600 whitespace-nowrap"
                    >
                        Организации
                    </Link>
                </nav>
                <div className="flex items-center">
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center hover:bg-gray-50 rounded-md p-1"
                        >
                            {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        className="w-8 h-8 rounded-full"
                                        alt="volunteer"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-gray-500 text-xs">
                                            {profile?.name?.charAt(0) || 'A'}
                                        </span>
                                    </div>
                                )}
                            <span className="hidden md:inline pl-2 pr-1 whitespace-nowrap">
                                {loading ? "Загрузка..." : profile ? profile.name : "Неизвестно"}
                            </span>
                            <img
                                className="hidden md:inline w-4 h-4"
                                src={arrowDownGreyIcon}
                                alt="icon"
                            />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                <Link 
                                    to={ROUTES.ACCOUNT_VOLUNTEER} 
                                    className="block px-4 py-2 hover:bg-gray-50 whitespace-nowrap"
                                >
                                    Мой аккаунт
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 whitespace-nowrap"
                                >
                                    Выйти
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderVolunteer;