"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import { ProgressiveFeaturesList } from "@/components/ui/progressive-features-list"
import { academicProjects } from "@/lib/projects"
import Link from "next/link"

export function AcademicProjects() {
  return (
    <section id="academic-projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Academic Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {academicProjects.map((project, index) => (
              <Card
                key={index}
                className="h-full border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                    {project.title}
                    {project.github && (
                      <Link
                        href={project.github}
                        className="text-primary hover:text-primary/80 transition-colors hover:scale-110 transform"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <ProgressiveFeaturesList items={project.features} increment={4} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
