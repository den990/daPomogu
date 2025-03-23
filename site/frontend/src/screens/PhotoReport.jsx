import Footer from "../components/photoReport/footer";
import Content from "../components/photoReport/content";
import RoleHeader from "../components/RoleHeader/RoleHeader";

function PhotoReport() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <RoleHeader />
                <Content />
                <Footer />
            </div>
        </div>
    );
}

export default PhotoReport;
