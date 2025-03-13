import Content from "../components/editProfileVolunteer/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function EditVolunteerProfile() {
    return (
        <div className="h-full text-base-content">
            <div id="profile-edit-page" className="min-h-screen bg-gray-50">
                <RoleHeader />
                <Content />
            </div>
        </div>
    );
}

export default EditVolunteerProfile;