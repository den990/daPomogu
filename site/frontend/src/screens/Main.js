import Hero from '../components/main/hero.js';
import Stats from '../components/main/stats.js';
import FeaturedProjects from '../components/main/featuredProjects.js';
import HowItWorks from '../components/main/howItWorks.js';
import HeaderGuest from '../layouts/HeaderGuest.js';
import Footer from '../layouts/Footer.js';
import HeaderVolunteer from '../layouts/HeaderVolunteer.js';
import HeaderOrganization from '../layouts/HeaderOrganization.js';
import HeaderAdmin from '../layouts/HeaderAdmin.js';

function Main() {
    return (
        <div>
            <HeaderGuest />
            <HeaderVolunteer />
            <HeaderOrganization />
            <HeaderAdmin />
            <Hero />
            <Stats />
            <FeaturedProjects />
            <HowItWorks />
            <Footer />
        </div>
    );
}

export default Main;