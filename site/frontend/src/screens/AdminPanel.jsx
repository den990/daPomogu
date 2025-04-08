import SideBar from "../components/adminPanel/sidebar.jsx";
import Dashboard from "../components/adminPanel/dashboard.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { useState } from "react";
import { Helmet } from 'react-helmet';

function AdminPanel() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Helmet>
                <title>Админ панель</title>
            </Helmet>
            <RoleHeader />
            <div className="flex flex-1 relative">
                <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <div className="flex-1 md:ml-64">
                    <Dashboard isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
