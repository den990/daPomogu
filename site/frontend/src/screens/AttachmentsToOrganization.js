import Header from "../components/attachmentsToOrganization/header";
import Content from "../components/attachmentsToOrganization/content";

function AttachmentsToOrganization() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <Header />
                <Content />
            </div>
        </div>
    );
}

export default AttachmentsToOrganization;