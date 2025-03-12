import HeaderVolunteer from "../layouts/HeaderVolunteer";
import Content from "../components/editPassword/content";

function EditPassword() {
    return (
        <div className="h-full text-base-content">
            <div id="profile-edit-page" className="min-h-screen bg-gray-50">
                <HeaderVolunteer />
                <Content />
            </div>
        </div>
    );
}

export default EditPassword;