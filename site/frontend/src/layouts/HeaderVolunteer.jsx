import { Link } from "react-router";
import ROUTES from "../constants/routes";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function HeaderVolunteer() {
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
        <header id="header-volunteer" className="bg-white shadow-sm py-3">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <img
                            style={{ width: 24, height: 24 }}
                            src={require("../images/heart_red.svg").default}
                            alt="icon"
                        />
                        <Link to={ROUTES.HOME} className="text-xl font-bold text-red-600">
                            ДаПомогу
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <Link to={ROUTES.TASKS_CATALOG} className="text-gray-600 hover:text-red-600 cursor-pointer">
                            Задания
                        </Link>
                        <Link to={ROUTES.MY_TASKS} className="text-gray-600 hover:text-red-600 cursor-pointer">
                            Мои задания
                        </Link>
                        <Link
                            to={ROUTES.LIST_ORGANIZATION}
                            className="text-gray-600 hover:text-red-600 text-sm sm:text-base"
                        >
                            Организации
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="px-1 py-2 hover:bg-gray-50 rounded-md"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                                            className="w-8 h-8 rounded-full"
                                            alt="Profile"
                                        />
                                        <span style={{ paddingRight: 10, paddingLeft: 12 }}>
                                            {loading ? "Загрузка..." : profile ? profile.name : "Неизвестно"}
                                        </span>
                                        <img
                                            style={{ width: 14, height: 14 }}
                                            src={require("../images/arrow-down_grey.svg").default}
                                            alt="icon"
                                        />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-50">
                                            <Link to={ROUTES.ACCOUNT_VOLUNTEER}>Мой аккаунт</Link>
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-50"
                                        >
                                            <Link to={ROUTES.HOME}>Выйти</Link>
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

export default HeaderVolunteer;
