// AdminDashboard.jsx
import { useState, useEffect } from 'react';
import Sidebar from "../components/adminDashboard/sidebar";
import MainContent from "../components/adminDashboard/mainContent";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <RoleHeader />
      
      {/* Мобильная кнопка меню под хедером */}
      {isMobile && (
        <div className="fixed top-16 right-4 z-40">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-1 relative pt-16">
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen}
        />
        <div className="flex-1 md:ml-64 overflow-x-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;