import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const education = await sql`
      SELECT * FROM education 
      ORDER BY 
        CASE WHEN is_current THEN 0 ELSE 1 END,
        COALESCE(end_date, CURRENT_DATE) DESC,
        start_date DESC
    `

    return NextResponse.json(education)
  } catch (error) {
    console.error("Failed to fetch education:", error)
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 })
  }
}
