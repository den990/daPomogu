import Content from "../components/editProfileVolunteer/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import { Helmet } from 'react-helmet';

function EditVolunteerProfile() {
    return (
        <div className="h-full text-base-content">
            <Helmet>
                <title>Редактирование профиля</title>
            </Helmet>
            <div id="profile-edit-page" className="min-h-screen bg-gray-50">
                <RoleHeader />
                <Content />
            </div>
        </div>
    );
}

export default EditVolunteerProfile;
