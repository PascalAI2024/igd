#!/bin/bash

# Validate Build Script
# This script performs validation checks before deployment

set -e # Exit on error

echo "=== 🔍 Build Validation ==="
echo "Running pre-deployment checks..."

# Check for TypeScript errors
echo -e "\n📝 Running TypeScript checks..."
npm run typecheck
if [ $? -ne 0 ]; then
  echo "❌ TypeScript check failed. Fix errors before deploying."
  exit 1
fi
echo "✅ TypeScript check passed."

# Run linting
echo -e "\n🧹 Linting code..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Fix errors before deploying."
  exit 1
fi
echo "✅ Linting passed."

# Clean previous build
echo -e "\n🧼 Cleaning previous build..."
npm run clean
echo "✅ Clean completed."

# Build the project
echo -e "\n🏗️  Building project..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed. See errors above."
  exit 1
fi
echo "✅ Build completed successfully."

# Check for large JS bundles
echo -e "\n📊 Checking bundle sizes..."
LARGE_BUNDLES=$(find dist/assets -name "*.js" -size +500k | wc -l)
if [ $LARGE_BUNDLES -gt 0 ]; then
  echo "⚠️  Warning: $LARGE_BUNDLES large JavaScript bundles detected (>500KB)."
  find dist/assets -name "*.js" -size +500k | xargs ls -lh
  echo "Consider optimizing these bundles for better performance."
fi

# Check for large CSS files
LARGE_CSS=$(find dist/assets -name "*.css" -size +100k | wc -l)
if [ $LARGE_CSS -gt 0 ]; then
  echo "⚠️  Warning: $LARGE_CSS large CSS files detected (>100KB)."
  find dist/assets -name "*.css" -size +100k | xargs ls -lh
  echo "Consider optimizing these CSS files for better performance."
fi

# Check for HTML validity
echo -e "\n📄 Checking HTML validity..."
if ! [ -x "$(command -v npx)" ]; then
  echo "⚠️  Warning: npx not available, skipping HTML validation."
else
  npx html-validate dist/index.html
  if [ $? -ne 0 ]; then
    echo "⚠️  Warning: HTML validation issues detected."
  else
    echo "✅ HTML validation passed."
  fi
fi

# Check for missing files
echo -e "\n🔎 Checking for missing critical files..."
CRITICAL_FILES=("index.html" "assets" "robots.txt" "sitemap.xml")
for file in "${CRITICAL_FILES[@]}"; do
  if [ ! -e "dist/$file" ]; then
    echo "❌ Critical file missing: $file"
    exit 1
  fi
done
echo "✅ All critical files present."

# Success message
echo -e "\n✅ Build validation complete! Site is ready for deployment."
echo "==========================="

# Preview instructions
echo -e "\nTo preview the site locally, run:"
echo "  npm run preview"
echo ""

exit 0