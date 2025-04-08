import Hero from "../components/main/hero.jsx";
import FeaturedProjects from "../components/main/featuredProjects.jsx";
import HowItWorks from "../components/main/howItWorks.jsx";
import Footer from "../layouts/Footer.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { Helmet } from 'react-helmet';

function Main() {
    return (
        <div>
            <Helmet>
                <title>Главная</title>
            </Helmet>
            <RoleHeader />
            <Hero />
            <FeaturedProjects />
            <HowItWorks />
            <Footer />
        </div>
    );
}

export default Main;
