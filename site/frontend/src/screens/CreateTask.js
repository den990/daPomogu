import FormHeader from "../components/createTask/formHeader";
import TaskForm from "../components/createTask/taskForm";

function CreateTask() {
    return (
        <main id="main-content" class="container mx-auto px-4 py-8">
            <div class="max-w-3x1 mx-auto">
                <FormHeader />
                <TaskForm />
            </div>
        </main>
    );
}

export default CreateTask;