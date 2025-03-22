import { useState, useEffect } from "react";
import Content from "../components/adminRegistrateOrganizationProfile/content";
import SideBar from "../components/adminRegistrateOrganizationProfile/sidebar";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function AdminRegistrateOrganizationProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <RoleHeader />
            <div className="flex flex-1 relative">
                <SideBar 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen}
                />
                
                <div className="flex-1 md:ml-64">
                    <Content 
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminRegistrateOrganizationProfile;