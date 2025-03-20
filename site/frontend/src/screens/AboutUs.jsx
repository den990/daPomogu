import Mission from '../components/aboutUs/mission.jsx';
import Faq from '../components/aboutUs/faq.jsx';
import Footer from '../layouts/Footer.jsx';
import RoleHeader from '../components/RoleHeader/RoleHeader.js';


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