"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Clock, ArrowRight } from "lucide-react"
import { ProgressiveFeaturesList } from "@/components/ui/progressive-features-list"
import { personalProjects } from "@/lib/projects"
import Link from "next/link"

const statusColors = {
  Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Concept: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}

// Take first 4 projects for homepage display
const featuredProjects = personalProjects.slice(0, 4)

export function PersonalProjects() {
  return (
    <section id="personal-projects" className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Featured Projects</h2>
            <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
              <Link href="/projects" className="flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="h-full border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="mb-2 sm:mb-3">
                    <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors flex items-start gap-2 mb-2 sm:mb-3">
                      <Code className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="flex-1">{project.title}</span>
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:scale-110 transition-transform flex-shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4 text-primary hover:text-primary/80" />
                        </Link>
                      )}
                    </CardTitle>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed mb-2 sm:mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <Badge
                      className="text-[10px] sm:text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      Completed
                    </Badge>
                    {project.duration && (
                      <Badge
                        variant="outline"
                        className="text-[10px] sm:text-xs group-hover:border-primary/50 group-hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        {project.duration}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-4 sm:p-6 pt-0">
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.slice(0, 6).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-[10px] sm:text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 6 && (
                      <Badge variant="secondary" className="text-[10px] sm:text-xs">
                        +{project.technologies.length - 6}
                      </Badge>
                    )}
                  </div>

                  <div className="mb-4 sm:mb-6 flex-1">
                    <ProgressiveFeaturesList items={project.features} increment={4} />
                  </div>

                  {project.demo && (
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 group-hover:border-primary group-hover:text-primary transition-colors bg-transparent text-xs"
                        asChild
                      >
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Demo
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="flex justify-center sm:hidden">
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/projects" className="flex items-center justify-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
