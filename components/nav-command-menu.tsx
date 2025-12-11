"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Command } from "lucide-react"

const menuItems = [
    // Homepage sections
    { label: "Home", href: "/", type: "page" },
    { label: "About", href: "/#about", type: "section" },
    { label: "Skills", href: "/#skills", type: "section" },
    { label: "Education", href: "/#education", type: "section" },
    { label: "Volunteering", href: "/#volunteering", type: "section" },
    { label: "Contact", href: "/#contact", type: "section" },
    // Separate pages
    { label: "Experience", href: "/experience", type: "page" },
    { label: "Projects", href: "/projects", type: "page" },
    { label: "Certifications", href: "/certifications", type: "page" },
]

// Debounce hook for search input
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

export function NavCommandMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Debounce search to prevent filtering on every keystroke (50ms)
    const debouncedSearch = useDebounce(search, 50)

    // Memoize filtered results to avoid re-computing on unrelated re-renders
    const filteredItems = useMemo(() => {
        if (!debouncedSearch) return menuItems
        const searchLower = debouncedSearch.toLowerCase()
        return menuItems.filter((item) =>
            item.label.toLowerCase().includes(searchLower)
        )
    }, [debouncedSearch])

    const handleNavigate = useCallback((href: string) => {
        setIsOpen(false)
        setSearch("")
        setSelectedIndex(0)

        // Handle hash navigation on same page
        if (href.startsWith("/#") && pathname === "/") {
            const element = document.querySelector(href.replace("/", ""))
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
                return
            }
        }

        router.push(href)
    }, [router, pathname])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Cmd/Ctrl + K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setIsOpen((prev) => !prev)
            }

            // Close with Escape
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false)
                setSearch("")
                setSelectedIndex(0)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen])

    // Arrow key navigation - only when modal is open
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault()
                setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
            } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
                handleNavigate(filteredItems[selectedIndex].href)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, filteredItems, selectedIndex, handleNavigate])

    // Reset selected index when filtered results change
    useEffect(() => {
        setSelectedIndex(0)
    }, [filteredItems])

    // Don't render until mounted (prevents hydration mismatch)
    if (!mounted) return null

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-10 h-10 bg-foreground text-background rounded-full shadow-md hover:opacity-80 transition-opacity"
                aria-label="Open navigation menu (Ctrl+K)"
            >
                <Command className="h-4 w-4" />
            </button>

            {/* Modal */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh] px-4 pointer-events-none">
                        <div
                            className="w-full max-w-md bg-background border rounded-lg shadow-lg overflow-hidden pointer-events-auto animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b">
                                <Command className="h-4 w-4 text-muted-foreground shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                    autoFocus
                                />
                                <kbd className="text-xs text-muted-foreground">ESC</kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-[40vh] overflow-y-auto py-2">
                                {filteredItems.length === 0 ? (
                                    <div className="py-6 text-center text-sm text-muted-foreground">
                                        No results found
                                    </div>
                                ) : (
                                    <div className="px-2">
                                        {filteredItems.map((item, index) => (
                                            <button
                                                key={item.href}
                                                onClick={() => handleNavigate(item.href)}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded text-sm text-left transition-colors ${index === selectedIndex
                                                    ? "bg-muted"
                                                    : "hover:bg-muted/50"
                                                    }`}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                            >
                                                <span>{item.label}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {item.type === "page" ? "Page" : "Section"}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground">
                                <span>↑↓ Navigate</span>
                                <span>↵ Select</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
