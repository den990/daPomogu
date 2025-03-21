import { AuthContext } from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { userServiceApi } from "../../utils/api/user_service";

function MainContent() {
    const { token } = useContext(AuthContext);
    const [usersAndOrganizations, setUsersAndOrganizations] = useState([]);
    const [countOfPages, setCountOfPages] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10; // Количество элементов на странице

    const fetchUsersAndOrganizations = (page) => {
        if (token) {
            userServiceApi.getUsersAndOrganizationsWithPagination(token, page)
                .then(data => {
                    setUsersAndOrganizations(data.data || []);
                    setCountOfPages(data.total_pages);
                    setTotalItems(data.total_items || 0); // Предполагаем, что API возвращает total_items
                })
                .catch(error => {
                    console.error('Ошибка при загрузке:', error);
                    setUsersAndOrganizations([]);
                    setTotalItems(0);
                });
        }
    };

    useEffect(() => {
        fetchUsersAndOrganizations(numberOfPage);
    }, [numberOfPage, token]);

    // Рассчитываем диапазон отображаемых записей
    const startItem = (numberOfPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(numberOfPage * itemsPerPage, totalItems);

    const handlePageChange = (page) => {
        setNumberOfPage(page);
    };

    const handleBlockUser = (id) => {
        if (token) {
            userServiceApi.putBlockUser(token, id)
            .then(() => fetchUsersAndOrganizations())
            .catch(console.error);
        }
    };

    const handleUnblockUser = (id) => {
        if (token) {
            userServiceApi.putUnblockUser(token, id)
            .then(() => fetchUsersAndOrganizations())
            .catch(console.error);
        }
    };
    
    return (
        <main className="w-full p-4 md:p-6 lg:p-8">
            <header className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Пользователи & Организации</h1>
            </header>

            <section className="mb-6 md:mb-8">
                <div className="relative max-w-3xl">
                    <input
                        type="text"
                        placeholder="Поиск..."
                        className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 text-sm md:text-base"
                    />
                    <img 
                        className="absolute left-2 top-2.5 w-4 h-4 md:w-5 md:h-5"
                        src={require("../../images/find_grey.svg").default}
                        alt="icon"
                    />
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <div className="p-3 md:p-4">
                    {/* Мобильная версия таблицы */}
                    <div className="grid gap-4 md:hidden">
                        {usersAndOrganizations.map((user, i) => (
                            <div key={i} className="border-b border-gray-100 pb-4">
                                {/* ... остальной код мобильной версии без изменений ... */}
                            </div>
                        ))}
                    </div>

                    {/* Десктопная версия таблицы */}
                    <table className="hidden md:table w-full">
                        {/* ... остальной код таблицы без изменений ... */}
                    </table>
                </div>

                <div className="p-3 md:p-4 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                        <p className="text-xs md:text-sm text-gray-600">
                            Показано {startItem}-{endItem} из {totalItems} записей
                        </p>
                        <div className="flex gap-1 overflow-x-auto w-full md:w-auto">
                            <button 
                                onClick={() => handlePageChange(numberOfPage - 1)} 
                                disabled={numberOfPage === 1}
                                className="p-2 min-w-[40px] border border-gray-200 rounded-md disabled:opacity-50"
                            >
                                ←
                            </button>
                            {Array.from({ length: countOfPages }, (_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)} 
                                    className={`p-2 min-w-[40px] ${
                                        i + 1 === numberOfPage 
                                            ? 'bg-red-600 text-white' 
                                            : 'border border-gray-200'
                                    } rounded-md`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button 
                                onClick={() => handlePageChange(numberOfPage + 1)} 
                                disabled={numberOfPage === countOfPages}
                                className="p-2 min-w-[40px] border border-gray-200 rounded-md disabled:opacity-50"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MainContent;