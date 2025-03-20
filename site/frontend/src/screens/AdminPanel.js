import { useState } from 'react';
import Sidebar from '../components/adminPanel/sidebar';
import Dashboard from '../components/adminPanel/dashboard';
import RoleHeader from '../components/RoleHeader/RoleHeader';

function AdminPanel() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <RoleHeader />
            <div className="flex flex-1 relative">
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen} 
                />
                <div className="flex-1 md:ml-64">
                    <Dashboard 
                        isSidebarOpen={isSidebarOpen} 
                        setIsSidebarOpen={setIsSidebarOpen} 
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;