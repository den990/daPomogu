import { useState } from 'react';
import Sidebar from "../components/adminDashboard/sidebar";
import MainContent from "../components/adminDashboard/mainContent";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <RoleHeader />
      <div className="flex flex-1 relative">
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen}
        />
        <div className="flex-1 md:ml-64 overflow-hidden">
          <MainContent 
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;