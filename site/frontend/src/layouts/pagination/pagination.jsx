function Pagination({ numberOfPageOut, countOfPages, onPageChange }) {
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <div className="p-4 md:p-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(numberOfPageOut - 1)}
                        className={`px-3 py-1 border border-gray-200 rounded-md ${
                            numberOfPageOut - 1 === 0 ? "bg-gray-200" : "hover:bg-gray-50"
                        }`}
                        disabled={numberOfPageOut - 1 === 0}
                    >
                        <img
                            style={{ width: 10, height: 16 }}
                            src={require("../../images/left_arrow_grey.svg").default}
                            alt="left_arrow"
                        />
                    </button>
                    {Array.from({ length: countOfPages }, (_, i) => (
                        <button
                            onClick={() => handlePageChange(i + 1)}
                            key={i}
                            className={`px-3 py-1 ${
                                i + 1 === numberOfPageOut
                                    ? "bg-red-600 text-white"
                                    : "border border-gray-200 hover:bg-gray-50"
                            } rounded-md`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(numberOfPageOut + 1)}
                        className={`px-3 py-1 border border-gray-200 rounded-md ${
                            numberOfPageOut === countOfPages ? "bg-gray-200 disabled" : "hover:bg-gray-50"
                        }`}
                        disabled={numberOfPageOut === countOfPages}
                    >
                        <img
                            style={{ width: 10, height: 16 }}
                            src={require("../../images/right_arrow_grey.svg").default}
                            alt="right_arrow"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pagination;
