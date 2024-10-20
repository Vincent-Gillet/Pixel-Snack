import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage, handlePageClick }) => {

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button className="arrow" onClick={handlePreviousPage} disabled={currentPage === 1} aria-label="Page précédente" aria-disabled={currentPage === 1}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageClick(page)}
          className={`page ${currentPage === page ? 'active' : ''}`}
          disabled={typeof page !== 'number'}
          aria-disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
      <button className="arrow" onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="Page suivante" aria-disabled={currentPage === totalPages}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Pagination;