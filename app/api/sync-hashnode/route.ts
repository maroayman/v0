import { type NextRequest, NextResponse } from "next/server"
import { fetchHashnodeArticles, fetchHashnodeSeries } from "@/lib/hashnode"
import { syncArticlesToDatabase } from "@/lib/database"

const HASHNODE_USERNAME = "maroayman"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const secret = process.env.HASHNODE_REVALIDATION_SECRET

    // Only require auth if secret is set and auth header is provided
    if (secret && authHeader && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Starting Hashnode sync...")

    // Fetch data from Hashnode
    const [articlesData, seriesData] = await Promise.all([
      fetchHashnodeArticles(HASHNODE_USERNAME, 1, 50),
      fetchHashnodeSeries(HASHNODE_USERNAME),
    ])

    console.log(`[v0] Fetched ${articlesData.articles.length} articles and ${seriesData.length} series from Hashnode`)

    // Sync to database
    const result = await syncArticlesToDatabase(articlesData.articles, seriesData)

    console.log("[v0] Sync completed successfully")

    return NextResponse.json({
      success: true,
      message: "Hashnode data synced successfully",
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error syncing Hashnode data:", error)
    return NextResponse.json(
      {
        error: "Failed to sync Hashnode data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Allow GET requests for manual triggering
export async function GET(request: NextRequest) {
  return POST(request)
}
