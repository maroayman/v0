"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, ExternalLink, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { personalProjects, academicProjects } from "@/lib/projects"

const INITIAL_VISIBLE = 4

function FeaturesList({ items }: { items: string[] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasMore = items.length > INITIAL_VISIBLE
  const visibleItems = isExpanded ? items : items.slice(0, INITIAL_VISIBLE)

  return (
    <div>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {/* Intro */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4">Projects</h1>
            <p className="text-muted-foreground leading-relaxed">
              A collection of personal and academic projects showcasing DevOps practices, cloud infrastructure, and full-stack development.
            </p>
          </div>

          {/* Personal Projects */}
          <section className="mb-16">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Personal Projects</h2>
            <div className="space-y-10">
              {personalProjects.map((project, index) => (
                <article key={index} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="font-medium text-lg">
                      {project.github ? (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 hover:underline"
                        >
                          {project.title}
                          <Github className="h-4 w-4" />
                        </Link>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <div className="flex items-center gap-3">
                      {project.duration && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {project.duration}
                        </span>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </Link>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <FeaturesList items={project.features} />
                </article>
              ))}
            </div>
          </section>

          {/* Academic Projects */}
          <section>
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Academic Projects</h2>
            <div className="space-y-10">
              {academicProjects.map((project, index) => (
                <article key={index} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="font-medium text-lg">
                      {project.github ? (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 hover:underline"
                        >
                          {project.title}
                          <Github className="h-4 w-4" />
                        </Link>
                      ) : (
                        project.title
                      )}
                    </h3>
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Demo
                      </Link>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <FeaturesList items={project.features} />
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
