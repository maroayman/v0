import { NextRequest, NextResponse } from 'next/server'

// Enhanced series fetching function with correct GraphQL schema
async function getHashnodeSeries(username: string) {
  const query = `
    query GetUserSeries($username: String!) {
      user(username: $username) {
        seriesList(first: 50) {
          edges {
            node {
              id
              name
              slug
              description {
                text
              }
              posts(first: 1) {
                totalDocuments
              }
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  `

  try {
    console.log(`🔄 Fetching series for ${username} from Hashnode GraphQL API...`)
    
    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('📊 Raw Hashnode series response:', JSON.stringify(result, null, 2))

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
    }

    const seriesEdges = result.data?.user?.seriesList?.edges || []
    
    const series = seriesEdges.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      slug: edge.node.slug,
      description: edge.node.description,
      posts: {
        totalDocuments: edge.node.posts.totalDocuments
      },
      createdAt: edge.node.createdAt,
      updatedAt: edge.node.updatedAt
    }))

    // Sort by most recently updated first
    series.sort((a, b) => {
      const dateA = new Date(b.updatedAt || b.createdAt).getTime()
      const dateB = new Date(a.updatedAt || a.createdAt).getTime() 
      return dateA - dateB
    })

    console.log(`✅ Successfully processed ${series.length} series for ${username}:`)
    series.forEach((s, index) => {
      console.log(`   ${index + 1}. "${s.name}" (slug: "${s.slug}", articles: ${s.posts.totalDocuments})`)
    })
    
    return series

  } catch (error) {
    console.error('❌ Error fetching series from Hashnode:', error)
    throw error
  }
}

// FIXED: Enhanced articles fetching function with correct Hashnode GraphQL schema
async function getHashnodeArticles(username: string, page: number = 1, pageSize: number = 50) {
  // 🔧 FIXED: Use correct Hashnode GraphQL schema
  const query = `
    query GetUserPosts($username: String!, $page: Int!, $pageSize: Int!) {
      user(username: $username) {
        posts(pageSize: $pageSize, page: $page) {
          totalDocuments
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              brief
              slug
              url
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                id
                name
                slug
              }
              series {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  `

  try {
    console.log(`🔄 Fetching articles for ${username} with page=${page}, pageSize=${pageSize}`)
    
    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({
        query,
        variables: { username, page, pageSize }
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Hashnode API HTTP error:', response.status, errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('📊 Raw Hashnode articles response:', JSON.stringify(result, null, 2))

    if (result.errors) {
      console.error('❌ GraphQL errors:', result.errors)
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
    }

    const postsData = result.data?.user?.posts
    const articles = postsData?.edges?.map((edge: any) => edge.node) || []

    console.log(`✅ Successfully fetched ${articles.length} articles for ${username}`)

    return {
      articles,
      pagination: {
        total: postsData?.totalDocuments || 0,
        page,
        pageSize,
        hasNextPage: postsData?.pageInfo?.hasNextPage || false,
        hasPreviousPage: postsData?.pageInfo?.hasPreviousPage || false,
      }
    }

  } catch (error) {
    console.error('❌ Error fetching articles from Hashnode:', error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || 'maroayman'
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20') // Reduced pageSize for reliability
    const includeSeries = searchParams.get('includeSeries') === 'true'
    const timestamp = searchParams.get('t') || Date.now().toString()

    console.log(`🔄 [${new Date().toISOString()}] FIXED: Fetching data for ${username}`)
    console.log(`📊 Parameters: page=${page}, size=${pageSize}, series=${includeSeries}, cache-bust=${timestamp}`)

    // Fetch articles with fixed GraphQL schema
    let articlesData
    try {
      articlesData = await getHashnodeArticles(username, page, pageSize)
      console.log(`✅ Articles fetched successfully: ${articlesData.articles.length} articles`)
    } catch (articlesError) {
      console.error('❌ Failed to fetch articles:', articlesError)
      // Return partial success with empty articles
      articlesData = {
        articles: [],
        pagination: { total: 0, page, pageSize, hasNextPage: false, hasPreviousPage: false }
      }
    }

    let seriesData = []
    
    // Fetch series if requested (with error handling)
    if (includeSeries) {
      try {
        console.log('🔄 Fetching series data from Hashnode...')
        seriesData = await getHashnodeSeries(username)
        console.log(`✅ Successfully fetched ${seriesData.length} series:`)
        seriesData.forEach((series, index) => {
          console.log(`   ${index + 1}. "${series.name}" (${series.posts.totalDocuments} articles) - Slug: "${series.slug}"`)
        })
      } catch (seriesError) {
        console.error('❌ Failed to fetch series (continuing without series):', seriesError)
        // Continue without series rather than failing entirely
      }
    }

    const response = {
      success: true,
      data: {
        articles: articlesData.articles,
        series: seriesData,
        pagination: articlesData.pagination,
        metadata: {
          username,
          page,
          pageSize,
          includeSeries,
          articlesCount: articlesData.articles.length,
          seriesCount: seriesData.length,
          timestamp: new Date().toISOString(),
          cacheBust: timestamp,
          fetchedAt: new Date().toISOString(),
          apiVersion: 'v2-fixed'
        }
      },
      timestamp: new Date().toISOString()
    }

    console.log(`✅ FIXED API Response ready: ${articlesData.articles.length} articles, ${seriesData.length} series`)

    return NextResponse.json(response, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Timestamp': new Date().toISOString(),
        'X-Cache-Bust': timestamp,
        'X-Series-Count': seriesData.length.toString(),
        'X-Articles-Count': articlesData.articles.length.toString(),
        'X-API-Version': 'v2-fixed',
      },
    })

  } catch (error) {
    console.error('❌ FIXED API Error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: { articles: [], series: [] },
        timestamp: new Date().toISOString(),
        apiVersion: 'v2-fixed'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
          'X-Error': 'true',
          'X-API-Version': 'v2-fixed',
        },
      }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username = 'maroayman', page = 1, pageSize = 20, includeSeries = true } = body

    console.log(`🔄 POST: FIXED - Fetching data for ${username}`)

    // Fetch articles with error handling
    let articlesData
    try {
      articlesData = await getHashnodeArticles(username, page, pageSize)
    } catch (articlesError) {
      console.error('❌ POST: Failed to fetch articles:', articlesError)
      articlesData = {
        articles: [],
        pagination: { total: 0, page, pageSize, hasNextPage: false, hasPreviousPage: false }
      }
    }

    let seriesData = []
    
    // Fetch series if requested
    if (includeSeries) {
      try {
        console.log('🔄 POST: Fetching series data...')
        seriesData = await getHashnodeSeries(username)
        console.log(`✅ POST: Successfully fetched ${seriesData.length} series`)
      } catch (seriesError) {
        console.error('❌ POST: Failed to fetch series:', seriesError)
      }
    }

    const response = {
      success: true,
      data: {
        articles: articlesData.articles,
        series: seriesData,
        pagination: articlesData.pagination,
        metadata: {
          username,
          page,
          pageSize,
          includeSeries,
          articlesCount: articlesData.articles.length,
          seriesCount: seriesData.length,
          timestamp: new Date().toISOString(),
          apiVersion: 'v2-fixed'
        }
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache',
        'X-API-Version': 'v2-fixed',
      },
    })

  } catch (error) {
    console.error('❌ POST FIXED API Error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: { articles: [], series: [] },
        timestamp: new Date().toISOString(),
        apiVersion: 'v2-fixed'
      },
      { status: 500 }
    )
  }
}
