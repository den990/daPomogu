import Hero from '../components/main/hero.js';
import Stats from '../components/main/stats.js';
import FeaturedProjects from '../components/main/featuredProjects.js';
import HowItWorks from '../components/main/howItWorks.js';

function Main() {
    return (
        <div>
            <Hero />
            <Stats />
            <FeaturedProjects />
            <HowItWorks />
        </div>
    );
}

export default Main;