export default function MainContent({ onMenuToggle }) {
    return (
      <main id="main-content" className="md:ml-64 p-4 md:p-8">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm p-4 flex justify-between items-center">
          <button onClick={onMenuToggle} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                className="w-4 h-4" 
                src={require("../../images/bell_dark.svg").default} 
                alt="icon"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <img 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
              alt="Admin" 
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
  
        {/* Content */}
        <div className="mt-16 md:mt-0">
          <header className="flex justify-between items-center mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Пользователи &amp; Организации</h1>
            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <img 
                  className="w-4 h-4" 
                  src={require("../../images/bell_dark.svg").default} 
                  alt="icon"
                />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </div>
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                alt="Admin" 
                className="w-10 h-10 rounded-full"
              />
            </div>
          </header>
  
          <section className="mb-6 md:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Найти пользователей или организации..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 text-sm md:text-base"
              />
              <img 
                className="absolute left-3 top-3 w-4 h-4 md:w-5 md:h-5"
                src={require("../../images/find_grey.svg").default}
                alt="icon"
              />
            </div>
          </section>
  
          <section className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <div className="p-4 md:p-6">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">Пользователи/Организации</th>
                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">Тип</th>
                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">Статус</th>
                    <th className="text-left pb-3 md:pb-4 text-sm md:text-base">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {/* User Row */}
                  <tr className="border-b border-gray-100">
                    <td className="py-3 md:py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <img
                          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                          alt="User"
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm md:text-base font-medium">John Smith</p>
                          <p className="text-xs md:text-sm text-gray-500">john@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 md:py-4">
                      <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs md:text-sm">
                        Волонтер
                      </span>
                    </td>
                    <td className="py-3 md:py-4">
                      <span className="text-green-600 flex items-center text-sm md:text-base">
                        <img 
                          className="w-4 h-4" 
                          src={require("../../images/check_green.svg").default} 
                          alt="icon"
                        />
                        <span className="ml-2">Active</span>
                      </span>
                    </td>
                    <td className="py-3 md:py-4">
                      <button className="px-2 md:px-3 py-1 text-red-600 hover:bg-red-50 rounded-md flex items-center text-sm md:text-base">
                        <img 
                          className="w-4 h-4" 
                          src={require("../../images/ban_red.svg").default} 
                          alt="icon"
                        />
                        <span className="ml-2">Block</span>
                      </button>
                    </td>
                  </tr>
  
                  {/* Organization Row */}
                  <tr className="border-b border-gray-100">
                    <td className="py-3 md:py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-600" fill="currentColor" viewBox="0 0 384 512">
                            <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm md:text-base font-medium">Red Cross Local</p>
                          <p className="text-xs md:text-sm text-gray-500">contact@redcross.org</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 md:py-4">
                      <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs md:text-sm">
                        Организация
                      </span>
                    </td>
                    <td className="py-3 md:py-4">
                      <span className="text-red-600 flex items-center text-sm md:text-base">
                        <img 
                          className="w-4 h-4" 
                          src={require("../../images/ban_red.svg").default} 
                          alt="icon"
                        />
                        <span className="ml-2">Blocked</span>
                      </span>
                    </td>
                    <td className="py-3 md:py-4">
                      <button className="px-2 md:px-3 py-1 text-green-600 hover:bg-green-50 rounded-md flex items-center text-sm md:text-base">
                        <img 
                          className="w-4 h-4" 
                          src={require("../../images/unlock_green.svg").default} 
                          alt="icon"
                        />
                        <span className="ml-2">Unblock</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="p-4 md:p-6 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm md:text-base text-gray-600">Показаны 1-10 из 56 записей</p>
                <div className="flex gap-2">
                  <button className="px-2 md:px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
                    Назад
                  </button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded-md">1</button>
                  <button className="px-2 md:px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-2 md:px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-2 md:px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
                    Вперед
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }