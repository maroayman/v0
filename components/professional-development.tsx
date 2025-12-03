import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, CheckCircle, ExternalLink } from "lucide-react"

export function ProfessionalDevelopment() {
  const workExperience = [
    {
      id: 1,
      company: "Digital Egypt Pioneers Initiative",
      position: "DevOps Trainee",
      startDate: "Jun 2025",
      endDate: "Dec 2025",
      location: "Cairo, Egypt",
      description: "Undergoing structured training in DevOps, cloud computing, and Linux administration.",
      highlights: [
        "Undergoing structured training in DevOps, cloud computing, and Linux administration",
        "Developing practical projects focusing on automation and cloud-native architectures",
        "Collaborating with peers on infrastructure challenges and solutions",
      ],
      technologies: ["Linux", "Kubernetes", "Terraform", "Ansible", "Docker", "Jenkins"],
      url: "https://depi.gov.eg",
    },
    {
      id: 2,
      company: "Ghaymah Cloud Solutions",
      position: "DevOps Intern",
      startDate: "September 2025",
      endDate: "October 2025",
      location: "Remote, Saudi Arabia",
      description: "Working on cloud automation, CI/CD pipelines, and infrastructure provisioning.",
      highlights: [
        "Working on cloud automation, CI/CD pipelines, and infrastructure provisioning",
        "Gaining hands-on experience with Ghaymah Cloud Solutions, Docker, and APIs",
        "Assisting in containerized application deployments and monitoring setup",
      ],
      technologies: ["Docker", "CI/CD", "Cloud Automation", "API", "Cloud Deployment"],
      url: "https://ghaymah.systems",
    },
  ]

  return (
    <section id="work-experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Work Experience</h2>

          <div className="space-y-6">
            {workExperience.map((job) => (
              <Card key={job.id} className="border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          {job.position}
                        </CardTitle>
                      </div>
                      <div className="text-muted-foreground mt-2">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
                        >
                          {job.company}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Calendar className="h-4 w-4" />
                        {job.startDate} - {job.endDate} • {job.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{job.description}</p>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Key Responsibilities
                    </h4>
                    <ul className="text-muted-foreground space-y-2">
                      {job.highlights.map((highlight, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
