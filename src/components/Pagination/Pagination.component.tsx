import { Fragment, useState } from "react";
import { DEFAULT_NB_ELEM_PER_PAGE } from "./Pagination.utils";
import { PaginationProps } from "./Pagination.interface";

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
  const pageDown = () => currentPage > 1 && changePage(currentPage - 1);
  const pageUp = () => currentPage < nbPage && changePage(currentPage + 1);
  const pageDown20 = () => currentPage > 1 && changePage(currentPage - 20);
  const pageUp20 = () => currentPage < nbPage && changePage(currentPage + 20);

  const isAllPageDisplayed = nbPage < 20;

  const isPreviousOrNextPage = (item: number) =>
    currentPage >= item - 2 && currentPage <= item + 2;

  return (
    <div className="row mx-0 my-5">
      <div className="col">
        <div className="pagination pagination-lg justify-content-center">
          {nbPage > 50 && (
            <div className={`page-item${currentPage <= 20 ? " disabled" : ""}`}>
              <button className="page-link" onClick={pageDown20}>
                &laquo; -20
              </button>
            </div>
          )}
          <div className={`page-item${currentPage <= 1 ? " disabled" : ""}`}>
            <button className="page-link" onClick={pageDown}>
              &laquo;
            </button>
          </div>
          {!isAllPageDisplayed && currentPage > 3 && (
            <div className="page-item disabled">
              <button className="page-link">...</button>
            </div>
          )}
          {[...Array(nbPage)]
            .map((_, i) => i + 1)
            .map((item) => (
              <Fragment key={item}>
                {(isAllPageDisplayed || isPreviousOrNextPage(item)) && (
                  <div
                    onClick={() => changePage(item)}
                    className={`page-item${
                      currentPage === item ? " active" : ""
                    }`}
                  >
                    <button className="page-link">{item}</button>
                  </div>
                )}
              </Fragment>
            ))}

          {!isAllPageDisplayed && currentPage <= nbPage - 3 && (
            <div className="page-item disabled">
              <button className="page-link">...</button>
            </div>
          )}
          <div
            className={`page-item${currentPage >= nbPage ? " disabled" : ""}`}
          >
            <button className="page-link" onClick={pageUp}>
              &raquo;
            </button>
          </div>

          {nbPage > 50 && (
            <div
              className={`page-item${
                currentPage >= nbPage - 19 ? " disabled" : ""
              }`}
            >
              <button className="page-link" onClick={pageUp20}>
                +20&raquo;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
