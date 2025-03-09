import Header from "../components/adminEditOrganizationProfile/header";
import Content from "../components/adminEditOrganizationProfile/content";
import HeaderAdmin from "../layouts/HeaderAdmin";
import SideBar from "../components/adminPanel/sidebar";

function AdminEditOrganizationProfile() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <HeaderAdmin />
                <Header />
                <SideBar />
                <Content />
            </div>
        </div>
    );
}

export default AdminEditOrganizationProfile;