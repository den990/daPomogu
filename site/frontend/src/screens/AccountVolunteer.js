import Profile from '../components/accountVolunteer/profile.js';
import Tasks from '../components/accountVolunteer/tasks.js';

function AccountVolunteer() {
    return (
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Profile />
                <Tasks />
            </div>
        </div>
    );
}

export default AccountVolunteer;