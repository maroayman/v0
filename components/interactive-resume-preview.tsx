"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Database, Filter, Eye } from "lucide-react"
import Link from "next/link"

export function InteractiveResumePreview() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-primary text-sm font-mono mb-8">
          <pre>{`
┌─────────────────────────────────────────────────────────────┐
│ INTERACTIVE RÉSUMÉ SYSTEM                                   │
│ marwan@portfolio:~/features$ ls -la interactive_resume/    │
└─────────────────────────────────────────────────────────────┘
          `}</pre>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Dynamic Professional Profile</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Experience my résumé as an interactive, database-driven application instead of a static PDF. Filter by
                technology stack, explore detailed project descriptions, and view my professional journey through a
                modern, searchable interface.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Database className="h-4 w-4 text-primary" />
                  Database-Driven
                </div>
                <p className="text-xs text-muted-foreground">Real-time data from PostgreSQL with instant updates</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Filter className="h-4 w-4 text-primary" />
                  Smart Filtering
                </div>
                <p className="text-xs text-muted-foreground">Filter experience by tech stack and industry</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Eye className="h-4 w-4 text-primary" />
                  Multiple Views
                </div>
                <p className="text-xs text-muted-foreground">Toggle between full and condensed display modes</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4 text-primary" />
                  Expandable Sections
                </div>
                <p className="text-xs text-muted-foreground">Detailed achievements and project descriptions</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                Next.js
              </Badge>
              <Badge variant="secondary" className="text-xs">
                PostgreSQL
              </Badge>
              <Badge variant="secondary" className="text-xs">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Tailwind CSS
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Neon Database
              </Badge>
            </div>

            <div className="flex gap-4">
              <Button asChild className="font-mono">
                <Link href="/resume">
                  <Eye className="h-4 w-4 mr-2" />
                  View Interactive Résumé
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-mono">resume_data.sql</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Live Data
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="font-mono text-xs text-muted-foreground space-y-1">
                  <div>SELECT * FROM work_experience</div>
                  <div className="text-primary">{"WHERE tech_stack @> ARRAY['Docker'];"}</div>
                  <div></div>
                  <div className="text-green-400">{"✓ 2 professional development programs"}</div>
                  <div className="text-green-400">{"✓ 8 Google Cloud certifications"}</div>
                  <div className="text-green-400">{"✓ 20+ technical skills categorized"}</div>
                  <div className="text-green-400">{"✓ Active volunteer leadership role"}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-mono">Key Features</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Real-time skill proficiency tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Certification badge integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Technology stack filtering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Expandable project details</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
