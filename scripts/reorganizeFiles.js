/**
 * Reorganization script for project files
 * This script helps to move files to their new locations and update import paths
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Base directory for the project
const baseDir = path.join(__dirname, '..');

// File move operations to perform
const moveOperations = [
  // Chart components
  {
    from: 'src/components/charts/ThreeDBarChart.tsx',
    to: 'src/components/visualizations/charts/ThreeDBarChart.tsx'
  },
  {
    from: 'src/components/charts/ThreeDPieChart.tsx',
    to: 'src/components/visualizations/charts/ThreeDPieChart.tsx'
  },

  // Network visualization components
  {
    from: 'src/components/services/shared/NetworkVisualization3D.tsx',
    to: 'src/components/visualizations/network/NetworkVisualization3D.tsx'
  },
  {
    from: 'src/components/services/system-integration/SystemNetwork.tsx',
    to: 'src/components/visualizations/network/SystemNetwork.tsx',
    optional: true
  },

  // Process visualization components
  {
    from: 'src/components/services/shared/ProcessFlow3D.tsx',
    to: 'src/components/visualizations/process/ProcessFlow3D.tsx'
  },
  {
    from: 'src/components/services/lead-generation/LeadFunnel3D.tsx',
    to: 'src/components/visualizations/process/LeadFunnel3D.tsx'
  },

  // Animation components
  {
    from: 'src/components/services/ai-ml/NeuralNetworkAnimation.tsx',
    to: 'src/components/visualizations/animations/NeuralNetworkAnimation.tsx'
  },
  {
    from: 'src/components/services/ai-ml/DataVisualization.tsx',
    to: 'src/components/visualizations/animations/DataVisualization.tsx'
  },
  {
    from: 'src/components/AnimationTest.tsx',
    to: 'src/components/visualizations/animations/AnimationTest.tsx'
  },
  {
    from: 'src/components/AnimationErrorBoundary.tsx',
    to: 'src/components/visualizations/animations/AnimationErrorBoundary.tsx'
  }
];

// Directories to create
const directoriesToCreate = [
  'src/components/visualizations',
  'src/components/visualizations/charts',
  'src/components/visualizations/network',
  'src/components/visualizations/process',
  'src/components/visualizations/animations',
  'src/components/forms',
  'src/components/core',
  'src/components/layout',
  'src/components/shared',
  'src/utils/animation'
];

// Create directories
console.log('Creating directories...');
directoriesToCreate.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${dir}`);
  } else {
    console.log(`Already exists: ${dir}`);
  }
});
console.log('');

// Move files
console.log('Moving files...');
moveOperations.forEach(op => {
  const sourcePath = path.join(baseDir, op.from);
  const destPath = path.join(baseDir, op.to);
  
  // Make sure destination directory exists
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Move file if it exists
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Moved: ${op.from} -> ${op.to}`);
  } else if (!op.optional) {
    console.error(`ERROR: Source file does not exist: ${op.from}`);
  } else {
    console.log(`Skipped optional file: ${op.from}`);
  }
});
console.log('');

// Function to update imports in a file
function updateImportsInFile(filePath, importMappings) {
  const fullPath = path.join(baseDir, filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File does not exist: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  importMappings.forEach(mapping => {
    const regex = new RegExp(`from ['"](${mapping.from})['"]`, 'g');
    const newContent = content.replace(regex, `from '${mapping.to}'`);
    
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated imports in: ${filePath}`);
  }
}

// Generate import mappings based on move operations
const importMappings = moveOperations.map(op => {
  const fromRelative = op.from.replace(/^src\//, '../');
  const toRelative = op.to.replace(/^src\//, '../');
  return {
    from: fromRelative.replace(/\.tsx$/, ''),
    to: toRelative.replace(/\.tsx$/, '')
  };
});

console.log('Import mappings:');
console.log(importMappings);
console.log('');

// List all TypeScript files in the project
function findAllTypeScriptFiles() {
  const result = execSync('find src -type f -name "*.ts" -o -name "*.tsx"', { cwd: baseDir }).toString();
  return result.split('\n').filter(f => f.trim());
}

// Update imports in all files
console.log('Updating imports...');
const allTsFiles = findAllTypeScriptFiles();
allTsFiles.forEach(file => {
  updateImportsInFile(file, importMappings);
});

console.log('');
console.log('Reorganization complete!');
console.log(`
Next Steps:
1. Review the moved files and make sure they work correctly
2. Fix any import issues that the script couldn't handle automatically
3. Implement the base components as described in the refactoring plan
4. Update component APIs for consistency
5. Complete the performance optimization phase
`);