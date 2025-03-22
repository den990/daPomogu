import { useLocation } from "react-router";
import ErrorWindow from "../components/errorMessage/error";

function Error() {
    const location = useLocation();
    const errorCode = location.state?.errorCode || 404;
    const errorMessage = location.state?.errorMessage || "Ой, кажется, вы попали на страницу, которой не существует.";

    return (
        <div className="h-full text-base-content">
            <ErrorWindow errorCode={errorCode} errorMessage={errorMessage} />
        </div>
    );
}

export default Error;
