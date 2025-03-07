import Mission from '../components/aboutUs/mission.js';
import Team from '../components/aboutUs/team.js';
import Contact from '../components/aboutUs/contact.js';
import Faq from '../components/aboutUs/faq.js';
import HeaderGuest from '../layouts/HeaderGuest.js';
import Footer from '../layouts/Footer.js';


function AboutUs() {
    return (
        <div>
            <HeaderGuest />
            <Mission />
            <Team />
            <Contact />
            <Faq />
            <Footer />
        </div>
    );
}

export default AboutUs