import Header from "../components/adminEditOrganizationProfile/header";
import Content from "../components/adminEditOrganizationProfile/content";

function AdminEditOrganizationProfile() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <Header />
                <Content />
            </div>
        </div>
    );
}

export default AdminEditOrganizationProfile;