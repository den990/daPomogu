export default function Sidebar({ isOpen, onClose }) {
    return (
      <>
        <aside 
          id="sidebar" 
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          <div className="p-4 md:p-6">
            <h2 className="text-xl font-bold text-red-600">Волонтерская Платформа</h2>
          </div>
          <nav className="mt-4">
            <a href="/#" className="flex items-center px-4 py-3 md:px-6 text-gray-700 bg-red-50">
              <img 
                className="w-5 h-4" 
                src={require("../../images/people_dark.svg").default} 
                alt="icon"
              />
              <span className="ml-3 text-sm md:text-base">Пользователи &amp; Организации</span>
            </a>
            <a href="/#" className="flex items-center px-4 py-3 md:px-6 text-gray-600 hover:bg-red-50">
              <img 
                className="w-4 h-4" 
                src={require("../../images/graphic_dark.svg").default} 
                alt="icon"
              />
              <span className="ml-3 text-sm md:text-base">Аналитика</span>
            </a>
            <a href="/#" className="flex items-center px-4 py-3 md:px-6 text-gray-600 hover:bg-red-50">
              <img 
                className="w-4 h-4" 
                src={require("../../images/settings_dark.svg").default} 
                alt="icon"
              />
              <span className="ml-3 text-sm md:text-base">Настройки</span>
            </a>
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