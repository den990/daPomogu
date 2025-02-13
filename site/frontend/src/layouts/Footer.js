import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
function Footer() {
    return (
        <footer className="container flex-shrink-0 mb-3 mt-4">
            <div className="d-flex justify-content-between">
                <div className="text-secondary">+7 777 77-77-77</div>
                <div className="text-secondary">info@volunteers.ru</div>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <img className="img-fluid ms-1" src="/images/main/facebook.png"></img>
                <img className="img-fluid ms-1" src="/images/main/instagram.png"></img>
                <img className="img-fluid ms-1" src="/images/main/twitter.png"></img>
                <img className="img-fluid ms-1" src="/images/main/in.png"></img>
            </div>
        </footer>
    );
}

export default Footer;