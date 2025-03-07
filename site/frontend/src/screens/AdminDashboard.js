import Sidebar from "../components/adminDashboard/sidebar";
import MainContent from "../components//adminDashboard/mainContent";

function AdminDashboard() {
    return (
        <div className="h-full text-base-content">
            <div id="admin-dashboard" className="min-h-screen bg-gray-50">
                <Sidebar />
                <MainContent />
            </div>
        </div>
    );
}

export default AdminDashboard;