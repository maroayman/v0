import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const certifications = await sql`
      SELECT * FROM certifications 
      WHERE is_active = true
      ORDER BY issue_date DESC
    `

    return NextResponse.json(certifications)
  } catch (error) {
    console.error("Failed to fetch certifications:", error)
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 })
  }
}
