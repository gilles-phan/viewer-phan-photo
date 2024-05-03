import { useState } from "react";
import { DEFAULT_NB_ELEM_PER_PAGE } from "./Pagination.utils";

interface PaginationProps {
  total: number;
  onPageChange: (start: number, end: number) => void;
}
export const Pagination = ({ total, onPageChange }: PaginationProps) => {
  const [elemPerPage] = useState(DEFAULT_NB_ELEM_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const nbPage = Math.ceil(total / elemPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
    const idFirstElement = (page - 1) * elemPerPage;
    const idLastElement = idFirstElement + elemPerPage;
    onPageChange(idFirstElement, idLastElement);
  };

  return (
    <>
      <div>
        <em>elemPerPage: {elemPerPage}</em>
      </div>
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {[...Array(nbPage)]
              .map((_, i) => i + 1)
              .map((item) => (
                <li
                  key={item}
                  onClick={() => changePage(item)}
                  className={`page-item${
                    currentPage === item ? " active" : ""
                  }`}
                >
                  <button className="page-link">
                    {currentPage === item ? `-${item}-` : item}
                  </button>
                </li>
              ))}
            {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li> */}
          </ul>
        </nav>
        {/* {[...Array(nbPage)]
          .map((_, i) => i + 1)
          .map((item) => (
            <button key={item} onClick={() => changePage(item)}>
              {currentPage === item ? `-${item}-` : item}
            </button>
          ))} */}
      </div>
    </>
  );
};
