"use client"

import Link from "next/link"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { workExperience } from "@/lib/work-experience"
import { PaginatedList } from "@/components/ui/paginated-list"

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

                {/* Roles with Timeline - dots and line appear when multiple roles */}
                <div className="relative">
                  {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="relative pl-6 pb-6 last:pb-0">
                      {/* Timeline line - only shows when multiple roles */}
                      {job.roles.length > 1 && roleIndex < job.roles.length - 1 && (
                        <div className="absolute left-[7px] top-3 bottom-0 w-0.5 bg-border" />
                      )}

                      {/* Timeline dot - only shows when multiple roles */}
                      {job.roles.length > 1 && (
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-primary bg-background" />
                      )}

                      {/* Role Content */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                          <h3 className="font-medium">{role.position}</h3>
                          <span className="text-xs text-muted-foreground">{role.period}</span>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {role.description}
                        </p>

                        {/* Responsibilities - only renders if not null */}
                        {role.responsibilities && (
                          <ul className="text-sm text-muted-foreground space-y-1.5 mb-3">
                            {role.responsibilities.map((item, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-primary mt-1 text-xs">•</span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
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

