import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  display: "swap", // Prevents FOIT (Flash of Invisible Text)
  preload: true,
  variable: "--font-jetbrains",
})

const siteUrl = "https://maroayman.vercel.app" // Update this to your actual domain

export const metadata: Metadata = {
  title: {
    default: "Marwan Ayman - DevOps & Cloud Engineer",
    template: "%s | Marwan Ayman",
  },
  description:
    "Portfolio of Marwan Ayman, a DevOps & Cloud Engineer passionate about building scalable infrastructure, automating deployments, and optimizing system performance. Expert in Kubernetes, Docker, Terraform, AWS, and CI/CD pipelines.",
  keywords: [
    "DevOps Engineer",
    "Cloud Engineer",
    "Marwan Ayman",
    "Kubernetes",
    "Docker",
    "Terraform",
    "AWS",
    "GCP",
    "CI/CD",
    "Infrastructure as Code",
    "Automation",
    "Linux",
    "Jenkins",
    "Ansible",
    "Portfolio",
  ],
  authors: [{ name: "Marwan Ayman Shawky", url: siteUrl }],
  creator: "Marwan Ayman Shawky",
  publisher: "Marwan Ayman Shawky",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Marwan Ayman - DevOps & Cloud Engineer",
    title: "Marwan Ayman - DevOps & Cloud Engineer",
    description:
      "DevOps & Cloud Engineer passionate about building scalable infrastructure, automating deployments, and optimizing system performance.",
    images: [
      {
        url: "/og-image.png", // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Marwan Ayman - DevOps & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marwan Ayman - DevOps & Cloud Engineer",
    description:
      "DevOps & Cloud Engineer passionate about building scalable infrastructure and automating deployments.",
    images: ["/og-image.png"],
    // creator: "@yourtwitter", // Add your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add if you have Google Search Console
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Marwan Ayman - DevOps & Cloud Engineer",
        description: "Portfolio of Marwan Ayman, a DevOps & Cloud Engineer passionate about building scalable infrastructure and automating deployments.",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Marwan Ayman Shawky",
        url: siteUrl,
        jobTitle: "DevOps & Cloud Engineer",
        email: "marwanayman.shawky@gmail.com",
        sameAs: [
          "https://github.com/maroayman",
          "https://gitlab.com/maroayman",
          "https://linkedin.com/in/maroayman",
          "https://hashnode.com/@maroayman",
        ],
        knowsAbout: [
          "DevOps",
          "Cloud Engineering",
          "Kubernetes",
          "Docker",
          "Terraform",
          "AWS",
          "CI/CD",
          "Infrastructure as Code",
        ],
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://linkedin.com" />
        <link rel="preconnect" href="https://hashnode.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link rel="dns-prefetch" href="https://cdn.hashnode.com" />
      </head>
      <body className={jetbrainsMono.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
