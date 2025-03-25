import { useParams } from "react-router";
import Content from "../components/confirmationsTasks/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function ConfirmationsTasks() {
    const { taskId } = useParams();
    return (
        <div className="h-full text-base-content">
            <RoleHeader />
            <div className="min-h-screen bg-neutral-50">
                <Content taskId={taskId} />
            </div>
        </div>
    );
}

export default ConfirmationsTasks;
