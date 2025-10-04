import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const workExperience = await sql`
      SELECT * FROM work_experience 
      ORDER BY 
        CASE WHEN is_current THEN 0 ELSE 1 END,
        COALESCE(end_date, CURRENT_DATE) DESC,
        start_date DESC
    `

    return NextResponse.json(workExperience)
  } catch (error) {
    console.error("Failed to fetch work experience:", error)
    return NextResponse.json({ error: "Failed to fetch work experience" }, { status: 500 })
  }
}
