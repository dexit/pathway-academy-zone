import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface ArchivePaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/**
 * Drop-in pagination control with smart ellipsis used across all
 * archive pages. Smoothly scrolls back to top on page change.
 */
export function ArchivePagination({
  page,
  totalPages,
  onChange,
}: ArchivePaginationProps) {
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    onChange(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTo(page - 1);
            }}
            aria-disabled={page === 1}
            className={cn(page === 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const isEdge = pageNum === 1 || pageNum === totalPages;
          const isNear = Math.abs(pageNum - page) <= 1;
          if (!isEdge && !isNear) {
            if (pageNum === 2 || pageNum === totalPages - 1) {
              return (
                <PaginationItem key={`e-${pageNum}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          }
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                isActive={pageNum === page}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(pageNum);
                }}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTo(page + 1);
            }}
            aria-disabled={page === totalPages}
            className={cn(
              page === totalPages && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
