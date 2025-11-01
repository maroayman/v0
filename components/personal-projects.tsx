"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredProjects = [
  {
    title: "Terraform AWS EC2 Infrastructure as Code",
    description:
      "A production-ready Terraform project that automates the deployment of secure EC2 instances on AWS with real-time monitoring dashboard",
    technologies: ["Terraform", "AWS EC2", "Infrastructure as Code", "SSH", "DevOps", "AWS VPC", "Security Groups"],
    features: [
      "Automated EC2 instance provisioning with Terraform",
      "SSH key generation and secure access configuration",
      "Production-ready infrastructure with security best practices",
      "Real-time monitoring dashboard for instance performance",
      "5-minute quick deployment with terraform apply",
      "Comprehensive documentation and deployment guides",
    ],
    github: "https://github.com/maroayman/depi-project-4",
    demo: null,
    status: "Completed",
    duration: "1 week",
    category: "Infrastructure as Code",
  },
  {
    title: "Flask Notes App - Production Deployment",
    description:
      "A complete end-to-end web application deployed on AWS EC2 with production-ready features and monitoring",
    technologies: [
      "Flask",
      "MySQL",
      "SQLAlchemy",
      "Nginx",
      "Docker",
      "AWS EC2",
      "Tailwind CSS",
      "Prometheus",
      "DevOps",
    ],
    features: [
      "Flask-based notes app with full CRUD operations",
      "Nginx reverse proxy for production traffic",
      "MySQL database with SQLAlchemy ORM",
      "Automated database migrations using Alembic",
      "Multi-stage Docker builds for optimization",
      "Health monitoring and Prometheus metrics",
    ],
    github: "https://github.com/maroayman/depi-project-3",
    demo: null,
    status: "Completed",
    duration: "2 weeks",
    category: "Full-Stack Production Deployment",
  },
  {
    title: "Go Application Web Note App",
    description: "A Go-based web application for note management with automated deployment and scheduled tasks",
    technologies: ["Go", "SQLite", "Ansible", "Cron", "DevOps", "Automation"],
    features: [
      "Built with Go for high performance and concurrency",
      "SQLite database for lightweight data storage",
      "Cronie package for implementing cron jobs",
      "Ansible automation for deployment",
      "Infrastructure provisioning and configuration",
    ],
    github: "https://github.com/maroayman/depi-project-2/",
    demo: null,
    status: "Completed",
    duration: "1.5 weeks",
    category: "DevOps & Automation",
  },
]

const statusColors = {
  Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Concept: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}

export function PersonalProjects() {
  return (
    <section id="personal-projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Featured Projects</h2>
            <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
              <Link href="/projects" className="flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="h-full border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <CardHeader className="pb-4">
                  <div className="mb-3">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2 mb-3">
                      <Code className="h-5 w-5 text-primary" />
                      {project.title}
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 hover:scale-110 transition-transform"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4 text-primary hover:text-primary/80" />
                        </Link>
                      )}
                    </CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`text-xs ${statusColors[project.status as keyof typeof statusColors]}`}>
                      {project.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs group-hover:border-primary/50 group-hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {project.duration}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs group-hover:border-primary/50 group-hover:text-primary transition-colors"
                    >
                      {project.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
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

                  <ul className="space-y-2 mb-6 flex-1">
                    {project.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-sm text-muted-foreground flex items-start gap-2 group-hover:text-foreground transition-colors"
                      >
                        <span className="text-primary mt-1.5 text-xs">●</span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {project.demo && (
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 group-hover:border-primary group-hover:text-primary transition-colors bg-transparent"
                        asChild
                      >
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
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
            <Button variant="outline" asChild>
              <Link href="/projects" className="flex items-center gap-2">
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
