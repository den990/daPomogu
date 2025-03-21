import RoleHeader from '../components/RoleHeader/RoleHeader.js';
import Content from '../components/organizationTasks/Content.jsx';
import Pagination from '../layouts/pagination/pagination.jsx';

function Tasks() {
    return (
        <div>
            <RoleHeader />
            <Content />
            <Pagination numberOfPageOut={1} countOfPages={3} />
        </div>
    );
}

export default Tasks;