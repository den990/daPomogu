import Footer from '../layouts/Footer';
import RoleHeader from '../components/RoleHeader/RoleHeader';
import Info from '../components/task/info';
import ButtonsPanel from '../components/task/buttonsPanel';

function Task() {
    return (
        <div className="min-h-screen flex flex-col">
            <RoleHeader />
            
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Info />
                        </div>
                        <div className="lg:col-span-1">
                            <ButtonsPanel />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Task;