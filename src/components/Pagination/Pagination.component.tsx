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
        {[...Array(nbPage)]
          .map((_, i) => i + 1)
          .map((item) => (
            <button key={item} onClick={() => changePage(item)}>
              {currentPage === item ? `-${item}-` : item}
            </button>
          ))}
      </div>
    </>
  );
};
