import Hero from '../components/main/hero.js';
import Stats from '../components/main/stats.js';
import FeaturedProjects from '../components/main/featuredProjects.js';
import HowItWorks from '../components/main/howItWorks.js';
import Header from '../layouts/Header.js';
import Footer from '../layouts/Footer.js';

function Main() {
    return (
        <div>
            <Header />
            <Hero />
            <Stats />
            <FeaturedProjects />
            <HowItWorks />
            <Footer />
        </div>
    );
}

export default Main;