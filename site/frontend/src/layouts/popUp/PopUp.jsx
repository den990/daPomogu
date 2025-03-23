import "../popUp/PopUp.css";
import { Link } from "react-router";

function PopUp({ isVisible, onClose, mainMessage, subMessage, buttonMessage, link }) {
    if (!isVisible) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="text-center pb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <img
                            style={{ width: 21, height: 24 }}
                            src={require("../../images/check_light-green.svg").default}
                            alt="icon"
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{mainMessage}</h3>
                    <p className="text-gray-600 mb-6">{subMessage}</p>
                    <Link
                        onClick={onClose}
                        to={link}
                        className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
                    >
                        {buttonMessage}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PopUp;
