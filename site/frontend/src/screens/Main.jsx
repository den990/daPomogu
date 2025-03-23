import Hero from "../components/main/hero.jsx";
import FeaturedProjects from "../components/main/featuredProjects.jsx";
import HowItWorks from "../components/main/howItWorks.jsx";
import Footer from "../layouts/Footer.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";

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
