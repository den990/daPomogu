import FormHeader from "../components/createTask/formHeader";
import TaskForm from "../components/createTask/taskForm";
import Header from "../layouts/Header";

function CreateTask() {
    return (
        <div className="bg-gray-50">
            <Header />
            <main id="main-content" className="container mx-auto px-4 py-8">
                <div className="max-w-3x1 mx-auto">
                    <FormHeader />
                    <TaskForm />
                </div>
            </main>
        </div>
    );
}

export default CreateTask;