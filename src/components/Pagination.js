import React from "react";
import "../assets/_pagination.scss";

function Pagination({
  countriesPerPage,
  totalCountries,
  currentPage,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="center">
      <div className="pagination">
        {pageNumbers.map((number) => (
          <a
            className={number === currentPage ? "active" : ""}
            onClick={() => paginate(number)}
            key={number}
          >
            {number}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default Pagination;
