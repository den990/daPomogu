import Footer from "../components/photoReport/footer";
import Content from "../components/photoReport/content";
import HeaderVolunteer from "../layouts/HeaderVolunteer";

function PhotoReport() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <HeaderVolunteer />
                <Content />
                <Footer />
            </div>
        </div>
    );
}

export default PhotoReport;