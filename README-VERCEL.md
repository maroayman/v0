# Marwan's Portfolio - Vercel Deployment Guide

A modern, responsive portfolio website built with Next.js 15, featuring live Hashnode blog integration, advanced filtering, and a professional design.

## 🌟 Features

### 🎨 Modern Design
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes
- **Terminal-Inspired UI**: Clean, developer-focused interface
- **Smooth Animations**: Engaging micro-interactions

### 📚 Live Content Integration
- **Auto-Updating Articles**: Fetches latest posts from Hashnode blog
- **Smart Filtering**: Multi-select tag filtering with search
- **Series Support**: Automatic detection of article series
- **Real-Time Sync**: Updates every 10 minutes automatically

### 🛠️ Technical Highlights
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **API Routes**: Server-side data fetching
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Beautiful, accessible UI components

## 🚀 Deploy to Vercel

### Option 1: Import from GitHub (Recommended)
1. **Fork this repository** to your GitHub account
2. **Visit [Vercel](https://vercel.com)** and sign in
3. **Click "New Project"**
4. **Import your forked repository**
5. **Deploy** - Vercel will handle the rest!

### Option 2: Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maroayman/maroayman)

### Option 3: CLI Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Clone and deploy
git clone https://github.com/maroayman/maroayman.git
cd maroayman
npm install --legacy-peer-deps
vercel --prod
\`\`\`

## 🔧 Configuration

### Environment Variables (Optional)
No environment variables are required - the portfolio works out of the box!

### Customization
To customize for your own portfolio:

1. **Update Blog Username**: Edit `lib/hashnode.ts` to change the username
2. **Modify Content**: Update components in `/components/` folder
3. **Change Theme**: Customize colors in `tailwind.config.ts`

## 📂 Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/hashnode/      # API routes for blog data
│   ├── articles/          # Articles page with filtering
│   ├── projects/          # Projects showcase
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   └── *.tsx             # Portfolio sections
├── lib/                  # Utilities and APIs
├── public/               # Static assets
└── config/               # Configuration files
\`\`\`

## 🌐 Live Demo

Visit the live demo: **[Your Vercel URL]**

## 🛠️ Development

\`\`\`bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## ✨ Features Included

- ✅ **Auto-updating articles** from Hashnode
- ✅ **Advanced tag filtering** with multi-select
- ✅ **Professional security** (debug controls in development only)
- ✅ **Responsive design** for all devices
- ✅ **Dark/light theme** support
- ✅ **Real-time content sync**
- ✅ **Server-side rendering** with API routes
- ✅ **SEO optimized** with proper meta tags

## 📧 Contact

**Marwan Ayman**
- 📝 Blog: [maroayman.hashnode.dev](https://maroayman.hashnode.dev)
- 🐙 GitHub: [@maroayman](https://github.com/maroayman)

---

⭐ **If this portfolio helped you, please give it a star!** ⭐

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is [MIT](./LICENSE) licensed.
