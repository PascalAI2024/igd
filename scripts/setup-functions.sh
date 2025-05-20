#!/bin/bash
# Setup script for Netlify functions

# Navigate to the netlify directory
cd netlify

# Install dependencies for Netlify functions
npm install

# Go back to the root directory
cd ..

# Add Netlify functions directory to .gitignore if it's not already there
if ! grep -q "netlify/node_modules" .gitignore; then
  echo -e "\n# Netlify function dependencies\nnetlify/node_modules" >> .gitignore
fi

# Success message
echo "Netlify functions setup complete!"
echo "You can now deploy your site to Netlify."