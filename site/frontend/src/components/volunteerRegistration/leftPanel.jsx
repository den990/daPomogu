import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function LeftPanel() {
    return (
        <div id="left-panel" className="hidden lg:flex lg:w-1/2 bg-red-600 relative overflow-hidden">
            <div className="flex flex-col justify-center px-12 py-12 relative z-10">
                <h1 className="text-4xl font-bold text-white mb-6">Присоединяйтесь к сообществу волонтеров</h1>
                <p className="text-white/90 text-lg mb-8">Помогайте другим и делайте мир лучше вместе с нами</p>

                <Link to={ROUTES.REGISTER_ORGANIZATION} className="mt-8 animate-fade-in-up">
                    <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 px-6 py-3 rounded-full text-white font-medium flex items-center gap-2 transform hover:scale-105">
                        <span>Я представляю организацию</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </Link>
            </div>
            <div className="absolute inset-0 opacity-20">
                <div className="animate-float-1 w-64 h-64 bg-white rounded-full absolute top-1/4 left-1/4"></div>
                <div className="animate-float-2 w-48 h-48 bg-white rounded-full absolute top-1/2 right-1/4"></div>
            </div>
        </div>
    );
}

export default LeftPanel;
