import { useState } from "react";
import FormHeader from "../components/createTask/formHeader";
import TaskForm from "../components/createTask/taskForm";
import RoleHeader from "../components/RoleHeader/RoleHeader";
import { motion } from "framer-motion";
import PopUp from "../layouts/popUp/PopUp";
import ROUTES from "../constants/routes";
import { Helmet } from 'react-helmet';

function CreateTask() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);

    return (
        <>
            <Helmet>
                <title>Создать задание</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`h-full text-base-content ${isPopUpVisible ? "blurred" : ""}`}
            >
                <div className="bg-gray-50 min-h-screen">
                    <RoleHeader />
                    <main id="main-content" className="container mx-auto px-4 py-6 md:py-8">
                        <div className="max-w-full md:max-w-3xl mx-auto">
                            <FormHeader isNew={true}/>
                            <TaskForm onSuccess={() => setIsPopUpVisible(true)} />
                        </div>
                    </main>
                </div>
            </motion.div>
            <PopUp
                isVisible={isPopUpVisible}
                onClose={() => setIsPopUpVisible(false)}
                mainMessage={"Вы успешно создали задание!"}
                subMessage={""}
                buttonMessage={"Мои задания"}
                link={ROUTES.ORGANIZATION_TASKS}
            />
        </>
    );
}

export default CreateTask;
