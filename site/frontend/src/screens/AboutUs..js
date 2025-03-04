import Mission from '../components/aboutUs/mission.js';
import Team from '../components/aboutUs/team.js';
import Contact from '../components/aboutUs/contact.js';
import Faq from '../components/aboutUs/faq.js';
import Header from '../layouts/Header.js';
import Footer from '../layouts/Footer.js';


function AboutUs() {
    return (
        <div>
            <Header />
            <Mission />
            <Team />
            <Contact />
            <Faq />
            <Footer />
        </div>
    );
}

export default AboutUs