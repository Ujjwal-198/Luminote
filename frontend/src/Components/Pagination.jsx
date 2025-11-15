import React from 'react';

const Pagination = ({ pages, page, onPageChange }) => {
    const handlePage = (page) => {
        onPageChange(page);
    }
    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    }
    const handleNext = () => {
        if (page < pages) {
            onPageChange(page + 1);
        }
    }

    const pagesArray = [];
    for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
    }

    return (
        <div>
            <div className='flex gap-2 justify-center items-center align-middle rounded-md w-full my-5'>
                <button
                    onClick={handlePrev}
                    className={`px-3 py-1 rounded-md bg-orange-600 hover:bg-orange-700-300 ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={page === 1}
                >
                    Prev
                </button>
                <div className="flex items-center gap-2">
                    {
                        pagesArray.map((p) => (
                            <button
                                key={p}
                                onClick={() => handlePage(p)}
                                className={`cursor-pointer px-3 py-1 rounded-md bg-orange-600 hover:bg-orange-700 ${p === page ? 'bg-orange-500 text-white' : ''} ${page === p ? 'bg-orange-700' : ''}`}
                            >
                                {p}
                            </button>
                        ))
                    }
                </div>
                <button
                    onClick={handleNext}
                    className={`px-3 py-1 rounded-md bg-orange-600 hover:bg-orange-700  ${page === pages ? 'bg-gray-300 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={page === pages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pagination;

