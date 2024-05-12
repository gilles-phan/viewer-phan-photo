import { PaginationProps } from "./Pagination.interface";
import { PaginationButton } from "./PaginationButton/PaginationButton.component";
import { PaginationSelect } from "./PaginationSelect/PaginationSelect.component";

export const Pagination = ({ type, total, onPageChange }: PaginationProps) => {
  switch (type) {
    case "button":
      return <PaginationButton total={total} onPageChange={onPageChange} />;
    case "dropdown":
      return <PaginationSelect total={total} onPageChange={onPageChange} />;
    default:
      return <></>;
  }
};
