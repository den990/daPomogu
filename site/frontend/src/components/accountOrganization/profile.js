import { Link } from "react-router";
import ROUTES from "../../constants/routes";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useState, useEffect } from "react";
import { userServiceApi } from "../../utils/api/user_service";

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            userServiceApi.getMyOrganizationProfile(token)
                .then(data => setProfileData(data))
                .catch(error => console.error('Ошибка при загрузке профиля:', error));
        }
    }, [token]);

    return (
        <section className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <img 
                    className="w-full md:w-48 h-48 rounded-lg object-cover self-center"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cb61e8f45a-5ee863536d744c529bb2.png" 
                    alt="Логотип организации" 
                />
                
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        {profileData?.name || "Загрузка..."}
                    </h2>
                    
                    <p className="text-gray-600 text-sm md:text-base">
                        Описание организации и её миссии. Мы помогаем людям и делаем мир лучше через волонтерскую деятельность.
                    </p>

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
                            to={ROUTES.EDIT_ORGANIZATION_PROFILE}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                            <span className="text-white"></span>
                            Редактировать профиль
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;