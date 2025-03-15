import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import { useState, useEffect } from "react";

function Sidebar({ isOpen, setIsOpen }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setIsOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsOpen]);

    return (
        <>
            {/* Сайдбар */}
            <aside 
                className={`fixed h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-40
                    ${isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                {/* Кнопка закрытия для мобильных */}
                {isMobile && (
                    <div className="absolute top-4 right-4">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                            aria-label="Закрыть меню"
                        >
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Логотип */}
                <div className="px-6 mb-8 mt-6 md:mt-4">
                    <div className="flex items-center gap-3">
                        <img 
                            className="w-9 h-9 rounded-lg" 
                            src={require("../../images/heart_red.svg").default} 
                            alt="Логотип организации" 
                        />
                        <h1 className="text-xl font-bold text-red-600">ДаПомогу-Админ</h1>
                    </div>
                </div>

                {/* Навигация */}
                <nav className="px-2 space-y-1.5">
                    <Link 
                        to={ROUTES.ADMIN_PANEL} 
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <img 
                            className="w-6 h-6" 
                            src={require("../../images/graphic_red.svg").default} 
                            alt="Иконка статистики" 
                        />
                        <span className="text-sm md:text-base">Главная</span>
                    </Link>
                    
                    <Link 
                        to="#" 
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <img 
                            className="w-6 h-6" 
                            src={require("../../images/people_grey.svg").default} 
                            alt="Иконка пользователей" 
                        />
                        <span className="text-sm md:text-base">Пользователи</span>
                    </Link>
                    
                    <Link 
                        to="#" 
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <img 
                            className="w-6 h-6" 
                            src={require("../../images/stats_grey.svg").default} 
                            alt="Иконка заданий" 
                        />
                        <span className="text-sm md:text-base">Задания</span>
                    </Link>
                    
                    <Link 
                        to={ROUTES.ADMIN_REGISTER_ORGANIZATION} 
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <img 
                            className="w-6 h-6" 
                            src={require("../../images/application_grey.svg").default} 
                            alt="Иконка заявок" 
                        />
                        <span className="text-sm md:text-base">Заявки</span>
                    </Link>
                </nav>
            </aside>

            {/* Затемнение фона для мобильных */}
            {isOpen && isMobile && (
                <div 
                    className="fixed inset-0 bg-black/30 z-30" 
                    onClick={() => setIsOpen(false)}
                    role="button"
                    tabIndex={0}
                    aria-label="Закрыть меню"
                />
            )}
        </>
    );
}

export default Sidebar;