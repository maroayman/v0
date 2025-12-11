import { Certifications } from "@/components/certifications"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { Footer } from "@/components/footer"

export default function CertificationsPage() {
    return (
        <main className="min-h-screen bg-background">
            <NavigationSidebar />
            <Certifications />
            <Footer />
        </main>
    )
}
