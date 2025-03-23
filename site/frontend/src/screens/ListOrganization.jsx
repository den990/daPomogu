import Pagination from "../layouts/pagination/pagination.jsx";
import Organizations from "../components/listOrganization/organizations.jsx";
import Search from "../components/listOrganization/search.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";

function ListOrganization() {
    const numberOfPage = 1;
    const countOfPages = 5;

    const handlePageChange = (newPage) => {
        return;
    };

    return (
        <div className="min-h-screen flex flex-col">
            <RoleHeader />
            <main className="flex-grow  bg-gray-50">
                <div className="container mx-auto px-4">
                    <Search />
                    <Organizations />
                    <Pagination
                        numberOfPageOut={numberOfPage}
                        countOfPages={countOfPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </div>
    );
}

export default ListOrganization;
