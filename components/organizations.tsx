"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, MapPin, Users } from 'lucide-react'

const organizations = [
  {
    name: "Digital Egypt Pioneers Initiative",
    role: "Group Leader Volunteer",
    period: "Jun 2025 – Dec 2025",
    location: "Cairo, Egypt",
    type: "Volunteer Leadership",
    description: "Leading and mentoring a peer group in the Cloud and DevOps professional training program.",
    achievements: [
      "Guided and supported a peer group of 20 DEPI participants, fostering a collaborative learning environment",
      "Established and maintained a Google Drive repository, enhancing accessibility of external resources",
      "Coordinated online and in-person study sessions to reinforce core Cloud and DevOps concepts",
      "Mentored junior participants, helping them overcome project and technical challenges"
    ],
    skills: ["Leadership", "Mentoring", "Cloud Computing", "DevOps", "Team Coordination", "Resource Management"],
    category: "Professional Development"
  },
  {
    name: "Digital Egypt Pioneers Initiative",
    role: "Participant - Cloud and DevOps Track",
    period: "Jun 2025 – Dec 2025",
    location: "Cairo, Egypt",
    type: "Professional Training",
    description: "Intensive professional training program focused on cloud technologies and DevOps practices.",
    achievements: [
      "Completed comprehensive training in AWS, Git, Linux, Docker, Kubernetes, Ansible, and Terraform",
      "Developed hands-on experience with cloud-native systems and infrastructure automation",
      "Collaborated on real-world DevOps projects and case studies",
      "Built expertise in CI/CD pipelines and scalable system design"
    ],
    skills: ["AWS", "Git", "Linux", "Docker", "Kubernetes", "Ansible", "Terraform"],
    category: "Technical Training"
  },
  {
    name: "Helwan University",
    role: "Bachelor's Student - Information Systems",
    period: "Sep 2018 – Jan 2023",
    location: "Cairo, Egypt",
    type: "Higher Education",
    description: "Completed Bachelor's degree in Information Systems with focus on software development and data analysis.",
    achievements: [
      "Graduated with GPA: 3.0/4.0 demonstrating consistent academic performance",
      "Achieved A+ grade on graduation project (Electronics Shop E-commerce Website)",
      "Completed relevant coursework in Data Structures, Algorithms, Software Development, and Databases",
      "Developed strong foundation in programming, database management, and system analysis"
    ],
    skills: ["Software Development", "Database Management", "Data Analysis", "System Design", "Project Management"],
    category: "Academic Achievement"
  }
]

const typeColors = {
  "Volunteer Leadership": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  "Professional Training": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Higher Education": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
}

export function Organizations() {
  return (
    <section id="organizations" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-primary">Organizations</h2>

          <div className="space-y-8">
            {organizations.map((org, index) => (
              <Card
                key={index}
                className="border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center gap-2 mb-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        {org.name}
                      </CardTitle>
                      <p className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors mb-2">
                        {org.role}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {org.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {org.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={`text-xs ${typeColors[org.type as keyof typeof typeColors]}`}>
                        {org.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs group-hover:border-primary/50 group-hover:text-primary transition-colors">
                        {org.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors mb-4 leading-relaxed">
                    {org.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {org.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="text-sm text-muted-foreground flex items-start gap-2 group-hover:text-foreground transition-colors"
                        >
                          <span className="text-primary mt-1.5 text-xs">●</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Skills & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {org.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                        >
                          {skill}
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
