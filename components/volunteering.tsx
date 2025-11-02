import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Users, Target } from "lucide-react"

export function Volunteering() {
  return (
    <section id="volunteering" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Volunteering & Leadership</h2>

          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Digital Egypt Pioneers Initiative
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" />
                    June 2025 – Present • Cairo, Egypt
                  </CardDescription>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      Group Leader Volunteer
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Leading and mentoring a peer group in the Cloud and DevOps professional training program, fostering
                collaborative learning and supporting participants in their technical journey.
              </p>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Key Achievements
                </h4>
                <ul className="text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Guided and supported a peer group of 20 DEPI participants, fostering a collaborative learning
                    environment
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Established and maintained a Google Drive repository, enhancing accessibility of external resources
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Coordinated online and in-person study sessions to reinforce core Cloud and DevOps concepts
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                    Mentored junior participants, helping them overcome project and technical challenges
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Leadership</Badge>
                  <Badge variant="secondary">Mentoring</Badge>
                  <Badge variant="secondary">Cloud Computing</Badge>
                  <Badge variant="secondary">DevOps</Badge>
                  <Badge variant="secondary">Team Coordination</Badge>
                  <Badge variant="secondary">Resource Management</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-16 border-t pt-12">
            <h3 className="text-2xl font-bold mb-8">Why Hire Me</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>Remote-ready in GMT+2, with proven experience in async workflows and global collaboration</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>Bilingual communicator fluent in English and Arabic, with cross-cultural leadership via DEPI</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>Cloud-native builder of full-stack apps using Node.js, MongoDB, Docker Compose, and NGINX</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>Infrastructure optimizer with hands-on deployments across AWS, Azure, GCP, and Huawei Cloud</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>
                  DevOps specialist automating workflows, backups, and IAM policies using Terraform, Ansible, and Bash
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>
                  Monitoring-first mindset, integrating Prometheus and Grafana for alerting and performance insights
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>
                  Continuous learner, actively earning certifications and refining technical branding for global roles
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30">
                <p>
                  Portfolio-driven engineer, showcasing real deployments, CI/CD pipelines, and scalable architectures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
