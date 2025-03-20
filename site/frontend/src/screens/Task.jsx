import Footer from '../layouts/Footer.jsx';
import Info from '../components/task/info.jsx';
import ButtonsPanel from '../components/task/buttonsPanel.jsx';
import RoleHeader from '../components/RoleHeader/RoleHeader.js';

function Task() {
    return (
        <div>
            <RoleHeader />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-3 gap-8">
                    <Info />
                    <ButtonsPanel />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Task;