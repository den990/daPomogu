import Content from "../components/editPassword/content";
import RoleHeader from "../components/RoleHeader";

function EditPassword() {
    return (
        <div className="h-full text-base-content">
            <div id="profile-edit-page" className="min-h-screen bg-gray-50">
                <RoleHeader />
                <Content />
            </div>
        </div>
    );
}

export default EditPassword;