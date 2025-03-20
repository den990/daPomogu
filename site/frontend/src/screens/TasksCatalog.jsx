import SearchFilters from '../components/tasksCatalog/searchFilters.js';
import Tasks from '../components/tasksCatalog/tasks.js';
import Pagination from '../components/tasksCatalog/pagination.js';
import Footer from '../layouts/Footer.js';
import RoleHeader from '../components/RoleHeader/RoleHeader.js';

function TasksCatalog() {
    return (
        <div>
            <RoleHeader />
            <main className="pt-20 pb-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SearchFilters />
                    <Tasks />
                    <Pagination />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default TasksCatalog;