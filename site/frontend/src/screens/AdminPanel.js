import SideBar from '../components/adminPanel/sidebar.js';
import Dashboard from '../components/adminPanel/dashboard.js';

function AdminPanel() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <SideBar />
            <Dashboard />
        </div>
    );
}

export default AdminPanel;