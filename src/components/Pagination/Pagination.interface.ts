export interface PaginationProps {
  total: number;
  onPageChange: (start: number, end: number) => void;
}
