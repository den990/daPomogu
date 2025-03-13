import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

function Profile() {
    const { logout } = useContext(AuthContext);

    return (
        <section id="org-profile" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-6">
                <img className="w-48 h-48 rounded-lg object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cb61e8f45a-5ee863536d744c529bb2.png" alt="humanitarian organization logo with volunteers in red and white colors" />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Название Организации</h2>
                    <p className="text-gray-600 mb-4">Описание организации и её миссии. Мы помогаем людям и делаем мир лучше через волонтерскую деятельность.</p>
                    <div className="flex space-x-4">
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center">
                            <img style={{width: 20, height: 16}} src={require("../../images/registration_white.svg").default} alt="registration" />
                            <Link to={ROUTES.ATTACHMENTS_ORGANIZATION} style={{ paddingLeft: 10}}>Заявки на вступление</Link>
                        </button>
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center">
                            <img style={{width: 16, height: 16}} src={require("../../images/add_white.svg").default} alt="add" />
                            <Link to={ROUTES.CREATE_TASK} style={{ paddingLeft: 10}}>Добавить задание</Link>
                        </button>
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center">
                            <Link to={ROUTES.EDIT_ORGANIZATION_PROFILE}>Редактировать профиль</Link>
                        </button>
                        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                            <Link to={ROUTES.HOME} onClick={logout}>
                                Выйти
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;