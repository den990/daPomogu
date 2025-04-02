import { Link } from "react-router";
import ROUTES from "../constants/routes";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import heartRedIcon from "../images/heart_red.svg";
import addWhiteIcon from "../images/add_white.svg";
import arrowDownGreyIcon from "../images/arrow-down_grey.svg";
import { useNavigate } from "react-router";

function HeaderOrganization() {
    const [isOpen, setIsOpen] = useState(false);
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
        <header id="header-organization" className="bg-white shadow-sm py-3">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-[120px]">
                        <img
                            style={{ width: 24, height: 24 }}
                            src={heartRedIcon}
                            alt="icon"
                        />
                        <Link to={ROUTES.HOME} className="text-xl font-bold text-red-600 whitespace-nowrap">
                            ДаПомогу
                        </Link>
                    </div>
                    
                    <nav className="hidden md:flex space-x-4 lg:space-x-6 mx-2">
                        <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600 whitespace-nowrap">
                            Задания
                        </Link>
                        <Link to={ROUTES.ORGANIZATION_TASKS} className="text-gray-600 hover:text-red-600 whitespace-nowrap">
                            Мои задания
                        </Link>
                        <Link
                            to={ROUTES.LIST_ORGANIZATION}
                            className="text-gray-600 hover:text-red-600 whitespace-nowrap"
                        >
                            Организации
                        </Link>
                    </nav>
                    
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Link
                            to={ROUTES.CREATE_TASK}
                            className="flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 
                                      w-10 h-10 md:w-10 md:h-10 lg:w-auto lg:px-4 lg:py-2"
                        >
                            <img 
                                className="w-5 h-5 lg:w-[14px] lg:h-[16px]" 
                                src={addWhiteIcon} 
                                alt="add" 
                            />
                            <span className="hidden lg:inline pl-2 whitespace-nowrap">Добавить задание</span>
                        </Link>
                        
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center hover:bg-gray-50 rounded-md px-1 py-2"
                            >
                                {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            className="w-8 h-8 rounded-full"
                                            alt="Organization"
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
                                        to={ROUTES.ACCOUNT_ORGANIZATION} 
                                        className="block px-4 py-2 hover:bg-gray-50 whitespace-nowrap"
                                    >
                                        Мой аккаунт
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 whitespace-nowrap"
                                    >
                                        Выйти
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderOrganization;