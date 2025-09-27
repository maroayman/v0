// API route for fetching Hashnode articles
import { fetchHashnodeArticles, fetchHashnodeSeries } from '../../../lib/hashnode'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const username = url.searchParams.get('username') || 'maroayman'
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20')
    const includeSeries = url.searchParams.get('includeSeries') === 'true'

    // Fetch articles
    const articlesData = await fetchHashnodeArticles(username, page, pageSize)
    
    let seriesData: any[] = []
    if (includeSeries) {
      seriesData = await fetchHashnodeSeries(username)
    }

    const response = {
      success: true,
      data: {
        articles: articlesData.articles,
        totalCount: articlesData.totalCount,
        series: seriesData,
        page,
        pageSize,
        hasNextPage: page * pageSize < articlesData.totalCount,
        hasPreviousPage: page > 1,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        username,
        source: 'hashnode',
        autoRefresh: 'enabled'
      }
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache for 2 minutes to balance freshness with performance
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=1800',
        'X-Generated-At': new Date().toISOString(),
        'X-Articles-Count': articlesData.articles.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error fetching Hashnode data:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to fetch articles from Hashnode',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username = 'maroayman', page = 1, pageSize = 20, includeSeries = true } = body

    // Fetch articles
    const articlesData = await fetchHashnodeArticles(username, page, pageSize)
    
    let seriesData: any[] = []
    if (includeSeries) {
      seriesData = await fetchHashnodeSeries(username)
    }

    const response = {
      success: true,
      data: {
        articles: articlesData.articles,
        totalCount: articlesData.totalCount,
        series: seriesData,
        page,
        pageSize,
        hasNextPage: page * pageSize < articlesData.totalCount,
        hasPreviousPage: page > 1,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        username,
        source: 'hashnode',
        requestType: 'POST'
      }
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching Hashnode data:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to fetch articles from Hashnode',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
