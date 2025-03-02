import Banner from '../components/task/banner.js';
import Description from '../components/task/description.js';
import Details from '../components/task/details.js';

function Task() {
    return (
        <div class="container mx-auto px-4">
            <Banner />
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Description />
                <Details />
            </div>
        </div>
    );
}

export default Task;