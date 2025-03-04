import LeftPanel from "../components/volunteerRegistration/leftPanel";
import RegistrationForm from "../components/volunteerRegistration/registrationForm";

function VolunteerRegistration() {
    return (
        <div className="h-full text-base-content">
            <div id="registration-page" className="min-h-screen bg-gray-50">
                <div className="flex min-h-[800px]">
                    <LeftPanel />
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}

export default VolunteerRegistration;