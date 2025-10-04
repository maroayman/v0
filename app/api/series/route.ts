import { NextResponse } from "next/server"
import { getSeriesFromDatabase } from "@/lib/database"

export async function GET() {
  try {
    const series = await getSeriesFromDatabase()

    return NextResponse.json({
      series,
      count: series.length,
    })
  } catch (error) {
    console.error("Error fetching series:", error)
    return NextResponse.json({ error: "Failed to fetch series" }, { status: 500 })
  }
}
