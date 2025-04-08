import ROUTES from "../../constants/routes";
import { Link } from "react-router";

function Users({ users }) {
    return (
        <div id="tasks-section" className="md:col-span-2 mx-2 md:mx-0 md:p-8">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <div id="current-tasks" className="space-y-6">
                    {users.map((user) => (
                        <div key={user.id} className="border rounded-lg p-3 md:p-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={user.avatar_base64}
                                    className="w-12 h-12 rounded-full"
                                    alt="Логотип организации"
                                />
                                <div className="flex-1 min-w-0">
                                    <Link
                                        to={`${ROUTES.PUBLIC_ACCOUNT_VOLUNTEER.replace(
                                            ":volonteerId",
                                            user.id
                                        )}`}
                                        className="font-semibold text-base md:text-lg hover:underline"
                                    >
                                        {user.surname} {user.name} {user.patronymic}
                                    </Link>
                                    
                                </div>
                                <Link
                                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors hover:underline"
                                    to={`${ROUTES.PUBLIC_ACCOUNT_VOLUNTEER.replace(
                                        ":volonteerId",
                                        user.id
                                    )}`}
                                >
                                    Открыть
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Users;
