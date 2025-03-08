import HeaderOrganization from "../layouts/HeaderOrganization";
import Content from "../components/editProfileOrganization/content";

function EditOrganizationProfile() {
    return (
        <div className="h-full text-base-content">
            <div id="profile-edit-page" className="min-h-screen bg-gray-50">
                <HeaderOrganization />
                <Content />
            </div>
        </div>
    );
}

export default EditOrganizationProfile;