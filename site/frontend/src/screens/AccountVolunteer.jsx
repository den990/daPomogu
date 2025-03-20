import Profile from '../components/accountVolunteer/profile.js';
import Tasks from '../components/accountVolunteer/tasks.js';
import RoleHeader from '../components/RoleHeader/RoleHeader.js';

function AccountVolunteer() {
    return (
        <div>
            <RoleHeader />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Profile />
                    <Tasks />
                </div>
            </div>
        </div>
    );
}

export default AccountVolunteer;