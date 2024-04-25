import { useState } from "react";

interface PaginationProps {
  total: number;
  onPageChange: (start: number, end: number) => void;
}
export const Pagination = ({ total, onPageChange }: PaginationProps) => {
  const [elemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const nbPage = Math.ceil(total / elemPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
    const start = (page - 1) * elemPerPage;
    const end = start + elemPerPage;
    onPageChange(start, end);
  };
  return (
    <>
      elemPerPage: {elemPerPage}
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
