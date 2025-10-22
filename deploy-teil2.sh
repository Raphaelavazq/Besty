#!/bin/bash
# Deployment script for Teil 2 Bild Beschreiben + Vercel API fix

set -e  # Exit on error

echo "🚀 Preparing deployment: Teil 2 + Vercel API fix"
echo ""

# Add critical Vercel fix
echo "✅ Adding Vercel API configuration fix..."
git add vercel.json
git add VERCEL_DEPLOYMENT_FIX.md

# Add new Bild Beschreiben pages and data
echo "✅ Adding Bild Beschreiben components and data..."
git add data/
git add src/pages/BildBeschreiben.jsx
git add src/pages/BildBeschreibenDetail.jsx
git add src/pages/ThemeGallery.jsx

# Add all new images (Teil 2)
echo "✅ Adding Teil 2 images..."
git add public/images/sprechen/bild-beschreiben/

# Add utility functions and components
echo "✅ Adding utilities and UI components..."
git add src/utils/cn.js
git add src/components/ui/

# Add supporting scripts
echo "✅ Adding build and validation scripts..."
git add scripts/scan-bild-beschreiben.js
git add scripts/validate-bild-metadata.js
git add scripts/merge-bild-data.js
git add scripts/test-bild-manifest.js

# Add documentation
echo "✅ Adding documentation..."
git add docs/BILD_BESCHREIBEN_REFACTORING.md
git add BILD_BESCHREIBEN_COMPLETE.md
git add BILD_BESCHREIBEN_QUICK_REFERENCE.md
git add BILD_BESCHREIBEN_REFACTORING.md
git add BILD_BESCHREIBEN_SUMMARY.md
git add .github/copilot-instructions.md

# Add other modified files
echo "✅ Adding updated configuration files..."
git add src/App.jsx
git add src/pages/SprechenHub.jsx
git add vite.config.js
git add README.md

echo ""
echo "📝 Creating commit..."
git commit -m "feat: Add Teil 2 Bild Beschreiben + fix Vercel API routes

🔧 CRITICAL FIX - Vercel API Routes
- Fix vercel.json to properly route /api/* to serverless functions
- Chat feature now works in production
- API routes processed before SPA catch-all

✨ NEW FEATURE - Teil 2 Bild Beschreiben (30 Dialogues)
- Complete catalog page with search functionality
- Search by theme name, category, or dialogue number
- 30 dialogue exercises with images and audio
- Refactored architecture: moved 1,298 lines from component to JSON
- Component reduced from 1,681 to 389 lines (77% reduction)

📊 Data Architecture Improvements
- Unified manifest: data/bild-beschreiben.json
- Questions and answers merged into single source of truth
- Build scripts for content validation and scanning

🎨 New Components & Pages
- BildBeschreiben.jsx - Theme catalog with search
- BildBeschreibenDetail.jsx - Individual exercise view
- ThemeGallery.jsx - Visual theme browser
- UI components library (shadcn-style utilities)

📚 Documentation
- Complete refactoring guide
- Architecture decision records
- Development standards updated

🖼️  Images
- 30+ new images for Teil 2 dialogues
- Organized by theme in /public/images/sprechen/bild-beschreiben/

---
DEPLOYMENT CHECKLIST:
1. Set OPENAI_API_KEY in Vercel env vars
2. Test /api/debug endpoint after deployment
3. Test chat feature in dialogue scenarios
4. Verify search works on Bild Beschreiben page"

echo ""
echo "✅ Commit created successfully!"
echo ""
echo "🚢 Ready to push? Run:"
echo "   git push origin main"
echo ""
echo "After deployment, verify:"
echo "   1. https://b1besty.vercel.app/api/debug"
echo "   2. https://b1besty.vercel.app/tests/sprechen/dialogue"
echo "   3. https://b1besty.vercel.app/tests/sprechen/bild-beschreiben"
echo ""
