import Content from "../components/editProfileOrganization/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function EditOrganizationProfile() {
    return (
        <div className="h-full text-base-content">
            <div id="profile-edit-page" className="min-h-screen bg-gray-50">
                <RoleHeader />
                <Content />
            </div>
        </div>
    );
}

export default EditOrganizationProfile;
