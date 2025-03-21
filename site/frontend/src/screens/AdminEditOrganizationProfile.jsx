import { useState, useEffect } from "react";
import Content from "../components/adminEditOrganizationProfile/content";
import SideBar from "../components/adminPanel/sidebar";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function AdminEditOrganizationProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    
    handleResize();
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
          className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300
            bg-white shadow-xl md:relative md:translate-x-0`}
        />
        
        <Content 
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
    </div>
  );
}

export default AdminEditOrganizationProfile;