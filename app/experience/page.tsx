"use client"

import { useState } from "react"
import Link from "next/link"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { workExperience } from "@/lib/work-experience"
import { PaginatedList } from "@/components/ui/paginated-list"
import { ChevronDown, ChevronUp } from "lucide-react"

const INITIAL_VISIBLE = 4

function ResponsibilitiesList({ items }: { items: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasMore = items.length > INITIAL_VISIBLE
  const visibleItems = isExpanded ? items : items.slice(0, INITIAL_VISIBLE)

  return (
    <div className="mb-3">
      <ul className="text-sm text-muted-foreground space-y-1.5">
        {visibleItems.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-primary mt-1 text-xs">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Show more
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default function ExperiencePage() {
  const experiences = workExperience.filter(job => !job.isTemplate)

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Experience</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            My professional journey in DevOps and cloud engineering.
          </p>

          <PaginatedList
            items={experiences}
            itemsPerPage={5}
            threshold={20}
            className="space-y-10"
          >
            {(job) => (
              <article key={job.id}>
                {/* Company Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h2 className="font-semibold text-lg">
                    <Link href={job.url} target="_blank" className="hover:underline">
                      {job.company}
                    </Link>
                  </h2>
                  <span className="text-sm text-muted-foreground">{job.totalPeriod}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{job.location}</p>

                {/* Roles */}
                <div className="space-y-6">
                  {job.roles.map((role, roleIndex) => (
                    <div
                      key={roleIndex}
                      className={roleIndex > 0 ? 'pt-6 border-t border-border' : ''}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                        <h3 className="font-medium">{role.position}</h3>
                        <span className="text-xs text-muted-foreground">{role.period}</span>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {role.description}
                      </p>

                      {role.responsibilities && (
                        <ResponsibilitiesList items={role.responsibilities} />
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {role.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </PaginatedList>
        </div>
      </main>
    </div>
  )
}
