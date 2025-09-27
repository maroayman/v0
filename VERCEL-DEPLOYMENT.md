# Deploy to Existing Vercel Project

## 🚀 Quick Deployment Steps

### Option A: Update Existing Project (Recommended)

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Find your existing project

2. **Update Git Repository**
   - Go to Project Settings → Git
   - Update the repository to: `https://github.com/maroayman/maroayman`
   - Set branch to: `main`

3. **Deploy**
   - Vercel will automatically detect the changes
   - Click "Deploy" or it will auto-deploy on git push

### Option B: Import as New Project

1. **Create New Project**
   - Click "New Project" in Vercel Dashboard
   - Import from GitHub: `maroayman/maroayman`
   - Select the `main` branch

2. **Configure Build Settings**
   \`\`\`
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next (auto-detected)
   Install Command: npm install --legacy-peer-deps
   \`\`\`

3. **Deploy**
   - Click "Deploy"
   - Your portfolio will be live in ~2 minutes

## ⚙️ Vercel Configuration

### Build Settings (Auto-detected)
- **Framework**: Next.js 15
- **Node Version**: 18.x (recommended)
- **Build Command**: `npm run build`
- **Dev Command**: `npm run dev`
- **Install Command**: `npm install --legacy-peer-deps`

### Environment Variables
No environment variables required! The portfolio works out of the box.

### Domain Setup
- **Production URL**: Your Vercel domain (e.g., `your-project.vercel.app`)
- **Custom Domain**: Add your custom domain in Project Settings → Domains

## 🔄 Auto-Deployment

Once connected, your portfolio will:
- ✅ **Auto-deploy** on every push to `main` branch
- ✅ **Preview deployments** for pull requests
- ✅ **Build optimization** with Vercel's edge network
- ✅ **Analytics** and performance monitoring

## 🌟 What Your Live Portfolio Will Have

- **📱 Responsive Design**: Perfect on all devices
- **⚡ Live Articles**: Auto-updates from your Hashnode blog
- **🔍 Advanced Filtering**: Multi-select tags with search
- **🌙 Dark/Light Theme**: Professional theme switcher
- **📊 Real-time Data**: Articles sync every 10 minutes
- **🛠️ Debug Mode**: Development controls (hidden in production)

## 🔧 Troubleshooting

### If Build Fails:
\`\`\`bash
# Vercel should use this install command:
npm install --legacy-peer-deps
\`\`\`

### If Articles Don't Load:
- Check that API routes are working: `/api/hashnode`
- Verify Hashnode username in `lib/hashnode.ts`

### Custom Configuration:
Update these files if needed:
- `lib/hashnode.ts` - Change username
- `config/portfolio.ts` - Adjust settings
- `components/` - Customize content

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel build logs
2. Ensure `npm run build` works locally
3. Verify all git changes are pushed

Your portfolio is ready for professional deployment! 🎉
