"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  Code,
  Filter,
  Eye,
  EyeOff,
  Heart,
} from "lucide-react"
import { NavigationSidebar } from "@/components/navigation-sidebar"

interface WorkExperience {
  id: number
  company: string
  position: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string
  tech_stack: string[]
  industry: string
  company_url: string
  achievements: string[]
}

interface Education {
  id: number
  institution: string
  degree: string
  field_of_study: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  gpa: number | null
  description: string
  achievements: string[]
  relevant_coursework: string[]
}

interface Skill {
  id: number
  name: string
  category: string
  proficiency_level: number
  years_experience: number
  description: string
  is_featured: boolean
}

interface Certification {
  id: number
  name: string
  issuing_organization: string
  issue_date: string
  expiration_date: string | null
  credential_id: string
  credential_url: string
  description: string
  is_active: boolean
}

interface Volunteering {
  id: number
  organization: string
  position: string
  location: string
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string
  achievements: string[]
  skills_used: string[]
}

export default function ResumePage() {
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [volunteering, setVolunteering] = useState<Volunteering[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"full" | "condensed">("full")
  const [techFilter, setTechFilter] = useState<string>("all")
  const [industryFilter, setIndustryFilter] = useState<string>("all")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const [workRes, eduRes, skillsRes, certsRes, volunteeringRes] = await Promise.all([
          fetch("/api/resume/work-experience"),
          fetch("/api/resume/education"),
          fetch("/api/resume/skills"),
          fetch("/api/resume/certifications"),
          fetch("/api/resume/volunteering"),
        ])

        const [workData, eduData, skillsData, certsData, volunteeringData] = await Promise.all([
          workRes.ok ? workRes.json() : [],
          eduRes.ok ? eduRes.json() : [],
          skillsRes.ok ? skillsRes.json() : [],
          certsRes.ok ? certsRes.json() : [],
          volunteeringRes.ok ? volunteeringRes.json() : [],
        ])

        setWorkExperience(Array.isArray(workData) ? workData : [])
        setEducation(Array.isArray(eduData) ? eduData : [])
        setSkills(Array.isArray(skillsData) ? skillsData : [])
        setCertifications(Array.isArray(certsData) ? certsData : [])
        setVolunteering(Array.isArray(volunteeringData) ? volunteeringData : [])
      } catch (error) {
        console.error("Failed to fetch resume data:", error)
        setWorkExperience([])
        setEducation([])
        setSkills([])
        setCertifications([])
        setVolunteering([])
      } finally {
        setLoading(false)
      }
    }

    fetchResumeData()
  }, [])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const getProficiencyColor = (level: number) => {
    switch (level) {
      case 5:
        return "bg-green-500"
      case 4:
        return "bg-blue-500"
      case 3:
        return "bg-yellow-500"
      case 2:
        return "bg-orange-500"
      case 1:
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProficiencyText = (level: number) => {
    switch (level) {
      case 5:
        return "Expert"
      case 4:
        return "Advanced"
      case 3:
        return "Intermediate"
      case 2:
        return "Beginner"
      case 1:
        return "Novice"
      default:
        return "Unknown"
    }
  }

  // Filter work experience based on selected filters
  const filteredWorkExperience = workExperience.filter((job) => {
    const techMatch =
      techFilter === "all" || job.tech_stack.some((tech) => tech.toLowerCase().includes(techFilter.toLowerCase()))
    const industryMatch = industryFilter === "all" || job.industry === industryFilter
    return techMatch && industryMatch
  })

  // Get unique tech stacks and industries for filters
  const allTechStacks = [...new Set(workExperience.flatMap((job) => job.tech_stack))]
  const allIndustries = [...new Set(workExperience.map((job) => job.industry))]

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center font-mono">
          <div className="text-primary text-lg mb-2">Loading résumé...</div>
          <div className="text-muted-foreground">Fetching data from database</div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <NavigationSidebar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-primary text-sm font-mono mb-4">
            <pre>{`
┌─────────────────────────────────────────────────────────────┐
│ INTERACTIVE RÉSUMÉ                                          │
│ marwan@portfolio:~/resume$ cat professional_profile.json   │
└─────────────────────────────────────────────────────────────┘
            `}</pre>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Marwan Ayman</h1>
              <p className="text-xl text-muted-foreground">DevOps Engineer & Software Developer</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href="/resume.pdf" download className="inline-block">
                <Button variant="default" size="sm" className="font-mono text-xs">
                  Download Resume
                </Button>
              </a>
              <Button
                variant="default"
                size="sm"
                className="font-mono text-xs"
                onClick={() => {
                  const element = document.querySelector('[role="tablist"]')
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View Full Profile
              </Button>
              <Button
                variant={viewMode === "full" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("full")}
                className="font-mono text-xs"
              >
                <Eye className="h-3 w-3 mr-1" />
                Full View
              </Button>
              <Button
                variant={viewMode === "condensed" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("condensed")}
                className="font-mono text-xs"
              >
                <EyeOff className="h-3 w-3 mr-1" />
                Condensed
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={techFilter} onValueChange={setTechFilter}>
                <SelectTrigger className="w-48 font-mono text-xs">
                  <SelectValue placeholder="Filter by tech" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Technologies</SelectItem>
                  {allTechStacks.map((tech) => (
                    <SelectItem key={tech} value={tech}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-48 font-mono text-xs">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {allIndustries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="experience" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 font-mono">
            <TabsTrigger value="experience" className="text-xs">
              <Briefcase className="h-3 w-3 mr-1" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="text-xs">
              <GraduationCap className="h-3 w-3 mr-1" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              <Code className="h-3 w-3 mr-1" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="certifications" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="volunteering" className="text-xs">
              <Heart className="h-3 w-3 mr-1" />
              Volunteering
            </TabsTrigger>
          </TabsList>

          {/* Work Experience */}
          <TabsContent value="experience" className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono mb-4">
              $ ls -la work_experience/ | grep -E "({filteredWorkExperience.length} items found)"
            </div>

            {filteredWorkExperience.map((job) => (
              <Card key={job.id} className="border-primary/20">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{job.position}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <span className="font-semibold">{job.company}</span>
                        {job.company_url && (
                          <a
                            href={job.company_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(job.start_date)} - {job.is_current ? "Present" : formatDate(job.end_date!)}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {job.industry}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {viewMode === "full" && <p className="text-sm text-muted-foreground">{job.description}</p>}

                    <div className="flex flex-wrap gap-1">
                      {job.tech_stack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {viewMode === "full" && job.achievements.length > 0 && (
                      <Collapsible>
                        <CollapsibleTrigger
                          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          onClick={() => toggleExpanded(`work-${job.id}`)}
                        >
                          Key Achievements
                          {expandedItems.has(`work-${job.id}`) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {job.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Education */}
          <TabsContent value="education" className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono mb-4">
              $ cat education.json | jq '.[] | select(.degree)'
            </div>

            {education.map((edu) => (
              <Card key={edu.id} className="border-primary/20">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{edu.degree}</CardTitle>
                      <div className="text-muted-foreground mt-1">
                        <span className="font-semibold">{edu.institution}</span>
                        {edu.field_of_study && <span> • {edu.field_of_study}</span>}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(edu.start_date)} - {edu.is_current ? "Present" : formatDate(edu.end_date!)}
                        </div>
                        {edu.gpa && (
                          <Badge variant="secondary" className="text-xs">
                            GPA: {edu.gpa}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {viewMode === "full" && edu.description && (
                      <p className="text-sm text-muted-foreground">{edu.description}</p>
                    )}

                    {viewMode === "full" && edu.achievements.length > 0 && (
                      <Collapsible>
                        <CollapsibleTrigger
                          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          onClick={() => toggleExpanded(`edu-${edu.id}`)}
                        >
                          Achievements
                          {expandedItems.has(`edu-${edu.id}`) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {edu.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {viewMode === "full" && edu.relevant_coursework.length > 0 && (
                      <Collapsible>
                        <CollapsibleTrigger
                          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          onClick={() => toggleExpanded(`coursework-${edu.id}`)}
                        >
                          Relevant Coursework
                          {expandedItems.has(`coursework-${edu.id}`) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {edu.relevant_coursework.map((course) => (
                              <Badge key={course} variant="outline" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills" className="space-y-6">
            <div className="text-sm text-muted-foreground font-mono mb-4">
              $ grep -r "proficiency_level" skills.db | sort -k2 -nr
            </div>

            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <Card key={category} className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills
                      .sort((a, b) => b.proficiency_level - a.proficiency_level)
                      .map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{skill.name}</span>
                              {skill.is_featured && (
                                <Badge variant="secondary" className="text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${getProficiencyColor(skill.proficiency_level)}`}
                                style={{ width: `${(skill.proficiency_level / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground min-w-[4rem]">
                              {getProficiencyText(skill.proficiency_level)}
                            </span>
                          </div>

                          {viewMode === "full" && skill.description && (
                            <p className="text-xs text-muted-foreground">{skill.description}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Certifications */}
          <TabsContent value="certifications" className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono mb-4">
              $ find certifications/ -name "*.cert" -exec grep -l "active" {} \;
            </div>

            {certifications
              .filter((cert) => cert.is_active)
              .sort((a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime())
              .map((cert) => (
                <Card key={cert.id} className="border-primary/20">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <div className="text-muted-foreground mt-1">
                          <span className="font-semibold">{cert.issuing_organization}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Issued: {formatDate(cert.issue_date)}
                          </div>
                          {cert.expiration_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Expires: {formatDate(cert.expiration_date)}
                            </div>
                          )}
                          {cert.credential_url && (
                            <a
                              href={cert.credential_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:text-primary/80"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Verify
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {viewMode === "full" && cert.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                      {cert.credential_id && (
                        <div className="mt-2 text-xs text-muted-foreground font-mono">
                          Credential ID: {cert.credential_id}
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="volunteering" className="space-y-4">
            <div className="text-sm text-muted-foreground font-mono mb-4">
              $ find volunteering/ -name "*.volunteer" -exec grep -l "current" {} \;
            </div>

            {volunteering.map((volunteer) => (
              <Card key={volunteer.id} className="border-primary/20">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{volunteer.position}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <span className="font-semibold">{volunteer.organization}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {volunteer.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(volunteer.start_date)} -{" "}
                          {volunteer.is_current ? "Present" : formatDate(volunteer.end_date!)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {viewMode === "full" && <p className="text-sm text-muted-foreground">{volunteer.description}</p>}

                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills_used.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {viewMode === "full" && volunteer.achievements.length > 0 && (
                      <Collapsible>
                        <CollapsibleTrigger
                          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                          onClick={() => toggleExpanded(`volunteer-${volunteer.id}`)}
                        >
                          Key Contributions
                          {expandedItems.has(`volunteer-${volunteer.id}`) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {volunteer.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
