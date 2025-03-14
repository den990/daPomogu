import { motion } from 'framer-motion';
import LeftPanel from "../components/volunteerRegistration/leftPanel";
import RegistrationForm from "../components/volunteerRegistration/registrationForm";

function VolunteerRegistration() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full text-base-content"
        >
            <div className="min-h-screen bg-gray-50">
                <div className="flex min-h-screen">
                    <LeftPanel />
                    <RegistrationForm />
                </div>
            </div>
        </motion.div>
    );
}

export default VolunteerRegistration;