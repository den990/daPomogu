import "./App.css";
import AboutUs from "./screens/AboutUs";
import AccountVolunteer from "./screens/AccountVolunteer";
import TasksCatalog from "./screens/TasksCatalog";
import Main from "./screens/Main";
import AdminPanel from "./screens/AdminPanel";
import Task from "./screens/Task";
import VolunteerRegistration from "./screens/VolunteerRegistration";
import OrganizationRegistration from "./screens/OrganizationRegistration";
import CreateTask from "./screens/CreateTask";
import AccountOrganization from "./screens/AccountOrganization";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import AttachmentsToOrganization from "./screens/AttachmentsToOrganization";
import PhotoReport from "./screens/PhotoReport";
import AdminDashboard from "./screens/AdminDashboard";
import EditVolunteerProfile from "./screens/EditVolunteerProfile";
import AdminEditOrganizationProfile from "./screens/AdminEditOrganizationProfile";
import EditOrganizationProfile from "./screens/EditOrganizationProfile";
import ConfirmationsTasks from "./screens/ConfirmationsTasks";
import Error from "./screens/Error";
import AdminRegistrateOrganizationProfile from "./screens/AdminRegistrateOrganizationProfile";
import TestAuth from "./screens/TestAuth";
import ROUTES from "./constants/routes";
import { AuthContext, AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EditPassword from "./screens/EditPassword";
import Tasks from "./screens/Tasks";
import { useContext } from "react";
import PublicAccountOrganization from "./screens/PublicAccountOrganization";
import PublicAccountVolonteer from "./screens/PublicAccountVolunteer";
import OrganizationTasks from "./screens/OrganizationTasks";
import ConfirmationsResponses from "./screens/ConfirmationsResponses";

function App() {
    const { loading } = useContext(AuthContext);
    if (loading) {
        return <div>Application Loading...</div>;
    }
    return (
        <AuthProvider>
            <Router>
                <div className="h-100 d-flex flex-column">
                    <div className="App flex-grow-1">
                        <Routes>
                            {/* Гость */}
                            <Route path={ROUTES.HOME} element={<Main />} />
                            <Route path={ROUTES.ABOUT} element={<AboutUs />} />
                            <Route path={ROUTES.LOGIN} element={<Login />} />
                            <Route path={ROUTES.TASKS_CATALOG} element={<TasksCatalog />} />
                            <Route path={ROUTES.REGISTER_VOLUNTEER} element={<VolunteerRegistration />} />
                            <Route path={ROUTES.REGISTER_ORGANIZATION} element={<OrganizationRegistration />} />
                            <Route path={ROUTES.ERROR} element={<Error />} />
                            <Route path={ROUTES.PUBLIC_ACCOUNT_ORGANIZATION} element={<PublicAccountOrganization />} />
                            <Route path={ROUTES.TEST_AUTH} element={<TestAuth />} />

                            {/* Волонтёр */}
                            <Route element={<PrivateRoute />}>
                                <Route path={ROUTES.PUBLIC_ACCOUNT_VOLUNTEER} element={<PublicAccountVolonteer />} />
                                <Route path={ROUTES.EDIT_PASSWORD} element={<EditPassword />} />
                                <Route path={ROUTES.MY_TASKS} element={<Tasks />} />
                                <Route path={ROUTES.ACCOUNT_VOLUNTEER} element={<AccountVolunteer />} />
                                <Route path={`${ROUTES.TASK}/:taskId`} element={<Task />} />
                                <Route path={ROUTES.CHAT} element={<Chat />} />
                                <Route path={ROUTES.PHOTO_REPORT} element={<PhotoReport />} />
                                <Route path={ROUTES.EDIT_VOLUNTEER_PROFILE} element={<EditVolunteerProfile />} />
                            </Route>

                            {/* Организация */}
                            <Route element={<PrivateRoute />}>
                                <Route path={ROUTES.ACCOUNT_ORGANIZATION} element={<AccountOrganization />} />
                                <Route path={ROUTES.CREATE_TASK} element={<CreateTask />} />
                                <Route path={ROUTES.ATTACHMENTS_ORGANIZATION} element={<AttachmentsToOrganization />} />
                                <Route path={ROUTES.EDIT_ORGANIZATION_PROFILE} element={<EditOrganizationProfile />} />
                                <Route path={ROUTES.CONFIRMATIONS_TASKS} element={<ConfirmationsTasks />} />
                                <Route path={ROUTES.ORGANIZATION_TASKS} element={<OrganizationTasks />} />
                                <Route path={ROUTES.CONFIRMATIONS_RESPONSES} element={<ConfirmationsResponses />} />
                            </Route>

                            {/* Администратор */}
                            <Route element={<PrivateRoute />}>
                                <Route path={ROUTES.ADMIN_PANEL} element={<AdminPanel />} />
                                <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
                                <Route
                                    path={ROUTES.ADMIN_EDIT_ORGANIZATION}
                                    element={<AdminEditOrganizationProfile />}
                                />
                                <Route
                                    path={ROUTES.ADMIN_REGISTER_ORGANIZATION}
                                    element={<AdminRegistrateOrganizationProfile />}
                                />
                            </Route>

                            <Route path="*" element={<Error />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
