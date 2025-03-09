import Content from "../components/adminRegistrateOrganizationProfile/content";
import HeaderAdmin from "../layouts/HeaderAdmin";
import SideBar from "../components/adminPanel/sidebar";

function AdminRegistrateOrganizationProfile() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <HeaderAdmin />
                <SideBar />
                <Content />
            </div>
        </div>
    );
}

export default AdminRegistrateOrganizationProfile;