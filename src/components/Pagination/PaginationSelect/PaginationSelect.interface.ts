export interface PaginationSelectProps {
  total: number;
  onPageChange: (start: number, end: number) => void;
}
