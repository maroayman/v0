import { Certifications } from "@/components/certifications"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { Footer } from "@/components/footer"
import { NavCommandMenu } from "@/components/nav-command-menu"

export default function CertificationsPage() {
    return (
        <main className="min-h-screen bg-background">
            <NavigationSidebar />
            <NavCommandMenu />
            <Certifications />
            <Footer />
        </main>
    )
}
