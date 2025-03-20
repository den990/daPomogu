import SideBar from '../components/adminPanel/sidebar.js';
import Dashboard from '../components/adminPanel/dashboard.js';
import RoleHeader from '../components/RoleHeader/RoleHeader.js';

function AdminPanel() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <RoleHeader />
            <SideBar />
            <Dashboard />
        </div>
    );
}

export default AdminPanel;