import { useParams } from "react-router";
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

    useEffect(() => {
        setIsLoading(true);
        
        const fetchData = async () => {
            try {
                const profileData = await userServiceApi.getOrganizationProfileById(organizationId);
                setProfile(profileData);
                
                if (profileData?.tasks) {
                    setTasks(profileData.tasks);
                }

                try {
                    const blob = await userServiceApi.getAvatarByID(1);
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);
                } catch (avatarError) {
                    console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
                }
            } catch (error) {
                console.error("Ошибка при загрузке профиля организации:", error);
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
                    <Profile profile={profile} imageUrl={imageUrl} />
                    <ActiveTasks tasks={tasks} />
                </main>
            )}
        </div>
    );
}

export default PublicAccountOrganization;