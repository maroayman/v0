"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Clock, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

const personalProjects = [
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
      "Flask-based notes app with full CRUD operations (create, read, update, delete)",
      "Nginx reverse proxy configuration for production traffic handling",
      "MySQL database with SQLAlchemy ORM for robust data management",
      "Automated database migrations using Alembic (no manual table creation)",
      "Advanced features: pagination, search filtering, edit and delete support",
      "Modern UI with Tailwind CSS and AJAX for smooth user experience",
      "Multi-stage Docker builds for optimized container image size",
      "Code quality assurance with Flake8 linting for clean, consistent code",
      "Health monitoring with /health endpoint for system checks",
      "Prometheus metrics endpoint (/metrics) for production monitoring",
      "Deployed on AWS EC2 (Amazon Linux 2023, Free Tier) with production configuration",
    ],
    github: "https://github.com/maroayman/depi-project-3",
    demo: null,
    status: "Completed",
    duration: "2 weeks",
    category: "Full-Stack Production Deployment",
  },
  {
    title: "Python Note Web App",
    description: "A full-stack web application for note-taking deployed on AWS infrastructure",
    technologies: ["Python", "Flask", "SQLAlchemy", "MariaDB", "AWS EC2", "AWS EBS", "DevOps"],
    features: [
      "Deployed on AWS EC2 with scalable infrastructure",
      "Successfully implemented backup system using AWS EBS mounted volumes",
      "Python Flask backend with robust database connectivity",
      "MariaDB database integration through SQLAlchemy ORM",
      "Full CRUD operations for note management",
      "Cloud-based deployment with proper backup strategies",
    ],
    github: "https://github.com/maroayman/depi-project-1/",
    demo: null,
    status: "Completed",
    duration: "1 week",
    category: "Full-Stack Web Development",
  },
  {
    title: "Go Application Web Note App",
    description: "A Go-based web application for note management with automated deployment and scheduled tasks",
    technologies: ["Go", "SQLite", "Ansible", "Cron", "DevOps", "Automation"],
    features: [
      "Built with Go for high performance and concurrency",
      "SQLite database for lightweight data storage",
      "Utilized Cronie package for implementing cron jobs and scheduled tasks",
      "Ansible automation for deployment from controller to node",
      "Automated infrastructure provisioning and configuration management",
      "Efficient note management with scheduled maintenance tasks",
    ],
    github: "https://github.com/maroayman/depi-project-2/",
    demo: null,
    status: "Completed",
    duration: "1.5 weeks",
    category: "DevOps & Automation",
  },
]

const academicProjects = [
  {
    title: "Platformer Game",
    description:
      "A 2D platformer game built with Unity and C#, featuring collaborative development and asset integration.",
    technologies: ["Unity", "C#", "Game Development"],
    features: [
      "Built with Unity game engine and C# scripting",
      "Collaborated with one team to design and develop 2D platformer mechanics",
      "Worked with another team to source and integrate free licensed sounds and assets",
      "Enhanced gameplay experience through professional audio and visual assets",
      "Implemented game physics, player controls, and level design",
    ],
    github: "https://github.com/maroayman/unity-game",
    demo: null,
    status: "Completed",
    category: "Game Development",
  },
  {
    title: "Football Club Dashboard",
    description: "Interactive data visualization dashboard built with Microsoft Power BI for football analytics.",
    technologies: ["Power BI", "Data Analysis", "Visualization"],
    features: [
      "Built with Microsoft Power BI for comprehensive data visualization",
      "Collaborated with team to create interactive visualizations from Kaggle dataset",
      "Processed and analyzed CSV format football data",
      "Dashboard showcased team history including goals scored and conceded",
      "Implemented interactive filters and drill-down capabilities",
    ],
    github: null,
    demo: null,
    status: "Completed",
    category: "Data Analysis",
  },
  {
    title: "Linux Terminal Project",
    description: "A C-based terminal utility for creating and managing file links in Linux environments.",
    technologies: ["C", "Linux", "System Programming"],
    features: [
      "Built with C programming language for system-level operations",
      "Enables creation of both symbolic and hard links for files and directories",
      "Designed for Linux environment compatibility (tested on Ubuntu)",
      "Enhanced file organization and accessibility within terminal",
      "Implemented proper error handling and user feedback",
    ],
    github: "https://github.com/maroayman/Operating-System-FCIH-College-Task-",
    demo: null,
    status: "Completed",
    category: "System Programming",
  },
  {
    title: "File Encryption and Decryption",
    description: "A Python-based security application implementing encryption and decryption techniques.",
    technologies: ["Python", "Cryptography", "Security"],
    features: [
      "Built with Python for cross-platform compatibility",
      "Focuses on securing sensitive data through robust encryption",
      "Implemented encryption and decryption techniques using hashing algorithms",
      "Ensured data integrity and protection against unauthorized access",
      "User-friendly interface for file security operations",
    ],
    github: null,
    demo: null,
    status: "Completed",
    category: "Security",
  },
  {
    title: "Learning Management System",
    description: "A Java-based LMS with role-based access control for educational institutions.",
    technologies: ["Java", "OOP", "Database"],
    features: [
      "LMS System built with Java using object-oriented programming principles",
      "Enables teachers to log in and update student grades efficiently",
      "Grants students read-only access to their academic records",
      "Implemented role-based access control for security",
      "Educators can modify grades while ensuring data integrity and transparency",
    ],
    github: "https://github.com/maroayman/Learning-System",
    demo: null,
    status: "Completed",
    category: "Educational Software",
  },
  {
    title: "E-Commerce Website - Graduation Project",
    description: "A comprehensive e-commerce platform with innovative YouTube integration for product recommendations.",
    technologies: ["Angular", "ASP.NET", "Bootstrap", "SQL Server", "JavaScript", "HTML", "CSS"],
    features: [
      "Built with Angular frontend and ASP.NET backend architecture",
      "Comprehensive e-commerce platform with full shopping functionality",
      "Innovative suggestion system recommending related YouTube videos for each product",
      "Integrated Bootstrap for responsive and modern UI design",
      "SQL Server database for robust data management",
      "Contributed to database linking and integration components",
    ],
    github: null,
    demo: null,
    status: "Completed",
    category: "E-Commerce",
  },
]

const statusColors = {
  Completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Planned: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Concept: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
            <p className="text-xl opacity-90">
              A comprehensive collection of my personal and academic projects showcasing full-stack development, DevOps
              practices, and technical expertise.
            </p>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Personal Projects Section */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-12 text-primary">Personal Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {personalProjects.map((project, index) => (
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
                        {project.duration && (
                          <Badge
                            variant="outline"
                            className="text-xs group-hover:border-primary/50 group-hover:text-primary transition-colors flex items-center gap-1"
                          >
                            <Clock className="h-3 w-3" />
                            {project.duration}
                          </Badge>
                        )}
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
            </section>

            {/* Academic Projects Section */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-12 text-primary">Academic Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {academicProjects.map((project, index) => (
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
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
