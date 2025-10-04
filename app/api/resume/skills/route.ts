import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const skills = await sql`
      SELECT * FROM skills 
      ORDER BY is_featured DESC, proficiency_level DESC, years_experience DESC
    `

    return NextResponse.json(skills)
  } catch (error) {
    console.error("Failed to fetch skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}
