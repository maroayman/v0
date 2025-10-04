import { NavigationSidebar } from "@/components/navigation-sidebar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Skills } from "@/components/skills"
import { FeaturedProjects } from "@/components/featured-projects"
import { Education } from "@/components/education"
import { ProfessionalDevelopment } from "@/components/professional-development"
import { Volunteering } from "@/components/volunteering"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <NavigationSidebar />
      <Hero />
      <About />
      <Skills />
      <Education />
      <ProfessionalDevelopment />
      <Volunteering />
      <FeaturedProjects />
      <Contact />
      <Footer />
    </main>
  )
}
