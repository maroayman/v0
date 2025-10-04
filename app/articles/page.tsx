"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Search, Filter, RefreshCw, AlertCircle, Zap } from "lucide-react"

// Replace CONFIG with direct environment check
const isProduction = process.env.NODE_ENV === 'production'

// Fixed interfaces to match Hashnode API
interface HashnodeArticle {
  id: string
  title: string
  brief: string
  slug: string
  url: string
  publishedAt: string
  readTimeInMinutes: number
  coverImage?: {
    url: string
  }
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  series?: {
    id: string
    name: string
    slug: string
  }
}

interface HashnodeSeries {
  id: string
  name: string
  slug: string
  description?: {
    text: string
  }
  posts: {
    totalDocuments: number
  }
  createdAt?: string
  updatedAt?: string
}

export default function ArticlesPage() {
  // 🔧 HYDRATION FIX: Prevent hydration mismatches
  const [mounted, setMounted] = useState(false)
  const [articles, setArticles] = useState<HashnodeArticle[]>([])
  const [series, setSeries] = useState<HashnodeSeries[]>([])
  const [filteredArticles, setFilteredArticles] = useState<HashnodeArticle[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedSeries, setSelectedSeries] = useState<string>("")
  const [tagSearch, setTagSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [lastSync, setLastSync] = useState<string>("")
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [apiError, setApiError] = useState<string>("")
  const [nextRefresh, setNextRefresh] = useState<number>(0)
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true)
  const [requestId, setRequestId] = useState<string>("")

  // 🔧 HYDRATION FIX: Only run client-side code after mounting
  useEffect(() => {
    setMounted(true)
    loadArticlesData()
    
    // Auto-refresh setup only after mounting - more frequent for fresh data
    const interval = setInterval(() => {
      if (autoRefreshEnabled) {
        console.log("🔄 Auto-refresh triggered - forcing fresh data with cache-bust")
        loadArticlesData()
      }
    }, 5 * 60 * 1000) // 5 minutes instead of 10

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setNextRefresh(prev => prev > 0 ? prev - 1 : 300) // Reset to 5 minutes
    }, 1000)

    // Page visibility API for auto-refresh
    const handleVisibilityChange = () => {
      if (!document.hidden && autoRefreshEnabled) {
        console.log("🔄 Page became visible, forcing fresh data")
        loadArticlesData()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      clearInterval(countdownInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [autoRefreshEnabled])

  // 🔥 AGGRESSIVE CACHE-BUSTING: Combined function to load both articles and series from API
  const loadArticlesData = async () => {
    try {
      setIsLoading(true)
      setApiError("")
      
      // 🔥 MULTIPLE CACHE-BUSTING STRATEGIES
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substr(2, 9)
      const sessionId = Math.random().toString(36).substr(2, 15)
      const requestTimestamp = new Date().toISOString()
      
      // 🔥 AGGRESSIVE URL with multiple cache-busting parameters
      const url = `/api/hashnode?` + new URLSearchParams({
        t: timestamp.toString(),
        includeSeries: 'true',
        pageSize: '50',
        username: 'maroayman',
        _cacheBust: randomId,
        _sessionId: sessionId,
        _timestamp: requestTimestamp,
        _random: Math.random().toString(),
        _force: 'true'
      }).toString()
      
      console.log("🔥 AGGRESSIVE CACHE-BUST: Fetching FRESH data from:", url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // 🔥 AGGRESSIVE CACHE-BUSTING HEADERS
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Cache-Bust': randomId,
          'X-Timestamp': timestamp.toString(),
          'X-Session-ID': sessionId,
          'X-Force-Fresh': 'true',
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("🔥 CACHE-BUSTED API Response received:", data)
      
      if (data.success && data.data) {
        // Set articles
        const articlesData = data.data.articles || []
        setArticles(articlesData)
        setFilteredArticles(articlesData)
        
        // Set series (automatically fetched from API)
        const seriesData = data.data.series || []
        setSeries(seriesData)
        
        console.log(`✅ FRESH DATA LOADED WITH CACHE-BUST: ${articlesData.length} articles and ${seriesData.length} series`)
        console.log("📚 Series loaded with FRESH cache-busted data:", seriesData.map((s: HashnodeSeries) => `"${s.name}" (${s.posts.totalDocuments} articles)`))
        
        // Check for your specific series
        const foundProjects = seriesData.find((s: HashnodeSeries) => s.slug.includes('project') || s.name.toLowerCase().includes('project'))
        const foundLinux = seriesData.find((s: HashnodeSeries) => s.slug.includes('linux') || s.name.toLowerCase().includes('linux'))
        const foundDocker = seriesData.find((s: HashnodeSeries) => s.slug.includes('docker') || s.name.toLowerCase().includes('docker'))
        
        console.log("🔍 Series verification after cache-bust:")
        console.log("   Projects found:", foundProjects ? `"${foundProjects.name}"` : 'NOT FOUND')
        console.log("   Linux found:", foundLinux ? `"${foundLinux.name}"` : 'NOT FOUND')
        console.log("   Docker found:", foundDocker ? `"${foundDocker.name}"` : 'NOT FOUND')
        
        // 🔧 HYDRATION FIX: Only update sync time after mounting
        if (mounted) {
          setLastSync(new Date().toISOString())
        }
        
        // Store request ID for debugging
        setRequestId(data.data.metadata?.requestId || randomId)
        
        setApiResponse(data)
        setNextRefresh(300) // Reset countdown to 5 minutes
        
      } else {
        throw new Error(data.error || 'Failed to fetch articles')
      }
    } catch (error) {
      console.error("❌ Error loading FRESH articles with cache-bust:", error)
      setApiError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  // 🔥 SUPER AGGRESSIVE: Manual refresh function with extra cache-busting
  const handleManualRefresh = async () => {
    console.log("🔥 SUPER AGGRESSIVE MANUAL REFRESH - bypassing ALL cache layers")
    await loadArticlesData()
  }

  // Filter articles based on search, tags, and series
  useEffect(() => {
    // 🔧 HYDRATION FIX: Don't run filtering until mounted
    if (!mounted) return

    let filtered = articles

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.brief.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
      )
    }

    // Tags filter (AND logic - article must have ALL selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter(article =>
        selectedTags.every(selectedTag =>
          article.tags.some(tag => tag.name === selectedTag)
        )
      )
    }

    // Series filter
    if (selectedSeries && selectedSeries !== 'all') {
      filtered = filtered.filter(article => 
        article.series?.slug === selectedSeries
      )
      console.log(`🔍 Filtering by series "${selectedSeries}": ${filtered.length} articles found`)
    }

    setFilteredArticles(filtered)
    console.log(`🔍 Filtered ${filtered.length} articles from ${articles.length} total`)
  }, [searchTerm, selectedTags, selectedSeries, articles, mounted])

  // Get all unique tags from articles
  const allTags = articles.reduce((tags: string[], article) => {
    article.tags.forEach(tag => {
      if (!tags.includes(tag.name)) {
        tags.push(tag.name)
      }
    })
    return tags
  }, []).sort()

  // Filter tags based on search
  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  )

  // Handle tag selection
  const handleTagToggle = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(tag => tag !== tagName)
        : [...prev, tagName]
    )
  }

  // Remove tag from selection
  const removeTag = (tagName: string) => {
    setSelectedTags(prev => prev.filter(tag => tag !== tagName))
  }

  // 🔧 HYDRATION FIX: Format date safely (client-side only)
  const formatDate = (dateString: string) => {
    if (!mounted) return ""
    return new Date(dateString).toLocaleDateString()
  }

  // 🔧 HYDRATION FIX: Format time safely (client-side only)
  const formatTime = (dateString: string) => {
    if (!mounted) return ""
    return new Date(dateString).toLocaleTimeString()
  }

  // 🔧 HYDRATION FIX: Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Articles</h1>
          <p className="text-muted-foreground mb-8">Loading articles from my blog...</p>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Articles</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>Live from Hashnode (Cache-Busted)</span>
              </div>
              <span>•</span>
              <span>{articles.length} articles</span>
              {series.length > 0 && (
                <>
                  <span>•</span>
                  <span>{series.length} series</span>
                </>
              )}
            </div>
            {!isProduction && (
              <div className="text-xs text-muted-foreground mt-1">
                {lastSync && `Last synced: ${formatTime(lastSync)}`}
                {nextRefresh > 0 && ` • Next refresh: ${Math.floor(nextRefresh / 60)}:${(nextRefresh % 60).toString().padStart(2, '0')}`}
                {requestId && ` • ID: ${requestId.slice(-6)}`}
              </div>
            )}
            
            {/* Debug info for series */}
            {!isProduction && (
              <div className="text-xs text-blue-600 mt-2 p-2 bg-blue-50 rounded border">
                <div className="font-medium">🔥 CACHE-BUSTED Series Debug Info ({series.length} found):</div>
                {series.length === 0 ? (
                  <div className="ml-2 text-red-600">❌ NO SERIES FOUND - Check API response!</div>
                ) : (
                  series.map((s, index) => (
                    <div key={s.id} className="ml-2">
                      {index + 1}. "{s.name}" (slug: "{s.slug}", articles: {s.posts.totalDocuments})
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleManualRefresh}
              disabled={isLoading}
              size="sm"
              variant="outline"
              className="bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
            >
              <Zap className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : 'text-yellow-600'}`} />
              Force Fresh
            </Button>
          </div>
        </div>

        {/* Series loading warning */}
        {series.length === 0 && !isLoading && !apiError && articles.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800">
              ❌ No series found! Expected: Projects, Linux, Docker. Try the "Force Fresh" button.
            </span>
          </div>
        )}

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="articles">Articles ({filteredArticles.length})</TabsTrigger>
            {!isProduction && (
              <TabsTrigger value="api">API Response</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Series Filter */}
                <Select value={selectedSeries} onValueChange={setSelectedSeries}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder={series.length > 0 ? "All series" : "No series found"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All series ({articles.length})</SelectItem>
                    {series.length === 0 ? (
                      <SelectItem value="no-series" disabled className="text-red-500">
                        ❌ No series found - Force refresh
                      </SelectItem>
                    ) : (
                      series.map((s) => (
                        <SelectItem key={s.id} value={s.slug}>
                          📚 {s.name} ({s.posts.totalDocuments})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                {/* Tags Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="w-4 h-4 mr-2" />
                      {selectedTags.length === 0 ? 'Filter by tags' : `${selectedTags.length} tags selected`}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Filter by tags</h4>
                        {selectedTags.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTags([])}
                          >
                            Clear all
                          </Button>
                        )}
                      </div>
                      
                      <Input
                        placeholder="Search tags..."
                        value={tagSearch}
                        onChange={(e) => setTagSearch(e.target.value)}
                      />
                      
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {filteredTags.map((tag) => {
                          const articleCount = articles.filter(article =>
                            article.tags.some(t => t.name === tag)
                          ).length
                          
                          return (
                            <div key={tag} className="flex items-center space-x-2">
                              <Checkbox
                                id={tag}
                                checked={selectedTags.includes(tag)}
                                onCheckedChange={() => handleTagToggle(tag)}
                              />
                              <label
                                htmlFor={tag}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                              >
                                {tag} ({articleCount})
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-500" />
              {isLoading ? (
                "Loading fresh data with cache-busting..."
              ) : (
                `Showing ${filteredArticles.length} of ${articles.length} articles (cache-busted)`
              )}
              {(searchTerm || selectedTags.length > 0 || selectedSeries) && (
                <span> with current filters</span>
              )}
              {selectedSeries && selectedSeries !== 'all' && (
                <span> in series "{series.find(s => s.slug === selectedSeries)?.name || selectedSeries}"</span>
              )}
            </div>

            {/* Error Display */}
            {apiError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
                <p className="font-medium">Error loading articles:</p>
                <p className="text-sm">{apiError}</p>
                <Button onClick={handleManualRefresh} variant="outline" size="sm" className="mt-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Try Force Refresh
                </Button>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredArticles.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    {articles.length === 0 ? 'No articles found.' : 'No articles match your current filters.'}
                  </p>
                  {(selectedTags.length > 0 || searchTerm || selectedSeries) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedTags([])
                        setSelectedSeries("")
                      }}
                      className="mt-4"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              ) : (
                filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    {article.coverImage && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={article.coverImage.url}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {article.title}
                        </a>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.brief}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{formatDate(article.publishedAt)}</span>
                          <span>{article.readTimeInMinutes} min read</span>
                        </div>
                        
                        {article.series && (
                          <Badge variant="outline" className="text-xs">
                            📚 {article.series.name}
                          </Badge>
                        )}
                        
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.id} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                          {article.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{article.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {!isProduction && (
            <TabsContent value="api" className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    API Response Data (Cache-Busted)
                  </h3>
                  <Button onClick={handleManualRefresh} disabled={isLoading} size="sm">
                    <Zap className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Force Fresh Fetch
                  </Button>
                </div>

                {apiResponse && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">{apiResponse.data?.articles?.length || 0}</div>
                          <div className="text-sm text-muted-foreground">Articles</div>
                        </CardContent>
                      </Card>
                      <Card className={apiResponse.data?.series?.length === 0 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">{apiResponse.data?.series?.length || 0}</div>
                          <div className="text-sm text-muted-foreground">
                            Series {apiResponse.data?.series?.length === 0 ? '❌' : '✅'}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">{apiResponse.success ? '✅' : '❌'}</div>
                          <div className="text-sm text-muted-foreground">Status</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">{apiResponse.timestamp ? formatTime(apiResponse.timestamp) : 'N/A'}</div>
                          <div className="text-sm text-muted-foreground">Fetched</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Cache-bust info */}
                    {apiResponse.data?.metadata && (
                      <Card className="border-yellow-200 bg-yellow-50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-yellow-800">
                            <Zap className="w-5 h-5" />
                            Cache-Busting Info
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm space-y-1 text-yellow-800">
                            <div>Request ID: {apiResponse.data.metadata.requestId}</div>
                            <div>Cache Bust: {apiResponse.data.metadata.cacheBust}</div>
                            <div>Fetched At: {formatTime(apiResponse.data.metadata.fetchedAt)}</div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Series Debug Section */}
                    <Card className={apiResponse.data?.series?.length === 0 ? 'border-red-200' : 'border-green-200'}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          Series Details 
                          {apiResponse.data?.series?.length === 0 ? '❌' : '✅'}
                          <span className="text-sm font-normal">
                            (Expected: Projects, Linux, Docker)
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {apiResponse.data?.series?.length === 0 ? (
                            <div className="p-3 bg-red-50 border border-red-200 rounded">
                              <p className="text-red-800 font-medium">❌ No series found in cache-busted response!</p>
                              <p className="text-red-600 text-sm mt-1">
                                Even with aggressive cache-busting, no series were returned.
                                This suggests an issue with the Hashnode GraphQL API or your account.
                              </p>
                            </div>
                          ) : (
                            apiResponse.data.series.map((series: HashnodeSeries, index: number) => (
                              <div key={series.id} className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                                <div className="font-medium">✅ {index + 1}. {series.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  Slug: "{series.slug}" | Articles: {series.posts.totalDocuments}
                                  {series.updatedAt && ` | Updated: ${formatDate(series.updatedAt)}`}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Raw API Response</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-xs bg-muted p-4 rounded-md overflow-auto max-h-96 whitespace-pre-wrap">
                          {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {apiError && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-destructive">API Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-destructive">{apiError}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
