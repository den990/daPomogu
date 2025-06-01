import React from "react";

function Pagination({ numberOfPageOut, countOfPages, onPageChange }) {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= countOfPages && page !== numberOfPageOut) {
            onPageChange(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 10;

        if (countOfPages <= maxVisiblePages) {
            for (let i = 1; i <= countOfPages; i++) {
                pages.push(i);
            }
        } else {
            const visiblePages = [];
            const leftGap = 2;
            const rightGap = 2;

            pages.push(1);

            let start = Math.max(2, numberOfPageOut - 4);
            let end = Math.min(countOfPages - 1, numberOfPageOut + 4);

            if (start > 2) {
                pages.push("...");
            }

            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== countOfPages) {
                    pages.push(i);
                }
            }

            if (end < countOfPages - 1) {
                pages.push("...");
            }

            pages.push(countOfPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="p-4 md:p-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex gap-2">
                    {/* Prev */}
                    <button
                        onClick={() => handlePageChange(numberOfPageOut - 1)}
                        className={`px-3 py-1 border border-gray-200 rounded-md ${
                            numberOfPageOut === 1 ? "bg-gray-200" : "hover:bg-gray-50"
                        }`}
                        disabled={numberOfPageOut === 1}
                    >
                        <img
                            style={{ width: 10, height: 16 }}
                            src={require("../../images/left_arrow_grey.svg").default}
                            alt="left_arrow"
                        />
                    </button>

                    {/* Pages */}
                    {pages.map((page, index) =>
                        page === "..." ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-1 text-gray-500 select-none"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                onClick={() => handlePageChange(page)}
                                key={page}
                                className={`px-3 py-1 rounded-md ${
                                    page === numberOfPageOut
                                        ? "bg-red-600 text-white"
                                        : "border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {page}
                            </button>
                        )
                    )}

                    {/* Next */}
                    <button
                        onClick={() => handlePageChange(numberOfPageOut + 1)}
                        className={`px-3 py-1 border border-gray-200 rounded-md ${
                            numberOfPageOut === countOfPages ? "bg-gray-200" : "hover:bg-gray-50"
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
