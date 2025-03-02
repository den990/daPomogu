import LeftPanel from "../components/volunteerRegistration/leftPanel";
import RegistrationForm from "../components/organizationRegistration/registrationForm";

function OrganizationRegistration() {
    return (
        <body class="h-full text-base-content">
            <div id="auth-page" class="min-h-screen bg-gray-50">
                <div class="flex min-h-screen">
                    <LeftPanel />
                    <RegistrationForm />
                </div>
            </div>
        </body>
    );
}

export default OrganizationRegistration;