import Link from "next/link"
import { NavigationSidebar } from "@/components/navigation-sidebar"

/**
 * Work Experience Data Structure
 * 
 * Each entry represents a company with potentially multiple roles (for promotions).
 * 
 * Structure:
 * {
 *   id: number,                    // Unique ID for React key
 *   company: string,               // Company name
 *   url: string,                   // Company website URL
 *   location: string,              // Job location
 *   totalPeriod: string,           // Total time at company (e.g., "Jan 2023 – Present")
 *   roles: [                       // Array of roles at this company (newest first)
 *     {
 *       position: string,          // Job title
 *       period: string,            // Duration in this role
 *       description: string,       // Brief description of the role
 *       technologies: string[],    // Tech stack used
 *       responsibilities: string[] | null,  // Bullet points (null if none)
 *     }
 *   ]
 * }
 * 
 * For multiple roles at the same company (promotions), add them to the roles array.
 * The UI will automatically show the timeline dots connecting them.
 */

const workExperience = [
  // ============================================================
  // TEMPLATE: Uncomment and modify when you get a job with promotion
  // ============================================================
  // {
  //   id: 1,
  //   company: "Example Tech Company",
  //   url: "https://example.com",
  //   location: "Cairo, Egypt",
  //   totalPeriod: "Jan 2023 – Present",  // Total time at company
  //   roles: [
  //     // Most recent role first
  //     {
  //       position: "Senior DevOps Engineer",
  //       period: "Mar 2024 – Present",
  //       description: "Promoted to lead infrastructure initiatives and mentor junior team members.",
  //       technologies: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "GitHub Actions", "Prometheus"],
  //       responsibilities: [
  //         "Lead the design and implementation of cloud-native architecture for microservices",
  //         "Mentor and guide junior engineers on DevOps best practices and tooling",
  //         "Architect CI/CD pipelines reducing deployment time by 60%",
  //         "Implement observability stack with Prometheus, Grafana, and alerting systems",
  //       ],
  //     },
  //     // Earlier role at same company
  //     {
  //       position: "Junior DevOps Engineer",
  //       period: "Jan 2023 – Feb 2024",
  //       description: "Started as a junior engineer, focusing on automation and infrastructure management.",
  //       technologies: ["Docker", "Linux", "Jenkins", "Ansible", "AWS", "Python"],
  //       responsibilities: [
  //         "Automated deployment workflows using Jenkins and Ansible",
  //         "Managed and maintained Linux servers across multiple environments",
  //         "Containerized legacy applications using Docker",
  //         "Collaborated with development teams to improve CI/CD processes",
  //       ],
  //     },
  //   ],
  // },
  // ============================================================

  {
    id: 2,
    company: "Digital Egypt Pioneers Initiative",
    url: "https://depi.gov.eg",
    location: "Cairo, Egypt",
    totalPeriod: "Jun 2025 – Dec 2025",
    roles: [
      {
        position: "DevOps Trainee",
        period: "Jun 2025 – Dec 2025",
        description: "Undergoing structured training in DevOps, cloud computing, and Linux administration.",
        technologies: ["Linux", "Kubernetes", "Terraform", "Ansible", "Docker", "Jenkins"],
        responsibilities: null,
      },
    ],
  },
  {
    id: 3,
    company: "Ghaymah Cloud Solutions",
    url: "https://ghaymah.systems",
    location: "Remote, Saudi Arabia",
    totalPeriod: "Sep 2025 – Oct 2025",
    roles: [
      {
        position: "DevOps Intern",
        period: "Sep 2025 – Oct 2025",
        description: "Working on cloud automation, CI/CD pipelines, and infrastructure provisioning.",
        technologies: ["Docker", "CI/CD", "Cloud Automation", "API", "Cloud Deployment"],
        responsibilities: null,
      },
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar />

      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">Experience</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            My professional journey in DevOps and cloud engineering.
          </p>

          <div className="space-y-10">
            {workExperience.map((job) => (
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
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
