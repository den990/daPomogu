import { motion } from "framer-motion";
import LeftPanel from "../components/organizationRegistration/leftPanel";
import RegistrationForm from "../components/organizationRegistration/registrationForm";
import { useState } from "react";
import PopUp from "../layouts/popUp/PopUp";
import ROUTES from "../constants/routes";

function OrganizationRegistration() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    return (
        <>
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
                mainMessage={"Заявка на регистрацию успешна отправлена!"}
                subMessage={"В кратчайшие сроки мы её рассмотрим"}
                buttonMessage={"Вернуться на главную"}
                link={ROUTES.HOME}
            />
        </>
    );
}

export default OrganizationRegistration;
