import './App.css';
import AboutUs from './screens/AboutUs.';
import Task from './screens/Task';
import AccountVolunteer from './screens/AccountVolunteer';
import TasksCatalog from './screens/TasksCatalog';
import Main from './screens/Main';
import AdminPanel from './screens/AdminPanel';
import VolunteerRegistration from './screens/VolunteerRegistration';
import OrganizationRegistration from './screens/OrganizationRegistration';
import CreateTask from './screens/CreateTask';
import  { BrowserRouter as Router, Routes, Route } from 'react-router';
import AccountOrganization from './screens/AccountOrganization';
import Login from './screens/Login';
import Chat from './screens/Chat';
import AttachmentsToOrganization from './screens/AttachmentsToOrganization';
import PhotoReport from './screens/PhotoReport';
import AdminDashboard from './screens/AdminDashboard';
import EditVolunteerProfile from './screens/EditVolunteerProfile';

function App() {
    return (
        <Router>
            <div className="h-100 d-flex flex-column">
                <div className="App flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/task" element={<Task />} />
                        <Route path="/account-volunteer" element={<AccountVolunteer />} />
                        <Route path="/account-organization" element={<AccountOrganization />} />
                        <Route path="/tasks-catalog" element={<TasksCatalog />} />
                        <Route path="/admin-panel" element={<AdminPanel />} />
                        <Route path="/registration-volunteer" element={<VolunteerRegistration />} />
                        <Route path="/create-task" element={<CreateTask />} />
                        <Route path="/registration-organization" element={<OrganizationRegistration />} />
                        <Route path="/chat" element={<Chat/>} />
                        <Route path="/attachments-to-organization" element={<AttachmentsToOrganization />} />
                        <Route path="/photo-report" element={<PhotoReport />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/edit-volunteer-profile" element={<EditVolunteerProfile />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
