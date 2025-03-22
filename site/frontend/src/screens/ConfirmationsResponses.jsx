import { useParams } from "react-router";
import Content from "../components/ConfirmationsResponses/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function ConfirmationsResponses() {
    const { taskId } = useParams();
    return (
        <div className="h-full text-base-content">
            <RoleHeader />
            <div className="min-h-screen bg-neutral-50">
                <h1>Задание: {taskId}</h1>
                <Content />
            </div>
        </div>
    );
}

export default ConfirmationsResponses;
