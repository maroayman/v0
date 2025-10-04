"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { formatDate, formatReadTime } from "@/lib/hashnode"
import { currentConfig } from "@/config/portfolio"
import { ExternalLink, Calendar, Clock, Search, BookOpen, Hash, Loader2, RefreshCw, Code, Database, Filter, X, ChevronDown } from "lucide-react"

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
  id: number
  name: string
  slug: string
  description: string | null
  total_posts: number
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagSearchTerm, setTagSearchTerm] = useState("")
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<string | null>(null)
  
  // API Response state
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  
  // Auto-refresh status
  const [nextRefreshTime, setNextRefreshTime] = useState<Date | null>(null)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true)
  const [isClient, setIsClient] = useState(false)
  
  // Get configuration settings
  const showDevControls = currentConfig.showDebugControls
  const refreshInterval = currentConfig.refreshIntervalMinutes * 60 * 1000
  const showRefreshTimer = currentConfig.showRefreshTimer
  const showAutoRefreshToggle = currentConfig.showAutoRefreshToggle

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Function to load articles data
  // This automatically fetches both articles AND series from Hashnode
  // New series you create will appear automatically within 10 minutes
  const loadArticlesData = async () => {
    setLoading(true)
    try {
      // Always fetch fresh data from Hashnode API (includes series)
      const hashnodeResponse = await fetch(`/api/hashnode?username=${currentConfig.hashnodeUsername}&includeSeries=${currentConfig.includeSeriesData}&pageSize=${currentConfig.maxArticlesPerPage}`, {
        // Add cache busting to ensure fresh data
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (hashnodeResponse.ok) {
        const hashnodeData = await hashnodeResponse.json()
        console.log("Hashnode API response:", hashnodeData)
        
        if (hashnodeData.success && hashnodeData.data) {
          // Transform Hashnode data to match our Article interface
          const transformedArticles = hashnodeData.data.articles.map((article: any) => ({
            id: article.id,
            title: article.title,
            brief: article.brief,
            slug: article.slug,
            published_at: article.publishedAt,
            read_time_minutes: article.readTimeInMinutes,
            cover_image_url: article.coverImage?.url,
            url: article.url,
            series_name: article.series?.name,
            series_slug: article.series?.slug,
            tags: article.tags || []
          }))
          
          // Transform series data
          const transformedSeries = hashnodeData.data.series.map((s: any, index: number) => ({
            id: `series-${s.slug}-${index}`, // Use deterministic ID
            name: s.name,
            slug: s.slug,
            description: s.description,
            total_posts: s.posts?.totalDocuments || 0
          }))
          
          setArticles(transformedArticles)
          setSeries(transformedSeries)
          setLastSync(hashnodeData.metadata?.timestamp)
          console.log(`✅ Loaded ${transformedArticles.length} articles from Hashnode (Total: ${hashnodeData.data.totalCount})`)
        }
      } else {
        // Fallback to database API if available
        try {
          const [articlesResponse, seriesResponse] = await Promise.all([
            fetch("/api/articles"), 
            fetch("/api/series")
          ])

          if (articlesResponse.ok && seriesResponse.ok) {
            const articlesData = await articlesResponse.json()
            const seriesData = await seriesResponse.json()

            setArticles(articlesData.articles || [])
            setSeries(seriesData.series || [])
            setLastSync(articlesData.lastSync)
          } else {
            console.error("❌ Failed to load data from both Hashnode API and database")
          }
        } catch (dbError) {
          console.error("Database API not available:", dbError)
        }
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh articles periodically and on visibility change
  useEffect(() => {
    if (!isClient) return // Only run on client side

    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("🔄 Page became visible, refreshing articles...")
        loadArticlesData()
      }
    }

    // Initial load
    loadArticlesData()
    setNextRefreshTime(new Date(Date.now() + refreshInterval))

    // Add visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Set up automatic refresh (if enabled)
    let interval: NodeJS.Timeout | null = null
    
    if (autoRefreshEnabled) {
      interval = setInterval(() => {
        console.log(`⏰ Auto-refreshing articles from Hashnode every ${currentConfig.refreshIntervalMinutes} minutes...`)
        loadArticlesData()
        setNextRefreshTime(new Date(Date.now() + refreshInterval)) // Reset timer
      }, refreshInterval)
    }

    // Cleanup on component unmount
    return () => {
      if (interval) clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [autoRefreshEnabled, isClient])

  const handleSync = async () => {
    setSyncing(true)
    try {
      console.log("🔄 Manual refresh: Fetching latest articles from Hashnode...")
      await loadArticlesData()
      console.log("✅ Manual refresh completed!")
    } catch (error) {
      console.error("❌ Error during manual refresh:", error)
      alert(`Error refreshing articles: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setSyncing(false)
    }
  }

  const fetchFromAPI = async () => {
    setApiLoading(true)
    setApiError(null)
    try {
      const response = await fetch(`/api/hashnode?username=${currentConfig.hashnodeUsername}&includeSeries=${currentConfig.includeSeriesData}&pageSize=${currentConfig.maxArticlesPerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      })
      
      const data = await response.json()
      setApiResponse(data)
      
      if (!response.ok) {
        setApiError(data.error || 'Failed to fetch from API')
      } else {
        console.log(`📊 API Response: ${data.data?.articles?.length || 0} articles fetched`)
      }
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setApiLoading(false)
    }
  }

  // Get all unique tags with counts
  const allTags = Array.from(new Set(articles.flatMap((article) => article.tags.map((tag) => tag.name))))
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = articles.filter(article => 
      article.tags.some(articleTag => articleTag.name === tag)
    ).length
    return acc
  }, {} as Record<string, number>)

  // Filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.brief && article.brief.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTags = selectedTags.length === 0 || selectedTags.some(selectedTag => 
      article.tags.some((tag) => tag.name === selectedTag)
    )
    const matchesSeries = !selectedSeries || article.series_name === selectedSeries
    return matchesSearch && matchesTags && matchesSeries
  })

  // Filter tags based on search term
  const filteredTags = allTags.filter(tag => 
    tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
  )

  // Handle tag selection
  const handleTagToggle = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName)
        ? prev.filter(tag => tag !== tagName)
        : [...prev, tagName]
    )
  }

  const clearAllTags = () => {
    setSelectedTags([])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-mono">Loading articles from database...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-primary">$ cat articles/</h1>
              {/* Development-only controls */}
              {isClient && showDevControls && (
                <div className="flex gap-2">
                  <Button onClick={fetchFromAPI} disabled={apiLoading} variant="outline" size="sm" className="bg-transparent">
                    {apiLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Code className="h-4 w-4 mr-2" />}
                    Fetch API
                  </Button>
                  <Button onClick={handleSync} disabled={syncing} variant="outline" size="sm" className="bg-transparent">
                    {syncing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                    Sync DB
                  </Button>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-lg">
              Technical articles, tutorials, and insights from my development journey
            </p>
          </div>

          <Tabs defaultValue="articles" className="w-full">
            <TabsList className={`grid w-full ${isClient && showDevControls ? 'grid-cols-2' : 'grid-cols-1'}`}>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Articles View
              </TabsTrigger>
              {/* API Response tab only in development */}
              {isClient && showDevControls && (
                <TabsTrigger value="api" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  API Response
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="articles" className="mt-6">
              {articles.length > 0 && (
                <div className="text-sm text-muted-foreground mb-6 space-y-1 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Live: {articles.length} articles from Hashnode
                      </p>
                      {isClient && lastSync && <p>Last updated: {new Date(lastSync).toLocaleString()}</p>}
                      {/* Development-only detailed info */}
                      {isClient && showRefreshTimer && autoRefreshEnabled && nextRefreshTime && (
                        <p className="text-xs">Next auto-refresh: {nextRefreshTime.toLocaleTimeString()}</p>
                      )}
                      {/* Production-friendly message */}
                      {isClient && !showDevControls && (
                        <p className="text-xs">Articles automatically sync with your Hashnode blog every {currentConfig.refreshIntervalMinutes} minutes</p>
                      )}
                    </div>
                    {/* Development-only toggle */}
                    {isClient && showAutoRefreshToggle && (
                      <button
                        onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                        className="text-xs px-2 py-1 rounded border border-primary/20 hover:bg-primary/10 transition-colors"
                      >
                        Auto-refresh: {autoRefreshEnabled ? 'ON' : 'OFF'}
                      </button>
                    )}
                  </div>
                </div>
              )}

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No articles found. Make sure to update the HASHNODE_USERNAME in the code with your actual Hashnode
                username.
              </p>
              <p className="text-sm text-muted-foreground">
                Current username: <code className="bg-muted px-2 py-1 rounded">maroayman</code>
              </p>
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="mb-8 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-primary/20"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Tag Filter with Multi-Select */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-transparent border-primary/20 justify-start"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        {selectedTags.length === 0 
                          ? "Filter by tags" 
                          : `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`
                        }
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                      <div className="p-4 border-b">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Search tags..."
                            value={tagSearchTerm}
                            onChange={(e) => setTagSearchTerm(e.target.value)}
                            className="pl-10 h-8"
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <div className="p-2">
                          {filteredTags.length === 0 ? (
                            <p className="text-sm text-muted-foreground p-2">No tags found</p>
                          ) : (
                            filteredTags.map((tag) => (
                              <div key={tag} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-sm">
                                <Checkbox
                                  id={`tag-${tag}`}
                                  checked={selectedTags.includes(tag)}
                                  onCheckedChange={() => handleTagToggle(tag)}
                                />
                                <label
                                  htmlFor={`tag-${tag}`}
                                  className="text-sm cursor-pointer flex-1 flex items-center justify-between"
                                >
                                  <span>#{tag}</span>
                                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                    {tagCounts[tag]}
                                  </span>
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                      {selectedTags.length > 0 && (
                        <div className="p-3 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearAllTags}
                            className="w-full"
                          >
                            Clear all filters
                          </Button>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                  {/* Selected Tags Display */}
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={() => handleTagToggle(tag)}
                        >
                          #{tag}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Series Section */}
              {series.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    Article Series
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {series.map((s, index) => (
                      <Card
                        key={index}
                        className={`border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer ${
                          selectedSeries === s.name ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedSeries(selectedSeries === s.name ? null : s.name)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-between">
                            {s.name}
                            <Badge variant="secondary" className="text-xs w-fit mb-2">
                              {s.total_posts} articles
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {s.description || "A collection of related articles"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
                  >
                    {article.cover_image_url && (
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={article.cover_image_url || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      {article.series_name && (
                        <Badge variant="outline" className="text-xs w-fit mb-2">
                          <Hash className="h-3 w-3 mr-1" />
                          {article.series_name}
                        </Badge>
                      )}
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.brief}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.published_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatReadTime(article.read_time_minutes || 5)}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{article.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:border-primary group-hover:text-primary transition-colors bg-transparent"
                        asChild
                      >
                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read on Hashnode
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Results Summary */}
              {(searchTerm || selectedTags.length > 0 || selectedSeries) && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <span>Showing {filteredArticles.length} of {articles.length} articles</span>
                      {searchTerm && <span> • Searching: "{searchTerm}"</span>}
                      {selectedTags.length > 0 && <span> • Tags: {selectedTags.join(', ')}</span>}
                      {selectedSeries && <span> • Series: {selectedSeries}</span>}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedTags([])
                        setSelectedSeries(null)
                        setTagSearchTerm("")
                      }}
                      className="text-xs"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </div>
              )}

              {filteredArticles.length === 0 && articles.length > 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-2">No articles found matching your criteria.</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </>
          )}
            </TabsContent>

            {/* API Response tab - development only */}
            {isClient && showDevControls && (
              <TabsContent value="api" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-primary">Hashnode API Response</h2>
                    <Button 
                      onClick={fetchFromAPI} 
                      disabled={apiLoading} 
                      variant="outline" 
                      size="sm"
                      className="bg-transparent"
                    >
                      {apiLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Refresh API Data
                    </Button>
                  </div>

                {apiError && (
                  <div className="p-4 border border-red-500/20 bg-red-500/10 rounded-lg">
                    <p className="text-red-500 font-mono text-sm">Error: {apiError}</p>
                  </div>
                )}

                {apiLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="font-mono">Fetching from Hashnode API...</span>
                    </div>
                  </div>
                )}

                {apiResponse && !apiLoading && (
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        API Response Data
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        <p>Status: {apiResponse.success ? 'Success' : 'Failed'}</p>
                        <p>Timestamp: {apiResponse.metadata?.timestamp}</p>
                        <p>Source: {apiResponse.metadata?.source}</p>
                        <p>Username: {apiResponse.metadata?.username}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {apiResponse.success && apiResponse.data && (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Articles ({apiResponse.data.articles?.length || 0})
                              </h3>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <p>Total Count: {apiResponse.data.totalCount}</p>
                                <p>Page: {apiResponse.data.page}</p>
                                <p>Page Size: {apiResponse.data.pageSize}</p>
                                <p>Has Next: {apiResponse.data.hasNextPage ? 'Yes' : 'No'}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Hash className="h-4 w-4" />
                                Series ({apiResponse.data.series?.length || 0})
                              </h3>
                              {apiResponse.data.series?.map((series: any, index: number) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  <p>• {series.name} ({series.posts?.totalDocuments || 0} posts)</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-4">
                          <h3 className="font-semibold mb-2">Raw JSON Response:</h3>
                          <div className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
                            <pre className="text-xs font-mono">
                              {JSON.stringify(apiResponse, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!apiResponse && !apiLoading && !apiError && (
                  <div className="text-center py-12 border border-primary/20 rounded-lg bg-primary/5">
                    <div className="flex flex-col items-center gap-4">
                      <Database className="h-12 w-12 text-primary/50" />
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">No API Data</h3>
                        <p className="text-muted-foreground mb-4">
                          Click "Fetch API" to load data from the Hashnode API endpoint
                        </p>
                        <Button onClick={fetchFromAPI} variant="outline" className="bg-transparent">
                          <Code className="h-4 w-4 mr-2" />
                          Fetch API Data
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
