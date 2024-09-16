import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage, handlePageClick }) => {

    const getPageNumbers = () => {
    const pages = [];
    
    if (currentPage === 1) {
        pages.push(1, 2, 3);
        if (totalPages > 3) {
        pages.push('...');
        pages.push(totalPages);
        }
    } else if (currentPage === totalPages) {
        if (totalPages > 3) {
        pages.push(1);
        pages.push('...');
        }
        pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
        pages.push(1);
        if (currentPage > 4) {
        pages.push('...');
        }
        if (currentPage > 2) {
        pages.push(currentPage - 1);
        }
        pages.push(currentPage);
        if (currentPage < totalPages - 1) {
        pages.push(currentPage + 1);
        }
        if (currentPage < totalPages - 3) {
        pages.push('...');
        }
        pages.push(totalPages);
    }
    
    return pages;
    };


  return (
    <div className="pagination">
      <button className="arrow" onClick={handlePreviousPage} disabled={currentPage === 1}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageClick(page)}
          className={`page ${currentPage === page ? 'active' : ''}`}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
      <button className="arrow" onClick={handleNextPage} disabled={currentPage === totalPages}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Pagination;