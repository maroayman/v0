// Portfolio Configuration
export const config = {
  // Development/Debug Settings
  showDebugControls: false, // Set to true to show API buttons and debug info
  
  // Auto-refresh Settings  
  refreshIntervalMinutes: 10, // How often to auto-refresh articles
  maxArticlesPerPage: 50, // Maximum articles to fetch per request
  
  // Hashnode Settings
  hashnodeUsername: 'maroayman',
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
  },
  
  production: {
    ...config,
    showDebugControls: false,
    showRefreshTimer: false,
    showAutoRefreshToggle: false,
  }
}

// Current environment - change this to switch modes
export const currentConfig = environments.production // 🔒 PRODUCTION
// export const currentConfig = environments.development // 🔧 DEVELOPMENT
