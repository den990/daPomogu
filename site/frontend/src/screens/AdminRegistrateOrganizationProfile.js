import { useState, useEffect } from "react";
import Content from "../components/adminRegistrateOrganizationProfile/content";
import SideBar from "../components/adminPanel/sidebar";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function AdminRegistrateOrganizationProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Автоматическое закрытие сайдбара на мобильных устройствах
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize(); // Инициализация при монтировании
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <RoleHeader />
      <div className="flex flex-1 overflow-hidden">
        <SideBar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen}
          className={`${isSidebarOpen ? 'w-64' : 'w-0'}
            fixed md:relative h-full z-50 transition-all
            duration-300 bg-white shadow-xl md:shadow-none`}
        />
        
        <Content 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex-1"
        />
      </div>
    </div>
  );
}

export default AdminRegistrateOrganizationProfile;