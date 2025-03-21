import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function FeaturedProjects() {
    return (
        <section id="featured-projects" className="py-8 md:py-16 bg-gray-50" style={{ position: 'relative', zIndex: 20 }}>
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Актуальные проекты</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                        <img 
                            className="w-full h-40 md:h-48 object-cover" 
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/39939d80fb-d0c4fe7ed9132296571f.png" 
                            alt="Помощь пожилым" 
                        />
                        <div className="p-4 md:p-6 flex flex-col flex-grow">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Помощь пожилым людям</h3>
                            <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                                Требуются волонтеры для помощи пожилым людям с покупками и бытовыми задачами
                            </p>
                            <div className="mt-auto space-y-3">
                                <div className="text-red-600 text-sm md:text-base text-center">
                                    Требуется: 5 человек
                                </div>
                                <Link 
                                    to={ROUTES.TASK} 
                                    className="w-full md:w-3/4 mx-auto block px-4 py-2 bg-red-600 text-white rounded-lg 
                                    hover:bg-red-700 whitespace-nowrap text-center text-sm md:text-base"
                                >
                                    Участвовать
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                        <img 
                            className="w-full h-40 md:h-48 object-cover" 
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d76fd2a961-c3ac1e20715833d5dd24.png" 
                            alt="Уборка парка" 
                        />
                        <div className="p-4 md:p-6 flex flex-col flex-grow">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Уборка парка</h3>
                            <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                                Организация субботника в городском парке. Присоединяйтесь к нашей команде!
                            </p>
                            <div className="mt-auto space-y-3">
                                <div className="text-red-600 text-sm md:text-base text-center">
                                    Требуется: 15 человек
                                </div>
                                <Link 
                                    to={ROUTES.TASK} 
                                    className="w-full md:w-3/4 mx-auto block px-4 py-2 bg-red-600 text-white rounded-lg 
                                    hover:bg-red-700 whitespace-nowrap text-center text-sm md:text-base"
                                >
                                    Участвовать
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                        <img 
                            className="w-full h-40 md:h-48 object-cover" 
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bb66576ffc-881036eb604606846525.png" 
                            alt="Обучение детей" 
                        />
                        <div className="p-4 md:p-6 flex flex-col flex-grow">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Обучение детей</h3>
                            <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                                Нужны волонтеры для проведения развивающих занятий с детьми
                            </p>
                            <div className="mt-auto space-y-3">
                                <div className="text-red-600 text-sm md:text-base text-center">
                                    Требуется: 3 человека
                                </div>
                                <Link 
                                    to={ROUTES.TASK} 
                                    className="w-full md:w-3/4 mx-auto block px-4 py-2 bg-red-600 text-white rounded-lg 
                                    hover:bg-red-700 whitespace-nowrap text-center text-sm md:text-base"
                                >
                                    Участвовать
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedProjects;