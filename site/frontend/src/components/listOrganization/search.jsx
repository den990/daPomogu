function Search() {
    return (
        <section id="search-filters">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Поиск организаций..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <img
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ width: 16, height: 24 }}
                        src={require("../../images/find_grey.svg").default}
                        alt="find"
                    />
                </div>
            </div>
        </section>
    );
}

export default Search;
