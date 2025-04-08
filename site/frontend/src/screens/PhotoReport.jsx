import { useParams } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import Content from "../components/photoReport/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import PopUp from "../layouts/popUp/PopUp";
import ROUTES from "../constants/routes";
import { Helmet } from 'react-helmet';

function PhotoReport() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const { taskId } = useParams();

    return (
        <>
            <Helmet>
                <title>Фотоотчёт</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`h-full text-base-content ${isPopUpVisible ? "blurred" : ""}`}
            >
                <div className="min-h-screen bg-neutral-50">
                    <RoleHeader />
                    <Content taskId={taskId} setIsPopUpVisible={setIsPopUpVisible} />
                </div>
            </motion.div>
            <PopUp
                isVisible={isPopUpVisible}
                onClose={() => setIsPopUpVisible(false)}
                mainMessage={"Вы успешно отправили фотоотчёт!"}
                subMessage={""}
                buttonMessage={"Мои задания"}
                link={ROUTES.MY_TASKS}
            />
        </>
    );
}

export default PhotoReport;
