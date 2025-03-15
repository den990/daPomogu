import Profile from '../components/accountOrganization/profile.js';
import ActiveTasks from '../components/accountOrganization/activeTasks.js';
import Volunteers from '../components/accountOrganization/volunteers.js';
import Stats from '../components/accountOrganization/stats.js';
import RoleHeader from '../components/RoleHeader/RoleHeader.js';


function AccountOrganization() {
    return (
        <div>
            <RoleHeader />
            <main className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Profile />
                <ActiveTasks />
                <Volunteers />
                <Stats />
            </main>
        </div>
    );
}

export default AccountOrganization;