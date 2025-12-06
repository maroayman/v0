"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { formatDate, formatReadTime } from "@/config/portfolio"
import {
  ExternalLink,
  Calendar,
  Clock,
  Search,
  X,
  Tag,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react"
import Link from "next/link"

const ARTICLES_PER_PAGE = 10

type SortOption = "date-desc" | "date-asc" | "read-time-asc" | "read-time-desc"

interface Article {
  id: string
  title: string
  brief: string | null
  slug: string
  published_at: string
  read_time_minutes: number | null
  cover_image_url: string | null
  url: string
  series_name: string | null
  series_slug: string | null
  tags: Array<{ name: string; slug: string }>
}

interface Series {
  id: string
  name: string
  slug: string
  description: string | null
  total_posts: number
}

interface ArticlesClientProps {
  initialArticles: Article[]
  initialSeries: Series[]
  lastSync: string
}

export default function ArticlesClient({ 
  initialArticles, 
  initialSeries, 
  lastSync 
}: ArticlesClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagSearchTerm, setTagSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>("date-desc")

  const articles = initialArticles
  const series = initialSeries

  // Get all unique tags from articles
  const allTags = [...new Set(articles.flatMap((article) => article.tags.map((tag) => tag.name)))].sort()

  // Get tag counts
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      acc[tag] = articles.filter((article) => article.tags.some((articleTag) => articleTag.name === tag)).length
      return acc
    },
    {} as Record<string, number>,
  )

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.brief && article.brief.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) => article.tags.some((tag) => tag.name === selectedTag))
      const matchesSeries = !selectedSeries || article.series_name === selectedSeries
      return matchesSearch && matchesTags && matchesSeries
    })

    // Sort articles
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        case "date-asc":
          return new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
        case "read-time-asc":
          return (a.read_time_minutes || 0) - (b.read_time_minutes || 0)
        case "read-time-desc":
          return (b.read_time_minutes || 0) - (a.read_time_minutes || 0)
        default:
          return 0
      }
    })
  }, [articles, searchTerm, selectedTags, selectedSeries, sortBy])

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

  // Filter tags based on search term
  const filteredTags = allTags.filter((tag) => tag.toLowerCase().includes(tagSearchTerm.toLowerCase()))

  // Handle tag selection
  const handleTagToggle = (tagName: string) => {
    setSelectedTags((prev) => (prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]))
    setCurrentPage(1)
  }

  const clearAllTags = () => {
    setSelectedTags([])
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setSelectedTags([])
    setSelectedSeries(null)
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleSeriesChange = (seriesName: string) => {
    setSelectedSeries(selectedSeries === seriesName ? null : seriesName)
    setCurrentPage(1)
  }

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Keyboard navigation for pagination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === "ArrowLeft" && currentPage > 1) {
        goToPage(currentPage - 1)
      } else if (e.key === "ArrowRight" && currentPage < totalPages) {
        goToPage(currentPage + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, totalPages, goToPage])

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "date-desc", label: "Newest first" },
    { value: "date-asc", label: "Oldest first" },
    { value: "read-time-asc", label: "Shortest read" },
    { value: "read-time-desc", label: "Longest read" },
  ]

  const hasActiveFilters = selectedTags.length > 0 || selectedSeries || searchTerm

  return (
    <main className="min-h-screen bg-background">
      <NavigationSidebar />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground leading-relaxed">
            Technical articles, tutorials, and insights from my development journey.
          </p>
        </header>

        {articles.length === 0 ? (
          <p className="text-muted-foreground">No articles found.</p>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="mb-8 space-y-4 border-b pb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Tag Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <Tag className="h-3 w-3 mr-1.5" />
                      Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-3" align="start">
                    <div className="space-y-3">
                      <Input
                        placeholder="Search tags..."
                        value={tagSearchTerm}
                        onChange={(e) => setTagSearchTerm(e.target.value)}
                        className="h-8 text-sm"
                      />
                      {selectedTags.length > 0 && (
                        <button 
                          onClick={clearAllTags} 
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          Clear all
                        </button>
                      )}
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {filteredTags.map((tag) => (
                          <div
                            key={tag}
                            className={`flex items-center justify-between px-2 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                              selectedTags.includes(tag)
                                ? "bg-secondary"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => handleTagToggle(tag)}
                          >
                            <span>{tag}</span>
                            <span className="text-xs text-muted-foreground">{tagCounts[tag]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Series Filter */}
                {series.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <Filter className="h-3 w-3 mr-1.5" />
                        Series {selectedSeries && "(1)"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3" align="start">
                      <div className="space-y-1">
                        {series.map((s) => (
                          <div
                            key={s.id}
                            className={`flex items-center justify-between px-2 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                              selectedSeries === s.name ? "bg-secondary" : "hover:bg-muted"
                            }`}
                            onClick={() => handleSeriesChange(s.name)}
                          >
                            <span>{s.name}</span>
                            <span className="text-xs text-muted-foreground">{s.total_posts}</span>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {/* Sort Options */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <ArrowUpDown className="h-3 w-3 mr-1.5" />
                      Sort
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-44 p-2" align="start">
                    <div className="space-y-1">
                      {sortOptions.map((option) => (
                        <div
                          key={option.value}
                          className={`px-2 py-1.5 rounded text-sm cursor-pointer transition-colors ${
                            sortBy === option.value ? "bg-secondary" : "hover:bg-muted"
                          }`}
                          onClick={() => setSortBy(option.value)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Clear filters */}
                {hasActiveFilters && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                )}
              </div>

              {/* Active filters display */}
              {(selectedTags.length > 0 || selectedSeries) && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer text-xs"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                      <X className="h-2.5 w-2.5 ml-1" />
                    </Badge>
                  ))}
                  {selectedSeries && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer text-xs"
                      onClick={() => setSelectedSeries(null)}
                    >
                      {selectedSeries}
                      <X className="h-2.5 w-2.5 ml-1" />
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Articles List */}
            <div className="space-y-8">
              {paginatedArticles.map((article) => (
                <article key={article.id} className="group">
                  <Link 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h2 className="text-lg font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                      {article.title}
                      <ExternalLink className="inline-block h-3.5 w-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h2>
                  </Link>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                    {article.brief}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {article.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.published_at)}
                      </span>
                    )}
                    {article.read_time_minutes && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatReadTime(article.read_time_minutes)}
                      </span>
                    )}
                    {article.series_name && (
                      <span className="text-foreground/70">{article.series_name}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No articles match your criteria.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1}–{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first, last, current, and adjacent pages
                        const showPage = 
                          page === 1 || 
                          page === totalPages || 
                          Math.abs(page - currentPage) <= 1
                        
                        const showEllipsis = 
                          (page === 2 && currentPage > 3) ||
                          (page === totalPages - 1 && currentPage < totalPages - 2)
                        
                        if (showEllipsis && !showPage) {
                          return (
                            <span key={page} className="px-2 text-muted-foreground">
                              …
                            </span>
                          )
                        }
                        
                        if (!showPage) return null
                        
                        return (
                          <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page)}
                            className="w-9 px-0"
                          >
                            {page}
                          </Button>
                        )
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Results count when single page */}
            {totalPages <= 1 && filteredArticles.length > 0 && (
              <p className="mt-8 pt-6 border-t text-sm text-muted-foreground">
                {filteredArticles.length} of {articles.length} articles
                {selectedSeries && ` in "${selectedSeries}"`}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}
