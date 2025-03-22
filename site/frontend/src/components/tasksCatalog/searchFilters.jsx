function searchFilters() {
    return (
        <section id="search-filters" className="mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Поиск заданий..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                    <img
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ width: 16, height: 24 }}
                        src={require("../../images/find_grey.svg").default}
                        alt="find"
                    />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative">
                        <select className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none">
                            <option>Все категории</option>
                            <option>Помощь пожилым</option>
                            <option>Экология</option>
                            <option>Образование</option>
                        </select>
                        <img
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ width: 16, height: 24 }}
                            src={require("../../images/categories_grey.svg").default}
                            alt="categories"
                        />
                    </div>
                    <div className="relative">
                        <select className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none">
                            <option>Дата</option>
                        </select>
                        <img
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ width: 16, height: 16 }}
                            src={require("../../images/calendar_grey.svg").default}
                            alt="placemark"
                        />
                    </div>
                    <div className="relative">
                        <select className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none">
                            <option>Выберите город</option>
                            <option>Москва</option>
                            <option>Санкт-Петербург</option>
                            <option>Казань</option>
                        </select>
                        <img
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ width: 20, height: 16 }}
                            src={require("../../images/city_grey.svg").default}
                            alt="city"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default searchFilters;
