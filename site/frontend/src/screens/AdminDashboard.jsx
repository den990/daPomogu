import { useState, useEffect } from 'react';
import Sidebar from "../components/adminDashboard/sidebar";
import MainContent from "../components/adminDashboard/mainContent";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <RoleHeader />
            <div className="flex flex-1 relative">
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen}
                />
                <div className="flex-1 md:ml-64 overflow-x-auto">
                    <MainContent
                        isSidebarOpen={isSidebarOpen} 
                        setIsSidebarOpen={setIsSidebarOpen} 
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;