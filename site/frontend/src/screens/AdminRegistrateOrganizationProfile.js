import Content from "../components/adminRegistrateOrganizationProfile/content";
import SideBar from "../components/adminPanel/sidebar";
import RoleHeader from "../components/RoleHeader";

function AdminRegistrateOrganizationProfile() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <RoleHeader/>
                <SideBar />
                <Content />
            </div>
        </div>
    );
}

export default AdminRegistrateOrganizationProfile;