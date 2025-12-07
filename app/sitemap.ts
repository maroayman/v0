import { MetadataRoute } from "next"
import { currentConfig } from "@/config/portfolio"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://maroayman.vercel.app" // Update to your actual domain

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  // Only include articles in sitemap if blog section is enabled
  if (currentConfig.showBlogSection) {
    routes.push({
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  return routes
}
