import Sidebar from "../components/adminDashboard/sidebar.jsx";
import MainContent from "../components/adminDashboard/mainContent.jsx";
import RoleHeader from '../components/RoleHeader/RoleHeader.js';
import { useState } from 'react';

function AdminDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-full text-base-content">
      <div id="admin-dashboard" className="min-h-screen bg-gray-50">
        <RoleHeader />
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