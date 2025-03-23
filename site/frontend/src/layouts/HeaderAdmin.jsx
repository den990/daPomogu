import { Link } from "react-router";
import ROUTES from "../constants/routes";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function HeaderAdmin() {
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
        <header id="header-admin" className="bg-white shadow-sm py-3">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-end">
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Администратор</span>
                        <div className="flex items-center space-x-2">
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="px-4 py-2 hover:bg-gray-50 rounded-md"
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                                            className="w-8 h-8 rounded-full"
                                            alt="Admin"
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
                                            <Link to={ROUTES.ADMIN_PANEL}>Мой аккаунт</Link>
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

export default HeaderAdmin;
