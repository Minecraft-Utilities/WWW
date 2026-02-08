import { cn, formatNumberWithCommas } from "@/common/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

type PageButtonProps = {
  page: number;
  currentPage: number;
  isActive?: boolean;
  children: React.ReactNode;
  href: string;
};

function PageButton({ page: buttonPage, currentPage, isActive, children, href }: PageButtonProps) {
  const isCurrentPage = buttonPage === currentPage;

  const className = cn(
    "relative h-9 min-w-10 px-3 transition-all duration-200",
    "whitespace-nowrap",
    isCurrentPage && "cursor-default",
    !isActive && "hover:shadow-sm"
  );

  if (isCurrentPage) {
    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        size="sm"
        className={className}
        aria-current="page"
        aria-label={`Current page, page ${buttonPage}`}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={className}
    >
      <Link href={href} aria-label={`Go to page ${buttonPage}`} className="flex items-center justify-center">
        {children}
      </Link>
    </Button>
  );
}

type NavigationButtonProps = {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
  ariaLabel: string;
};

function NavigationButton({ href, disabled, children, ariaLabel }: NavigationButtonProps) {
  const className = cn(
    "transition-all duration-200",
    disabled && "cursor-not-allowed opacity-50 pointer-events-none",
    !disabled && "hover:shadow-sm"
  );

  if (disabled) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button asChild variant="ghost" size="icon" className={className} aria-label={ariaLabel}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export type SimpleProps = {
  mobilePagination?: boolean;
  page: number;
  totalItems: number;
  itemsPerPage: number;
  statsBelow?: boolean;
  showStats?: boolean;
  basePath?: string;
};

export default function Pagination({
  mobilePagination,
  page,
  totalItems,
  itemsPerPage,
  statsBelow,
  showStats = true,
  basePath,
}: SimpleProps) {
  page = page === 0 ? 1 : page;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const href = (p: number) => (basePath != null ? `${basePath.replace(/\/$/, "")}/${p}` : "#");

  const maxPagesToShow = page > 999 ? 3 : 5;
  const pageNumbers: React.ReactNode[] = [];

  if (!mobilePagination) {
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (totalPages > maxPagesToShow && endPage - startPage + 1 < maxPagesToShow) {
      startPage = endPage - maxPagesToShow + 1;
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PageButton
          key="start"
          page={1}
          currentPage={page}
          href={href(1)}
        >
          1
        </PageButton>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis-start" className="flex h-9 min-w-10 items-center justify-center px-2" aria-hidden>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton
          key={`page-${i}`}
          page={i}
          isActive={i === page}
          currentPage={page}
          href={href(i)}
        >
          {formatNumberWithCommas(i)}
        </PageButton>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis-end" className="flex h-9 min-w-10 items-center justify-center px-2" aria-hidden>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </span>
        );
      }
      pageNumbers.push(
        <PageButton
          key="end"
          page={totalPages}
          currentPage={page}
          href={href(totalPages)}
        >
          {formatNumberWithCommas(totalPages)}
        </PageButton>
      );
    }
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-between lg:justify-center",
        statsBelow && "flex-col-reverse gap-2"
      )}
    >
      {showStats && (
        <div
          className={cn(
            "text-muted-foreground text-sm transition-opacity duration-200 select-none",
            !statsBelow && "left-0 lg:absolute"
          )}
          aria-live="polite"
          aria-atomic="true"
        >
          <p>
            <span className="text-foreground font-medium">
              {formatNumberWithCommas(Math.min((page - 1) * itemsPerPage + 1, totalItems))}
            </span>{" "}
            to{" "}
            <span className="text-foreground font-medium">
              {formatNumberWithCommas(Math.min(page * itemsPerPage, totalItems))}
            </span>{" "}
            of <span className="text-foreground font-medium">{formatNumberWithCommas(totalItems)}</span>
          </p>
        </div>
      )}

      <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination navigation">
        {mobilePagination && (
          <NavigationButton
            href={href(1)}
            disabled={page === 1}
            ariaLabel="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </NavigationButton>
        )}
        <NavigationButton
          href={href(page - 1)}
          disabled={page === 1}
          ariaLabel="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </NavigationButton>
        {pageNumbers}
        <NavigationButton
          href={href(page + 1)}
          disabled={page === totalPages}
          ariaLabel="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </NavigationButton>
        {mobilePagination && (
          <NavigationButton
            href={href(totalPages)}
            disabled={page === totalPages}
            ariaLabel="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </NavigationButton>
        )}
      </nav>
    </div>
  );
}
