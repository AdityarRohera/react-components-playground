import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationComp({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            size="default"
            onClick={() => page > 1 && onPageChange(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* First Page */}
        <PaginationItem>
          <PaginationLink
            size="default"
            isActive={page === 1}
            onClick={() => onPageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            size="default"
            isActive={page === 2}
            onClick={() => onPageChange(2)}
          >
            2
          </PaginationLink>
        </PaginationItem>

        {/* Ellipsis before current */}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Current Page (middle) */}
        {page !== 1 && page !== 2 && page !== totalPages && (
          <PaginationItem>
            <PaginationLink size="default" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis after current */}
        {page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last Page */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              size="default"
              isActive={page === totalPages}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            size="default"
            onClick={() =>
              page < totalPages && onPageChange(page + 1)
            }
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

