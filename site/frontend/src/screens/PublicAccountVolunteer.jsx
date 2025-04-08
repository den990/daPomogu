import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { userServiceApi } from "../utils/api/user_service";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import { AuthContext } from "../context/AuthProvider";
import Profile from "../components/publicAccountVolunteer/profile";
import { Helmet } from 'react-helmet';

function PublicAccountVolonteer() {
    const { volonteerId } = useParams();
    const { token } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (token) {
            userServiceApi
                .getVolonteerProfileById(token, volonteerId)
                .then((data) => {
                    setProfile(data);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке профиля волонтёра:", error);
                });
        }
        userServiceApi.getAvatarByID(volonteerId)
                    .then((blob) => {
                        const url = URL.createObjectURL(blob);
                        setImageUrl(url);
                    })
                    .catch(() => {
                        console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
                    });

        setIsLoading(false);
    }, [token, volonteerId]);

    return (
        <div>
             <Helmet>
                <title>{profile ? `${profile.name} ${profile.surname}`  : "Загрузка..."}</title>
            </Helmet>
            <RoleHeader />
            {isLoading ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                Загрузка данных волонтера...
            </div>
            ) :
            (
                <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-start-2">
                        <Profile profile={profile} imageUrl={imageUrl} />
                    </div>
                </div>
            </div>
            )

            }
        </div>
    );
}

export default PublicAccountVolonteer;
