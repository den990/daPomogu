import Hero from '../components/main/hero.js';
import FeaturedProjects from '../components/main/featuredProjects.js';
import HowItWorks from '../components/main/howItWorks.js';
import Footer from '../layouts/Footer.js';
import RoleHeader from '../components/RoleHeader.js';

function Main() {
    return (
        <div>
            <RoleHeader />
            <Hero />
            <FeaturedProjects />
            <HowItWorks />
            <Footer />
        </div>
    );
}

export default Main;