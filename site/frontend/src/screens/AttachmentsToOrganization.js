import Content from "../components/attachmentsToOrganization/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function AttachmentsToOrganization() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <RoleHeader />
                <Content />
            </div>
        </div>
    );
}

export default AttachmentsToOrganization;