import SearchFilters from '../components/tasksCatalog/searchFilters.js';
import Tasks from '../components/tasksCatalog/tasks.js';
import Pagination from '../components/tasksCatalog/pagination.js';

function TasksCatalog() {
    return (
        <main class="pt-20 pb-12">
            <div class="container mx-auto px-4">
                <SearchFilters />
                <Tasks />
                <Pagination />
            </div>
        </main>
    );
}

export default TasksCatalog;