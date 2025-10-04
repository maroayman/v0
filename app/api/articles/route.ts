import { NextResponse } from "next/server"
import { getArticlesFromDatabase } from "@/lib/database"

export async function GET() {
  try {
    const { articles } = await getArticlesFromDatabase()

    return NextResponse.json({
      articles,
      lastSync: articles.length > 0 ? articles[0].updated_at : null,
      count: articles.length,
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}
