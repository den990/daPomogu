import Profile from "../components/accountOrganization/profile.jsx";
import ActiveTasks from "../components/accountOrganization/activeTasks.jsx";
import Stats from "../components/accountOrganization/stats.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { Helmet } from 'react-helmet';

function AccountOrganization() {
    return (
        <div>
            <Helmet>
                <title>Мой профиль</title>
            </Helmet>
            <RoleHeader />
            <main className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Profile />
                <ActiveTasks />
                <Stats />
            </main>
        </div>
    );
}

export default AccountOrganization;
