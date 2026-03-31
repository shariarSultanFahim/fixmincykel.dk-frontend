"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
  disabled?: boolean;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false
}: TablePaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const canGoPrev = safeCurrentPage > 1;
  const canGoNext = safeCurrentPage < safeTotalPages;

  const getVisiblePages = () => {
    if (safeTotalPages <= 5) {
      return Array.from({ length: safeTotalPages }, (_, idx) => idx + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "ellipsis", safeTotalPages] as const;
    }

    if (safeCurrentPage >= safeTotalPages - 2) {
      return [
        1,
        "ellipsis",
        safeTotalPages - 3,
        safeTotalPages - 2,
        safeTotalPages - 1,
        safeTotalPages
      ] as const;
    }

    return [
      1,
      "ellipsis",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "ellipsis",
      safeTotalPages
    ] as const;
  };

  const disabledClass = disabled ? "pointer-events-none opacity-50" : "cursor-pointer";

  return (
    <Pagination className="mx-0 w-auto justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => canGoPrev && onPageChange(safeCurrentPage - 1)}
            aria-disabled={!canGoPrev || disabled}
            className={!canGoPrev || disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
        {getVisiblePages().map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={safeCurrentPage === item}
                onClick={() => onPageChange(item)}
                className={disabledClass}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => canGoNext && onPageChange(safeCurrentPage + 1)}
            aria-disabled={!canGoNext || disabled}
            className={!canGoNext || disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
