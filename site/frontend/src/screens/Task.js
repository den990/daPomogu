import HeaderGuest from '../layouts/HeaderGuest.js';
import Footer from '../layouts/Footer.js';
import Info from '../components/task/info.js';
import ButtonsPanel from '../components/task/buttonsPanel.js';

function Task() {
    return (
        <div>
            <HeaderGuest />
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