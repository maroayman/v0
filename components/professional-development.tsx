import Link from "next/link"
import { ArrowRight } from "lucide-react"

const workExperience = [
  {
    id: 1,
    position: "DevOps Trainee",
    company: "Digital Egypt Pioneers Initiative",
    url: "https://depi.gov.eg",
    period: "Jun 2025 – Dec 2025",
    location: "Cairo, Egypt",
    description: "Undergoing structured training in DevOps, cloud computing, and Linux administration.",
    technologies: ["Linux", "Kubernetes", "Terraform", "Ansible", "Docker", "Jenkins"],
  },
  {
    id: 2,
    position: "DevOps Intern",
    company: "Ghaymah Cloud Solutions",
    url: "https://ghaymah.systems",
    period: "Sep 2025 – Oct 2025",
    location: "Remote, Saudi Arabia",
    description: "Working on cloud automation, CI/CD pipelines, and infrastructure provisioning.",
    technologies: ["Docker", "CI/CD", "Cloud Automation", "API", "Cloud Deployment"],
  },
]

export function ProfessionalDevelopment() {
  return (
    <section id="experience" className="py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <Link
            href="/experience"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-8">
          {workExperience.map((job) => (
            <div key={job.id}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-semibold">{job.position}</h3>
                <span className="text-sm text-muted-foreground">{job.period}</span>
              </div>
              <p className="text-muted-foreground mb-2">
                <Link href={job.url} target="_blank" className="hover:underline">
                  {job.company}
                </Link>
                {" · "}{job.location}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {job.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {job.technologies.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
