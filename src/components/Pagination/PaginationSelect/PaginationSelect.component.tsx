import { useState } from "react";
import { DEFAULT_NB_ELEM_PER_PAGE } from "../Pagination.utils";
import { PaginationSelectProps } from "./PaginationSelect.interface";

export const PaginationSelect = ({
  total,
  onPageChange,
}: PaginationSelectProps) => {
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

  return (
    <>
      <div className="row m-0">
        <div className="col">Page</div>
      </div>
      <div className="row mx-4 mb-3">
        <div className="col-2">
          <button
            type="button"
            className={`btn btn-light${currentPage <= 20 ? " disabled" : ""}`}
            onClick={pageDown20}
          >
            -20
          </button>
        </div>
        <div className="col-2">
          <button
            type="button"
            className={`btn btn-light${currentPage <= 1 ? " disabled" : ""}`}
            onClick={pageDown}
          >
            -1
          </button>
        </div>
        <div className="col-4">
          <select
            className="form-select"
            defaultValue={"1"}
            value={currentPage}
            onChange={(e) => changePage(+e.target.value)}
          >
            {[...Array(nbPage)]
              .map((_, i) => i + 1)
              .map((item) => (
                <option key={item} value={item}>
                  {item} / {nbPage}
                </option>
              ))}
          </select>
        </div>
        <div className="col-2">
          <button
            type="button"
            className={`btn btn-light${
              currentPage >= nbPage ? " disabled" : ""
            }`}
            onClick={pageUp}
          >
            +1
          </button>
        </div>
        <div className="col-2">
          <button
            type="button"
            className={`btn btn-light${
              currentPage >= nbPage - 19 ? " disabled" : ""
            }`}
            onClick={pageUp20}
          >
            +20
          </button>
        </div>
      </div>
    </>
  );
};
