import Header from "../components/attachmentsToOrganization/header";
import Content from "../components/attachmentsToOrganization/content";
import HeaderOrganization from "../layouts/HeaderOrganization";

function AttachmentsToOrganization() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <HeaderOrganization />
                <Header />
                <Content />
            </div>
        </div>
    );
}

export default AttachmentsToOrganization;