import { AuthContext } from "../../context/AuthProvider";
import { useContext, useEffect, useState, useCallback } from "react";
import { userServiceApi } from "../../utils/api/user_service";

function MainContent() {
    const { token } = useContext(AuthContext);
    const [usersAndOrganizations, setUsersAndOrganizations] = useState([]);

    const fetchUsersAndOrganizations = useCallback(() => {
        if (token) {
            userServiceApi.getUsersAndOrganizationsWithPagination(token, 1)
                .then(data => {
                    setUsersAndOrganizations(data.data || []);
                })
                .catch(error => {
                    console.error('Ошибка при загрузке всех пользователей и организаций: ', error);
                    setUsersAndOrganizations([]);
                })
        }
    }, [token]);

    useEffect(() => {
        fetchUsersAndOrganizations();
    }, [fetchUsersAndOrganizations]);

    const handleBlockUser = (id) => {
        if (token) {
            userServiceApi.putBlockUser(token, id)
            .then(() => fetchUsersAndOrganizations())
            .catch(error => {
                console.error('Ошибка при блокировке пользователя', error);
            });
        }
    };

    const handleUnblockUser = (id) => {
        if (token) {
            userServiceApi.putUnblockUser(token, id)
            .then(() => fetchUsersAndOrganizations())
            .catch(error => {
                console.error('Ошибка при разблокировке пользователя', error);
            });
        }
    };
    
    return (
        <main id="main-content" className="ml-64 p-8">
            <header id="header" className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Пользователи &amp; Организации</h1>
            </header>
            <section id="search-section" className="mb-8">
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <input type="text" placeholder="Search users or organizations..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500" />
                        <img className="absolute left-3 top-3" style={{ width: 16, height: 16 }} src={require("../../images/find_grey.svg").default} alt="icon" />
                    </div>
                </div>
            </section>
            <section id="users-list" className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left pb-4">Пользователь/Организация</th>
                                <th className="text-left pb-4">Тип</th>
                                <th className="text-left pb-4">Статус</th>
                                <th className="text-left pb-4">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersAndOrganizations.map((user, i) => (
                                <tr key={i} className="border-b border-gray-100">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="User" className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-medium">{(user.surname !== undefined) ? user.name + ' ' + user.surname : user.name }</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        {
                                            (user.type === "user") 
                                                ? (user.is_admin) 
                                                    ? <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Администратор</span>
                                                    : <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Волонтер</span>
                                                : <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Организация</span>
                                        }
                                    </td>
                                    <td className="py-4">
                                        {
                                            (user.is_blocked === true) 
                                                ?   <span className="text-red-600 flex items-center">
                                                        <img style={{ width: 16, height: 16 }} src={ require("../../images/ban_red.svg").default } alt="icon" />
                                                        <span style={{paddingLeft: 10}}>Заблокированный</span>
                                                    </span>
                                                :   <span className="text-green-600 flex items-center">
                                                        <img style={{ width: 16, height: 16 }} src={ require("../../images/check_green.svg").default } alt="icon" />
                                                        <span style={{paddingLeft: 10}}>Активный</span>
                                                    </span>
                                        }
                                    </td>
                                    <td className="py-4">
                                        {
                                            (user.is_blocked === true) 
                                                ?   <button onClick={() => handleUnblockUser(user.id)} className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-md flex items-center">
                                                        <img style={{ width: 14, height: 16 }} src={ require("../../images/unlock_green.svg").default } alt="icon" />
                                                        <span style={{paddingLeft: 10}}>Разблокировать</span>
                                                    </button>
                                                :   <button onClick={() => handleBlockUser(user.id)} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md flex items-center">
                                                        <img style={{ width: 16, height: 16 }} src={ require("../../images/ban_red.svg").default } alt="icon" />
                                                        <span style={{paddingLeft: 10}}>Заблокировать</span>
                                                    </button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="pagination" className="p-6 border-t border-gray-200">
                    <div className="flex items-center justify-center">
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-200 rounded-md bg-gray-200">
                                <img style={{width: 10, height: 16}} src={require("../../images/left_arrow_grey.svg").default} alt="left_arrow" />
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded-md">1</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">2</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">3</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
                                <img style={{width: 10, height: 16}} src={require("../../images/right_arrow_grey.svg").default} alt="right_arrow" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default MainContent;