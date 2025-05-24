import { useParams, useNavigate } from "react-router";
import Profile from "../components/publicAccountOrganization/profile";
import { useEffect, useState } from "react";
import { userServiceApi } from "../utils/api/user_service";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import ActiveTasks from "../components/publicAccountOrganization/activeTasks";
import { Helmet } from 'react-helmet';

function PublicAccountOrganization() {
    const { organizationId } = useParams();
    const [profile, setProfile] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const updateProfile = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const profileData = await userServiceApi.getOrganizationProfileById(organizationId);
                setProfile(profileData.data);
                
                if (profileData?.data.tasks) {
                    setTasks(profileData.data.tasks);
                }

                try {
                    const blob = await userServiceApi.getAvatarOrganizationByID(organizationId);
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                } catch (avatarError) {
                    console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
                }
            } catch (error) {
                console.error("Ошибка при загрузке профиля организации:", error);
                navigate("/error", {
                    state: {
                        errorCode: 404,
                        errorMessage: "Организация не найдена или была удалена."
                    }
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [organizationId]);

    return (
        <div>
            <Helmet>
                <title>{profile ? profile.name : "Загрузка..."}</title>
            </Helmet>
            
            <RoleHeader />
            
            {isLoading ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    Загрузка данных организации...
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Profile
                        profile={profile} 
                        imageUrl={imageUrl} 
                        updateProfile={updateProfile} 
                    />
                    <ActiveTasks tasks={tasks} />
                </main>
            )}
        </div>
    );
}

export default PublicAccountOrganization;