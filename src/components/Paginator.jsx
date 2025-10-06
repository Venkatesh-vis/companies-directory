import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Paginator = ({ totalPageCount, initialPage, onPageChange }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(initialPage || 0);

    const handlePageChange = (clickedData) => {
        setCurrentPageIndex(clickedData.selected);
        onPageChange(clickedData);
    };

    return (
        <div className="relative">
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                initialPage={initialPage}
                forcePage={currentPageIndex}
                pageCount={totalPageCount}
                pageRangeDisplayed={3}
                onPageChange={handlePageChange}
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center list-none border border-white bg-white rounded-b-lg mt-0 w-[96%] mx-auto"
                pageClassName="flex items-center text-blue-600 rounded-md hover:bg-blue-600 hover:text-white cursor-pointer"
                pageLinkClassName="px-3 py-1"
                activeClassName="font-bold"
                nextClassName={`flex items-center px-[0.5vw] rounded-md ${
                    totalPageCount > currentPageIndex + 1
                        ? "text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
                        : "opacity-50 text-gray-400"
                }`}
                previousClassName={`flex items-center px-[0.5vw] rounded-md ${
                    currentPageIndex === 0
                        ? "opacity-50 text-gray-400"
                        : "text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
                }`}
                breakClassName="flex items-center text-blue-600"
            />
        </div>
    );
};

export default Paginator;
