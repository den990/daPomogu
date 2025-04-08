import Profile from "../components/accountVolunteer/profile.jsx";
import Tasks from "../components/accountVolunteer/tasks.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { Helmet } from 'react-helmet';

function AccountVolunteer() {
    return (
        <div>
            <Helmet>
                <title>Мой профиль</title>
            </Helmet>
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
