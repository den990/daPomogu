import Sidebar from "../components/adminDashboard/sidebar.jsx";
import MainContent from "../components/adminDashboard/mainContent.jsx";
import RoleHeader from '../components/RoleHeader/RoleHeader.js';

function AdminDashboard() {
    return (
        <div className="h-full text-base-content">
            <div id="admin-dashboard" className="min-h-screen bg-gray-50">
                <RoleHeader/>
                <Sidebar />
                <MainContent />
            </div>
        </div>
    );
}

export default AdminDashboard;