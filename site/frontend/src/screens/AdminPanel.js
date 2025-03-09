import SideBar from '../components/adminPanel/sidebar.js';
import Dashboard from '../components/adminPanel/dashboard.js';
import HeaderAdmin from '../layouts/HeaderAdmin.js';

function AdminPanel() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <HeaderAdmin />
            <SideBar />
            <Dashboard />
        </div>
    );
}

export default AdminPanel;