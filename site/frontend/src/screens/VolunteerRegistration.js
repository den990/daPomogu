import LeftPanel from "../components/volunteerRegistration/leftPanel";
import RegistrationForm from "../components/volunteerRegistration/registrationForm";

function VolunteerRegistration() {
    return (
        <body class="h-full text-base-content">
            <div id="registration-page" class="min-h-screen bg-gray-50">
                <div class="flex min-h-[800px]">
                    <LeftPanel />
                    <RegistrationForm />
                </div>
            </div>
        </body>
    );
}

export default VolunteerRegistration;