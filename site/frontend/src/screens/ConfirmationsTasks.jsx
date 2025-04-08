import { useParams } from "react-router";
import Content from "../components/confirmationsTasks/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import { Helmet } from 'react-helmet';

function ConfirmationsTasks() {
    const { taskId } = useParams();
    return (
        <div className="h-full text-base-content">
            <Helmet>
                <title>Подтверждение участие в задании</title>
            </Helmet>
            <RoleHeader />
            <div className="min-h-screen bg-neutral-50">
                <Content taskId={taskId} />
            </div>
        </div>
    );
}

export default ConfirmationsTasks;
