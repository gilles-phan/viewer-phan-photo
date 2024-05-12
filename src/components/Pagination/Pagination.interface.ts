export interface PaginationProps{
    type: "button" | "dropdown";
    total: number;
    onPageChange: (start: number, end: number) => void;
}