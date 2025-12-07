// Portfolio Configuration
export const config = {
  // Development/Debug Settings
  showDebugControls: false, // Set to true to show API buttons and debug info

  // Feature Toggles
  showBlogSection: false, // Set to true to show the blog/articles section

  // Auto-refresh Settings
  refreshIntervalMinutes: 10, // How often to auto-refresh articles
  maxArticlesPerPage: 50, // Maximum articles to fetch per request

  // Hashnode Settings
  hashnodeUsername: "maroayman",
  includeSeriesData: true,

  // UI Settings
  showRefreshTimer: false, // Show next refresh countdown (debug only)
  showAutoRefreshToggle: false, // Show auto-refresh on/off toggle (debug only)
}

// Quick toggles for different environments
export const environments = {
  development: {
    ...config,
    showDebugControls: true,
    showRefreshTimer: true,
    showAutoRefreshToggle: true,
    showBlogSection: false, // Set to true to enable blog
  },

  production: {
    ...config,
    showDebugControls: false,
    showRefreshTimer: false,
    showAutoRefreshToggle: false,
    showBlogSection: false, // Set to true to enable blog
  },
}

// Current environment - change this to switch modes
export const currentConfig = environments.production // 🔒 PRODUCTION
// export const currentConfig = environments.development // 🔧 DEVELOPMENT

// Utility function to format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Utility function to format read time
export function formatReadTime(minutes: number): string {
  return `${minutes} min read`
}
