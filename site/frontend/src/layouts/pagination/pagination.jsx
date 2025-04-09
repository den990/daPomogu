function Pagination({ numberOfPageOut, countOfPages, onPageChange }) {
    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pages = [];
        const currentPage = numberOfPageOut;
        const totalPages = countOfPages;
        const maxVisible = 7; // Максимальное количество видимых кнопок
        
        if (totalPages <= maxVisible) {
            // Если страниц меньше или равно 7, показываем все
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Определяем границы отображаемых страниц
            let startPage, endPage;
            
            if (currentPage <= 4) {
                // Если текущая страница в начале
                startPage = 1;
                endPage = maxVisible - 2; // Оставляем место для эллипсиса и последней страницы
                pages.push(...Array.from({ length: endPage }, (_, i) => i + 1));
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                // Если текущая страница в конце
                startPage = totalPages - (maxVisible - 2);
                pages.push(1);
                pages.push('...');
                pages.push(...Array.from({ length: maxVisible - 2 }, (_, i) => startPage + i));
            } else {
                // Если текущая страница в середине
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages.map((page, index) => {
            if (page === '...') {
                return (
                    <span key={`ellipsis-${index}`} className="px-3 py-1">
                        ...
                    </span>
                );
            }
            
            return (
                <button
                    onClick={() => handlePageChange(page)}
                    key={page}
                    className={`px-3 py-1 ${
                        page === numberOfPageOut
                            ? "bg-red-600 text-white"
                            : "border border-gray-200 hover:bg-gray-50"
                    } rounded-md`}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className="p-4 md:p-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex gap-2 items-center">
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
                    
                    {renderPageNumbers()}
                    
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