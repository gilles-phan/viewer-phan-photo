export interface PaginationButtonProps {
  total: number;
  onPageChange: (start: number, end: number) => void;
}
