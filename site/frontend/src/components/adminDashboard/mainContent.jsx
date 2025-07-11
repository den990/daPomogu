import { AuthContext } from "../../context/AuthProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { userServiceApi } from "../../utils/api/user_service";

function MainContent({ isSidebarOpen, setIsSidebarOpen }) {
    const { token } = useContext(AuthContext);
    const [usersAndOrganizations, setUsersAndOrganizations] = useState([]);
    const [countOfPages, setCountOfPages] = useState(0);
    const [numberOfPage, setNumberOfPage] = useState(1);

    const fetchUsersAndOrganizations = useCallback(
        (page) => {
            if (token) {
                userServiceApi
                    .getUsersAndOrganizationsWithPagination(token, page)
                    .then((data) => {
                        setUsersAndOrganizations(data.data.data || []);
                        setCountOfPages(data.data.total_pages);
                    })
                    .catch((error) => {
                        console.error("Ошибка при загрузке всех пользователей и организаций: ", error);
                        setUsersAndOrganizations([]);
                    });
            }
        },
        [token]
    );

    useEffect(() => {
        fetchUsersAndOrganizations(numberOfPage);
    }, [numberOfPage, fetchUsersAndOrganizations]);

    const handlePageChange = (page) => {
        setNumberOfPage(page);
    };

    const handleBlockUser = (id) => {
        if (token) {
            userServiceApi
                .putBlockUser(token, id)
                .then(() => fetchUsersAndOrganizations(numberOfPage))
                .catch((error) => {
                    console.error("Ошибка при блокировке пользователя", error);
                });
        }
    };

    const handleUnblockUser = (id) => {
        if (token) {
            userServiceApi
                .putUnblockUser(token, id)
                .then(() => fetchUsersAndOrganizations(numberOfPage))
                .catch((error) => {
                    console.error("Ошибка при разблокировке пользователя", error);
                });
        }
    };

    console.log(usersAndOrganizations);

    return (
        <main id="main-content" className="p-4 md:p-8">
            <div>
                <header className="flex justify-between items-center mb-6 md:mb-8">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Пользователи &amp; Организации</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
                        aria-label="Открыть меню"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </header>

                <section className="bg-white rounded-lg shadow-sm overflow-x-auto">
                    <div className="p-4 md:p-6">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">
                                        Пользователи/Организации
                                    </th>
                                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">Тип</th>
                                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">Статус</th>
                                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersAndOrganizations.map((user, i) => (
                                    <tr
                                        key={i}
                                        className={
                                            i + 1 === usersAndOrganizations.length
                                                ? "border-gray-100"
                                                : "border-b border-gray-100"
                                        }
                                    >
                                        <td className="py-3 md:py-4">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <img
                                                    src={user.avatar_base64}
                                                    alt="User"
                                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="text-sm md:text-base font-medium">
                                                        {user.surname !== undefined
                                                            ? user.name + " " + user.surname
                                                            : user.name}
                                                    </p>
                                                    <p className="text-xs md:text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 md:py-4">
                                            {user.type === "user" ? (
                                                user.is_admin ? (
                                                    <span className="px-2 md:px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs md:text-sm">
                                                        Администратор
                                                    </span>
                                                ) : (
                                                    <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs md:text-sm">
                                                        Волонтер
                                                    </span>
                                                )
                                            ) : (
                                                <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs md:text-sm">
                                                    Организация
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 md:py-4">
                                            {user.is_blocked === true ? (
                                                <span className="text-red-600 flex items-center text-sm md:text-base">
                                                    <img
                                                        className="w-4 h-4"
                                                        src={require("../../images/ban_red.svg").default}
                                                        alt="icon"
                                                    />
                                                    <span className="ml-2">Заблокированный</span>
                                                </span>
                                            ) : (
                                                <span className="text-green-600 flex items-center text-sm md:text-base">
                                                    <img
                                                        className="w-4 h-4"
                                                        src={require("../../images/check_green.svg").default}
                                                        alt="icon"
                                                    />
                                                    <span className="ml-2">Активный</span>
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 md:py-4">
                                            {user.is_blocked === 1 ? (
                                                <button
                                                    onClick={() => handleUnblockUser(user.id)}
                                                    className="px-2 md:px-3 py-1 text-green-600 hover:bg-green-50 rounded-md flex items-center text-sm md:text-base"
                                                >
                                                    <img
                                                        className="w-4 h-4"
                                                        src={require("../../images/unlock_green.svg").default}
                                                        alt="icon"
                                                    />
                                                    <span className="ml-2">Разблокировать</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleBlockUser(user.id)}
                                                    className="px-2 md:px-3 py-1 text-red-600 hover:bg-red-50 rounded-md flex items-center text-sm md:text-base"
                                                >
                                                    <img
                                                        className="w-4 h-4"
                                                        src={require("../../images/ban_red.svg").default}
                                                        alt="icon"
                                                    />
                                                    <span className="ml-2">Заблокировать</span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 md:p-6 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePageChange(numberOfPage - 1)}
                                    className={`px-3 py-1 border border-gray-200 rounded-md ${
                                        numberOfPage - 1 === 0 ? "bg-gray-200" : "hover:bg-gray-50"
                                    }`}
                                    disabled={numberOfPage - 1 === 0}
                                >
                                    <img
                                        style={{ width: 10, height: 16 }}
                                        src={require("../../images/left_arrow_grey.svg").default}
                                        alt="left_arrow"
                                    />
                                </button>
                                {Array.from({ length: countOfPages }, (_, i) => (
                                    <button
                                        onClick={() => handlePageChange(i + 1)}
                                        key={i}
                                        className={`px-3 py-1 ${
                                            i + 1 === numberOfPage
                                                ? "bg-red-600 text-white"
                                                : "border border-gray-200 hover:bg-gray-50"
                                        } rounded-md`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => handlePageChange(numberOfPage + 1)}
                                    className={`px-3 py-1 border border-gray-200 rounded-md ${
                                        numberOfPage === countOfPages ? "bg-gray-200 disabled" : "hover:bg-gray-50"
                                    }`}
                                    disabled={numberOfPage === countOfPages}
                                >
                                    <img
                                        style={{ width: 10, height: 16 }}
                                        src={require("../../images/right_arrow_grey.svg").default}
                                        alt="right_arrow"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MainContent;
