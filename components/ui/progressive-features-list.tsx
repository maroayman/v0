"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FeaturesListProps {
    items: string[]
    initialVisible?: number
    className?: string
}

/**
 * Features list that shows first N items, then reveals rest on click.
 * Simpler approach: shows 4, then all remaining on single click.
 */
export function ProgressiveFeaturesList({
    items,
    initialVisible = 4,
    className = ""
}: FeaturesListProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const hasMore = items.length > initialVisible
    const visibleItems = isExpanded ? items : items.slice(0, initialVisible)

    return (
        <div>
            <ul className={`space-y-1.5 sm:space-y-2 ${className}`}>
                {visibleItems.map((item, index) => (
                    <li
                        key={index}
                        className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 sm:gap-2 group-hover:text-foreground transition-colors"
                    >
                        <span className="text-primary mt-1 text-[10px] sm:text-xs">●</span>
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>

            {hasMore && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsExpanded(!isExpanded)
                    }}
                    className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            Show less
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            Show more
                        </>
                    )}
                </button>
            )}
        </div>
    )
}
