"use client";

import { Pagination as HeroUIPagination } from "@heroui/pagination";
import { useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  query,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (query) {
      params.set("query", query);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <HeroUIPagination
      total={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      showShadow
      showControls
      size="md"
      variant="bordered"
      className="flex justify-center"
    />
  );
}
