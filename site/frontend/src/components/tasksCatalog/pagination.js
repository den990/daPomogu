function pagination() {
    return (
        <section id="pagination" className="flex justify-center">
            <div className="flex space-x-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-gray-200">
                    <img style={{width: 10, height: 16}} src={require("../../images/left_arrow_grey.svg").default} alt="left_arrow" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-600 text-white">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600">3</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-red-600 hover:text-red-600">
                <img style={{width: 10, height: 16}} src={require("../../images/right_arrow_grey.svg").default} alt="right_arrow" />
                </button>
            </div>
        </section>
    );
}

export default pagination;