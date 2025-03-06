import Header from "../components/photoReport/header";
import Footer from "../components/photoReport/footer";
import Content from "../components/photoReport/content";

function PhotoReport() {
    return (
        <div className="h-full text-base-content">
            <div className="min-h-screen bg-neutral-50">
                <Header />
                <Content />
                <Footer />
            </div>
        </div>
    );
}

export default PhotoReport;