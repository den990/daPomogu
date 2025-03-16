import { useState } from 'react';
import Sidebar from "../components/adminDashboard/sidebar";
import MainContent from "../components/adminDashboard/mainContent";

function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-full text-base-content">
      <div id="admin-dashboard" className="min-h-screen bg-gray-50">
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <MainContent 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;