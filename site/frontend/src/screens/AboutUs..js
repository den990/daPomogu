import Mission from '../components/aboutUs/mission.js';
import Faq from '../components/aboutUs/faq.js';
import Footer from '../layouts/Footer.js';
import RoleHeader from '../components/RoleHeader.js';


function AboutUs() {
    return (
        <div>
            <RoleHeader />
            <Mission />
            <Faq />
            <Footer />
        </div>
    );
}

export default AboutUs