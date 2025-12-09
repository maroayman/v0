#!/bin/bash
# Quick deploy script for both platforms
# Usage: ./deploy-both.sh [commit message]

set -e

MESSAGE="${1:-Deploy updates}"

echo "📦 Committing changes on main..."
git add -A
git commit -m "$MESSAGE" || echo "Nothing to commit"
git push

echo "🔄 Syncing to cloudflare-pages..."
git checkout cloudflare-pages
git merge main -m "Merge: $MESSAGE"
git push
git checkout main

echo "✅ Done! Vercel auto-deploys from main."
echo "✅ Cloudflare Pages auto-deploys from cloudflare-pages."
echo ""
echo "Or trigger manual deploy: gh workflow run deploy-site.yml -f target=both"
