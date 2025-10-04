import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const volunteering = await sql`
      SELECT * FROM volunteering 
      ORDER BY start_date DESC
    `

    return NextResponse.json(volunteering)
  } catch (error) {
    console.error("Failed to fetch volunteering data:", error)
    return NextResponse.json({ error: "Failed to fetch volunteering data" }, { status: 500 })
  }
}
