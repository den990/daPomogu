import Header from "../components/confirmationsTasks/header";
import Content from "../components/confirmationsTasks/content";

function ConfirmationsTasks() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <Header />
                <Content />
            </div>
        </div>
    );
}

export default ConfirmationsTasks;
