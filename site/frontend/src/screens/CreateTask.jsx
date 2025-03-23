import FormHeader from "../components/createTask/formHeader";
import TaskForm from "../components/createTask/taskForm";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function CreateTask() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <RoleHeader />
            <main id="main-content" className="container mx-auto px-4 py-6 md:py-8">
                <div className="max-w-full md:max-w-3xl mx-auto">
                    <FormHeader />
                    <TaskForm />
                </div>
            </main>
        </div>
    );
}

export default CreateTask;
