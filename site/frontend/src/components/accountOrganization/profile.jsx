import { Link } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import ROUTES from "../../constants/routes";

function Profile() {
    const { profile, loading, imageUrl } = useContext(AuthContext);

    return (
        <section className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                {imageUrl ? (
                        <img
                            src={imageUrl}
                            className="w-full md:w-48  h-48 rounded-lg object-cover self-center"
                            alt="volunteer"
                        />
                    ) : (
                        <div className="w-full md:w-48  h-48 rounded-lg object-cover self-center bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">
                                {profile?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                    )}
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {loading ? "Загрузка..." : profile ? profile.name : "Нет данных"}
                    </h2>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                        <Link
                            to={ROUTES.ATTACHMENTS_ORGANIZATION}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                            <img
                                className="w-5 h-4"
                                src={require("../../images/registration_white.svg").default}
                                alt="Иконка регистрации"
                            />
                            Заявки на вступление
                        </Link>
                        <Link
                            to={ROUTES.CREATE_TASK}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                            <img
                                className="w-4 h-4"
                                src={require("../../images/add_white.svg").default}
                                alt="Иконка добавления"
                            />
                            Добавить задание
                        </Link>
                        <Link
                            to={ROUTES.EDIT_PASSWORD}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                            Сменить пароль
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
