// eslint-disable-next-line react/prop-types
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination justify-content-end">
      <div className="mb-0">
        <ul className="pagination">
          <li className="page-item">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="page-link"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              {/* Page  */}
              {currentPage}
              {/* of {totalPages} */}
            </span>
          </li>
          <li className="page-item">
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="page-link"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
