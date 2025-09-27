# Portfolio Security & Configuration Guide

## 🔒 Current Status: PRODUCTION MODE
- ❌ Fetch API button: HIDDEN
- ❌ Sync DB button: HIDDEN  
- ❌ API Response tab: HIDDEN
- ❌ Auto-refresh toggle: HIDDEN
- ❌ Next refresh timer: HIDDEN
- ✅ Auto-refresh: WORKING (every 10 minutes)
- ✅ Articles & Series: AUTO-UPDATING

## 🔧 To Enable Development Mode

### Option 1: Quick Toggle (config/portfolio.ts)
\`\`\`typescript
// Change this line in config/portfolio.ts:
export const currentConfig = environments.development // 🔧 DEVELOPMENT

// This will show:
// - Fetch API button
// - Sync DB button  
// - API Response tab
// - Auto-refresh toggle
// - Next refresh timer
\`\`\`

### Option 2: Custom Settings (config/portfolio.ts)
\`\`\`typescript
export const currentConfig = {
  showDebugControls: true,     // Show API buttons
  refreshIntervalMinutes: 5,   // Refresh every 5 minutes
  maxArticlesPerPage: 50,      // Fetch up to 50 articles
  hashnodeUsername: 'maroayman',
  includeSeriesData: true,
  showRefreshTimer: true,      // Show countdown timer
  showAutoRefreshToggle: true, // Show on/off toggle
}
\`\`\`

## 📚 Auto-Update Features

### ✅ What Updates Automatically:
- **New Articles**: Appear within 10 minutes
- **Updated Articles**: Changes sync automatically
- **New Series**: Auto-detected and displayed
- **Series Changes**: Names, descriptions, article counts
- **Tags**: New and updated tags sync
- **Cover Images**: Article thumbnails update

### 🔄 Refresh Triggers:
- **Time-based**: Every 10 minutes automatically
- **Visibility**: When you return to the tab
- **Manual**: Sync DB button (development mode only)

## 🚀 Production Deployment

For live deployment, ensure:
1. `currentConfig = environments.production`
2. No debug buttons or tabs visible
3. Professional, clean interface
4. Auto-refresh working in background

## 🛠️ Troubleshooting

If articles don't appear:
1. Check Hashnode username in config
2. Verify internet connection
3. Enable development mode to see API responses
4. Check browser console for errors

Your portfolio is now secure and production-ready! 🌟
