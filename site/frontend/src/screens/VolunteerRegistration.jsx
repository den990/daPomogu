import { motion } from "framer-motion";
import LeftPanel from "../components/volunteerRegistration/leftPanel";
import RegistrationForm from "../components/volunteerRegistration/registrationForm";
import { useState } from "react";
import PopUp from "../layouts/popUp/PopUp";
import ROUTES from "../constants/routes";
import { Helmet } from 'react-helmet';
import RoleHeader from "../components/RoleHeader/RoleHeader";

function VolunteerRegistration() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    return (
        <>
            <Helmet>
                <title>Регистрация волонтера</title>
            </Helmet>
            <RoleHeader/>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`h-full text-base-content ${isPopUpVisible ? "blurred" : ""}`}
            >
                <div className="min-h-screen bg-gray-50">
                    <div className="flex min-h-screen">
                        <LeftPanel />
                        <RegistrationForm setIsPopUpVisible={setIsPopUpVisible} />
                    </div>
                </div>
            </motion.div>
            <PopUp
                isVisible={isPopUpVisible}
                onClose={() => setIsPopUpVisible(false)}
                mainMessage={"Регистрация успешна!"}
                subMessage={"Добро пожаловать в команду волонтеров"}
                buttonMessage={"Начать помогать"}
                link={ROUTES.LOGIN}
            />
        </>
    );
}

export default VolunteerRegistration;
