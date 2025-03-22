function Dashboard({ isSidebarOpen, setIsSidebarOpen }) {
    const stats = [
        {
            icon: require('../../images/people_red.svg').default,
            title: 'Пользователи',
            value: '2,453',
            trend: { 
                icon: require('../../images/up-arrow_green.svg').default, 
                value: '12%', 
                color: 'green' 
            }
        },
        {
            icon: require('../../images/stats_red.svg').default,
            title: 'Активные задания',
            value: '186',
            trend: { 
                icon: require('../../images/up-arrow_green.svg').default, 
                value: '8%', 
                color: 'green' 
            }
        },
        {
            icon: require('../../images/ban_red.svg').default,
            title: 'Заблокированные',
            value: '23',
            trend: { 
                icon: require('../../images/down-arrow_red.svg').default, 
                value: '3%', 
                color: 'red' 
            }
        },
        {
            icon: require('../../images/circle-check_red.svg').default,
            title: 'Выполнено',
            value: '1,429',
            trend: { 
                icon: require('../../images/up-arrow_green.svg').default, 
                value: '15%', 
                color: 'green' 
            }
        }
    ];

    return (
        <main className="w-full p-4 sm:p-6 lg:p-8">
            <div className="mb-6 sm:mb-8 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Главная страница
                </h2>
                
                {/* Кнопка меню для мобильных */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="md:hidden p-2 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
                    aria-label="Открыть меню"
                >
                    <svg 
                        className="w-6 h-6 text-gray-700" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 6h16M4 12h16M4 18h16" 
                        />
                    </svg>
                </button>
            </div>
            
            {/* Статистика */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                            <div className="bg-red-100 p-2 sm:p-3 rounded-lg">
                                <img 
                                    className="w-6 h-6" 
                                    src={stat.icon}
                                    alt={stat.title}
                                />
                            </div>
                            <span className={`text-${stat.trend.color}-500 flex items-center gap-2 text-sm`}>
                                <img 
                                    className="w-4 h-4" 
                                    src={stat.trend.icon}
                                    alt="Тренд" 
                                />
                                {stat.trend.value}
                            </span>
                        </div>
                        <h3 className="text-gray-600 text-sm sm:text-base mb-1 line-clamp-2">
                            {stat.title}
                        </h3>
                        <p className="text-xl sm:text-2xl font-bold text-gray-800">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Dashboard;