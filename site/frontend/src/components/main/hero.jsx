import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function hero() {
    return (
        <section
            id="hero"
            className="pt-20 h-[600px] bg-gradient-to-br from-red-50 to-white"
            style={{ position: "relative", zIndex: 10 }}
        >
            <div className="container mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Объединяем неравнодушных людей
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Найдите волонтерские проекты или добровольцев для ваших инициатив
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                to={ROUTES.REGISTER_VOLUNTEER}
                                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Стать волонтером
                            </Link>
                            <Link
                                to={ROUTES.REGISTER_ORGANIZATION}
                                className="px-8 py-3 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                            >
                                Создать проект
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <img
                            style={{ maxWidth: 600 }}
                            className="w-full h-auto rounded-lg shadow-xl"
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/78e1578dcd-f9d3012551e8cf37535a.png"
                            alt="illustration of diverse group of volunteers helping community, modern minimal style, red and white color scheme"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default hero;
