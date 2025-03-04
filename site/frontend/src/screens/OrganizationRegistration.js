import LeftPanel from "../components/organizationRegistration/leftPanel";
import RegistrationForm from "../components/organizationRegistration/registrationForm";

function OrganizationRegistration() {
    return (
        <div className="h-full text-base-content">
            <div id="auth-page" className="min-h-screen bg-gray-50">
                <div className="flex min-h-screen">
                    <LeftPanel />
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}

export default OrganizationRegistration;