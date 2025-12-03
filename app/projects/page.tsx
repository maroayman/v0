"use client"

import Link from "next/link"
import { Github, ExternalLink, ArrowLeft, Clock } from "lucide-react"

const personalProjects = [
  {
    title: "3-Tier GitOps App on EKS",
    description:
      "A complete 3-tier notes application with GitOps CI/CD pipeline using GitHub Actions, Terraform, Ansible, Helm, and ArgoCD on AWS EKS",
    technologies: ["AWS EKS", "Terraform", "ArgoCD", "Helm", "Ansible", "GitHub Actions", "Docker", "Flask", "MySQL"],
    features: [
      "Complete GitOps workflow with 4 separate pipelines",
      "Infrastructure as Code with Terraform for EKS cluster provisioning",
      "ArgoCD for continuous deployment and GitOps monitoring",
      "3-tier architecture: Nginx reverse proxy, Flask API, MySQL database",
      "Prometheus metrics and health check endpoints",
    ],
    github: "https://github.com/maroayman/depi-notes-app-gitops",
    demo: null,
    duration: "3 weeks",
  },
  {
    title: "Highly Available AWS Infrastructure",
    description:
      "A highly available, scalable web application infrastructure on AWS with ALB, Auto Scaling Group, and secure multi-AZ network architecture",
    technologies: ["Terraform", "AWS", "ALB", "Auto Scaling", "VPC", "NAT Gateway", "S3"],
    features: [
      "Multi-AZ deployment across us-east-1a and us-east-1b",
      "Application Load Balancer with health checks",
      "Auto Scaling Group (1-3 instances) based on demand",
      "Secure bastion host for SSH access to private instances",
      "NAT Gateway for private subnet internet access",
    ],
    github: "https://github.com/maroayman/depi-project-5",
    demo: null,
    duration: "2 weeks",
  },
  {
    title: "Terraform EC2 Monitoring Stack",
    description:
      "A production-ready Terraform project that automates the deployment of secure EC2 instances on AWS with real-time monitoring",
    technologies: ["Terraform", "AWS EC2", "VPC", "Security Groups"],
    features: [
      "Automated EC2 instance provisioning with Terraform",
      "SSH key generation and secure access configuration",
      "Real-time monitoring dashboard for instance performance",
      "5-minute quick deployment with terraform apply",
    ],
    github: "https://github.com/maroayman/depi-project-4",
    demo: null,
    duration: "1 week",
  },
  {
    title: "Dockerized Flask Production Stack",
    description:
      "A complete end-to-end web application deployed on AWS EC2 with production-ready features and monitoring",
    technologies: ["Flask", "MySQL", "Docker", "AWS EC2", "Nginx", "Prometheus"],
    features: [
      "Flask-based notes app with full CRUD operations",
      "Nginx reverse proxy for production traffic",
      "MySQL database with SQLAlchemy ORM",
      "Multi-stage Docker builds for optimization",
      "Prometheus metrics endpoint for monitoring",
    ],
    github: "https://github.com/maroayman/depi-project-3",
    demo: null,
    duration: "2 weeks",
  },
  {
    title: "Ansible-Managed Go Web App",
    description: "A Go-based web application for note management with Ansible automation and scheduled tasks",
    technologies: ["Go", "SQLite", "Ansible", "Cron"],
    features: [
      "Built with Go for high performance",
      "SQLite database for lightweight storage",
      "Cron jobs for scheduled tasks",
      "Ansible automation for deployment",
    ],
    github: "https://github.com/maroayman/depi-project-2/",
    demo: null,
    duration: "1.5 weeks",
  },
  {
    title: "Flask App with Persistent AWS Storage",
    description: "A full-stack web application for note-taking deployed on AWS infrastructure with EBS backup",
    technologies: ["Python", "Flask", "MariaDB", "AWS EC2", "AWS EBS"],
    features: [
      "Deployed on AWS EC2 with scalable infrastructure",
      "Backup system using AWS EBS mounted volumes",
      "MariaDB database integration through SQLAlchemy ORM",
      "Full CRUD operations for note management",
    ],
    github: "https://github.com/maroayman/depi-project-1/",
    demo: null,
    duration: "1 week",
  },
]

const academicProjects = [
  {
    title: "2D Platformer Game",
    description: "A 2D platformer game built with Unity and C#, featuring collaborative development and asset integration",
    technologies: ["Unity", "C#"],
    features: [
      "Built with Unity game engine and C# scripting",
      "Collaborative team development",
      "Integrated free licensed sounds and assets",
      "Game physics, player controls, and level design",
    ],
    github: "https://github.com/maroayman/unity-game",
    demo: null,
  },
  {
    title: "Football Analytics Dashboard",
    description: "Interactive data visualization dashboard built with Microsoft Power BI for football analytics",
    technologies: ["Power BI", "Data Analysis"],
    features: [
      "Comprehensive data visualization from Kaggle dataset",
      "Team history including goals scored and conceded",
      "Interactive filters and drill-down capabilities",
    ],
    github: null,
    demo: null,
  },
  {
    title: "Linux File Link Utility",
    description: "A C-based terminal utility for creating and managing file links in Linux environments",
    technologies: ["C", "Linux"],
    features: [
      "Creation of symbolic and hard links",
      "Linux environment compatibility (Ubuntu)",
      "Proper error handling and user feedback",
    ],
    github: "https://github.com/maroayman/Operating-System-FCIH-College-Task-",
    demo: null,
  },
  {
    title: "File Encryption Tool",
    description: "A Python-based security application implementing encryption and decryption techniques",
    technologies: ["Python", "Cryptography"],
    features: [
      "Robust encryption using hashing algorithms",
      "Data integrity and protection",
      "User-friendly interface for file security",
    ],
    github: null,
    demo: null,
  },
  {
    title: "Learning Management System",
    description: "A Java-based LMS with role-based access control for educational institutions",
    technologies: ["Java", "OOP"],
    features: [
      "Teachers can log in and update student grades",
      "Students have read-only access to records",
      "Role-based access control for security",
    ],
    github: "https://github.com/maroayman/Learning-System",
    demo: null,
  },
  {
    title: "E-Commerce Platform",
    description: "Graduation project - A comprehensive e-commerce platform with YouTube integration for product recommendations",
    technologies: ["Angular", "ASP.NET", "SQL Server", "Bootstrap"],
    features: [
      "Full shopping functionality",
      "YouTube video recommendations for products",
      "Responsive UI with Bootstrap",
      "SQL Server database management",
    ],
    github: null,
    demo: null,
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <span className="font-semibold">Projects</span>
            <div className="w-14"></div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
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
                  
                  <ul className="space-y-1.5 text-sm text-muted-foreground pl-4">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="relative before:content-['•'] before:absolute before:-left-3 before:text-muted-foreground/50">
                        {feature}
                      </li>
                    ))}
                  </ul>
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
                  
                  <ul className="space-y-1.5 text-sm text-muted-foreground pl-4">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="relative before:content-['•'] before:absolute before:-left-3 before:text-muted-foreground/50">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
