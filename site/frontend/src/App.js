import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
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

function App() {
    return (
        <Router>
            <div className="h-100 d-flex flex-column">
                <Header/>
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
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
