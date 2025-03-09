import Profile from '../components/accountVolunteer/profile.js';
import Tasks from '../components/accountVolunteer/tasks.js';
import HeaderVolunteer from '../layouts/HeaderVolunteer.js';

function AccountVolunteer() {
    return (
        <div>
            <HeaderVolunteer />
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