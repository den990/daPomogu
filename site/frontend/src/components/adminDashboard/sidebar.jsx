import { Link } from "react-router";
import ROUTES from "../../constants/routes";

function Sidebar({ isOpen, onClose }) {
    return (
      <>
        <aside 
          id="sidebar" 
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                <img style={{ width: 20, height: 20 }} src={require("../../images/heart_red.svg").default} alt="heart" />
                ДаПомогу-Админ
            </h2>
          </div>
          <nav className="mt-4">
             <Link to={ROUTES.ADMIN_PANEL} className="flex items-center gap-3 px-4 py-3 md:px-6 text-gray-700 hover:bg-gray-50 rounded-lg mb-1">
                  <img className="w-4 h-4" src={require("../../images/graphic_dark.svg").default} alt="graphic" />
                  <span className="ml-3 text-sm md:text-base">Главная</span>
              </Link>
              <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center gap-3 px-4 py-3 md:px-6 text-red-600 bg-red-50 rounded-lg mb-1">
                  <img className="w-5 h-4" src={require("../../images/people_red.svg").default} alt="people" />
                  <span className="ml-3 text-sm md:text-base">Пользователи</span>
              </Link>
              <a href="/#" className="flex items-center gap-3 px-4 py-3 md:px-6 text-gray-700 hover:bg-gray-50 rounded-lg mb-1">
                  <img className="w-4 h-4" src={require("../../images/stats_grey.svg").default} alt="stats" />
                  <span className="ml-3 text-sm md:text-base">Задания</span>
              </a>
              <Link to={ROUTES.ADMIN_REGISTER_ORGANIZATION} className="flex items-center gap-3 px-4 py-3 md:px-6 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <img style={{width: 18, height: 16}} src={require("../../images/application_grey.svg").default} alt="application" />
                  <span className="ml-3 text-sm md:text-base">Заявки</span>
              </Link>
          </nav>
        </aside>
        {isOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/50 md:hidden" 
            onClick={onClose}
          />
        )}
      </>
    );
  }
  
  export default Sidebar;