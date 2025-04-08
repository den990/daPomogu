import Mission from "../components/aboutUs/mission.jsx";
import Faq from "../components/aboutUs/faq.jsx";
import Footer from "../layouts/Footer.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { Helmet } from 'react-helmet';

function AboutUs() {
    return (
        <div>
            <Helmet>
                <title>О нас</title>
            </Helmet>
            <RoleHeader />
            <Mission />
            <Faq />
            <Footer />
        </div>
    );
}

export default AboutUs;
