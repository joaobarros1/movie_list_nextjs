interface PaginationProps {
  currentPage: number;
  // totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  currentPage,
  // totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= 10; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex gap-4 text-gray-300">
        <li className="page-item">
          <button className="page-link">&laquo;</button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link">&raquo;</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
