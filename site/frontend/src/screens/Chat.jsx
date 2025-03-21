import { useState } from 'react';
import Header from '../components/chat/header';
import ChatContainer from '../components/chat/chat-container';
import Footer from '../components/chat/footer';
import RoleHeader from '../components/RoleHeader/RoleHeader';

function Chat() {
  const [isApplicationsOpen, setIsApplicationsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <RoleHeader />
      <div className="flex flex-1 bg-neutral-50 p-2 sm:p-4 gap-2 sm:gap-4 relative">
        {/* Мобильное меню */}
        {isApplicationsOpen && (
          <div className="sm:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsApplicationsOpen(false)}>
            <div className="absolute left-0 top-0 h-full w-3/4 bg-white p-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg mb-4 font-medium">Заявки</h2>
              <button
                onClick={() => setIsApplicationsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <div 
                    key={item} 
                    className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        className="h-10 w-10 rounded-full flex-shrink-0" 
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item}`} 
                        alt="Аватар"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium hyphens-auto break-words">
                          Волонтёрская организация #{item}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {item === 1 ? '20 февраля 2025' : '19 февраля 2025'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Десктопная версия */}
        <div className="hidden sm:block sm:w-1/3 md:w-[30%] lg:w-1/4 rounded-lg border bg-white p-2 sm:p-4 h-auto overflow-auto">
          <h2 className="text-sm sm:text-base mb-2 sm:mb-3 font-medium">Заявки</h2>
          <div className="space-y-2 sm:space-y-3">
            {[1, 2].map((item) => (
              <div 
                key={item} 
                className="cursor-pointer rounded-lg border p-2 sm:p-3 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <img 
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex-shrink-0" 
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${item}`} 
                    alt="Аватар"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm md:text-[13px] lg:text-sm font-medium hyphens-auto break-words leading-tight">
                      Волонтёр­ская<br className="hidden md:inline"/> 
                      организа­ция #{item}
                    </p>
                    <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5">
                      {item === 1 ? '20 фев 2025' : '19 фев 2025'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Основной чат */}
        <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col">
          <Header onMenuClick={() => setIsApplicationsOpen(true)} />
          <div className="flex-1 flex flex-col-reverse overflow-auto p-2 sm:p-4">
            <ChatContainer />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Chat;