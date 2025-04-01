import { useParams } from "react-router";
import Profile from "../components/publicAccountOrganization/profile";
import { useEffect, useState } from "react";
import { userServiceApi } from "../utils/api/user_service";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import ActiveTasks from "../components/publicAccountOrganization/activeTasks";

function PublicAccountOrganization() {
    const { organizationId } = useParams();
    const [profile, setProfile] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        userServiceApi
            .getOrganizationProfileById(organizationId)
            .then((data) => {
                setProfile(data);
                if (data && data.tasks) {
                    setTasks(data.tasks);
                }
            })
            .catch((error) => {
                console.error("Ошибка при загрузке профиля организации:", error);
            });
        userServiceApi.getAvatarByID(organizationId)
                    .then((blob) => {
                        const url = URL.createObjectURL(blob);
                        setImageUrl(url);
                    })
                    .catch(() => {
                        console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
                    });
    }, [organizationId]);

    return (
        <div>
            <RoleHeader />
            <main className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Profile profile={profile} imageUrl={imageUrl} />
                <ActiveTasks tasks={tasks} />
            </main>
        </div>
    );
}

export default PublicAccountOrganization;
