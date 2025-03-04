import Banner from '../components/task/banner.js';
import Description from '../components/task/description.js';
import Details from '../components/task/details.js';
import Header from '../layouts/Header.js';
import Footer from '../layouts/Footer.js';

function Task() {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4">
                <Banner />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Description />
                    <Details />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Task;