import Mission from '../components/aboutUs/mission.js';
import Faq from '../components/aboutUs/faq.js';
import HeaderGuest from '../layouts/HeaderGuest.js';
import Footer from '../layouts/Footer.js';


function AboutUs() {
    return (
        <div>
            <HeaderGuest />
            <Mission />
            <Faq />
            <Footer />
        </div>
    );
}

export default AboutUs