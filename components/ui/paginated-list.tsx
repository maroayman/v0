"use client"

import { useState, useMemo, ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * @fileoverview PaginatedList Component
 *
 * A smart pagination component that:
 * - Shows ALL items normally when count is below threshold (default: 20)
 * - Automatically enables pagination when items exceed threshold
 * - Zero overhead when pagination is not needed
 *
 * @example
 * ```tsx
 * <PaginatedList items={certifications} itemsPerPage={10} threshold={20}>
 *   {(cert) => <CertificationItem cert={cert} key={cert.id} />}
 * </PaginatedList>
 * ```
 */

interface PaginatedListProps<T> {
    /** Array of items to display */
    items: T[]
    /** Number of items per page when pagination is active (default: 10) */
    itemsPerPage?: number
    /** Minimum item count to trigger pagination (default: 20) */
    threshold?: number
    /** Render function for each item */
    children: (item: T, index: number) => ReactNode
    /** Optional className for the list container */
    className?: string
}

/**
 * PaginatedList - Smart pagination that activates only when needed.
 *
 * When items.length < threshold: renders all items, no pagination UI
 * When items.length >= threshold: shows paginated view with navigation
 */
export function PaginatedList<T>({
    items,
    itemsPerPage = 10,
    threshold = 20,
    children,
    className = "",
}: PaginatedListProps<T>) {
    const [currentPage, setCurrentPage] = useState(1)

    const needsPagination = items.length >= threshold
    const totalPages = Math.ceil(items.length / itemsPerPage)

    const visibleItems = useMemo(() => {
        if (!needsPagination) return items
        const start = (currentPage - 1) * itemsPerPage
        return items.slice(start, start + itemsPerPage)
    }, [items, currentPage, itemsPerPage, needsPagination])

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
        // Scroll to top of list
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div>
            <div className={className}>
                {visibleItems.map((item, index) => children(item, index))}
            </div>

            {needsPagination && (
                <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`w-8 h-8 rounded text-sm transition-colors ${page === currentPage
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                    }`}
                                aria-current={page === currentPage ? "page" : undefined}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </nav>
            )}
        </div>
    )
}
