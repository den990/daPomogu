import Content from "../components/attachmentsToOrganization/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import { Helmet } from 'react-helmet';

function AttachmentsToOrganization() {
    return (
        <div className="h-full text-base-content">
            <Helmet>
                <title>Заявки на прикрепление к организации</title>
            </Helmet>
            <div className="min-h-screen bg-neutral-50">
                <RoleHeader />
                <Content />
            </div>
        </div>
    );
}

export default AttachmentsToOrganization;
