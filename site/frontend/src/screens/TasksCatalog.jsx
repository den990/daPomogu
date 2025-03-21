import SearchFilters from '../components/tasksCatalog/searchFilters.jsx';
import Tasks from '../components/tasksCatalog/tasks.jsx';
import Pagination from '../layouts/pagination/pagination.jsx';
import Footer from '../layouts/Footer.jsx';
import RoleHeader from '../components/RoleHeader/RoleHeader.js';

function TasksCatalog() {
    return (
        <div>
            <RoleHeader />
            <main className="pt-20 pb-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SearchFilters />
                    <Tasks />
                    <Pagination numberOfPageOut={1} countOfPages={3} />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default TasksCatalog;