import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Function to recursively find all files with specific extensions
function findFiles(dir, extensions, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, extensions, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Function to check if a file exists
function fileExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

// Function to extract image paths from a file
function extractImagePaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const imagePaths = [];

  // Match image src attributes in JSX/TSX
  const srcRegex = /src=["']([^"']+)["']/g;
  let match;

  while ((match = srcRegex.exec(content)) !== null) {
    const imgPath = match[1];

    // Only include local paths, not external URLs
    if (!imgPath.startsWith('http') && !imgPath.startsWith('data:')) {
      imagePaths.push(imgPath);
    }
  }

  // Match image imports
  const importRegex = /import\s+.*\s+from\s+["'](.+\.(png|jpg|jpeg|svg|webp))["']/g;
  while ((match = importRegex.exec(content)) !== null) {
    imagePaths.push(match[1]);
  }

  return imagePaths;
}

// Main function to check for broken images
function checkBrokenImages() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcDir = path.join(__dirname, '../../src');
  const publicDir = path.join(__dirname, '../../public');

  // Find all React component files
  const componentFiles = findFiles(srcDir, ['.js', '.jsx', '.ts', '.tsx']);

  const brokenImages = [];

  componentFiles.forEach(file => {
    const imagePaths = extractImagePaths(file);

    imagePaths.forEach(imgPath => {
      // Handle different path formats
      let fullPath;

      if (imgPath.startsWith('/')) {
        // Absolute path from public directory
        fullPath = path.join(publicDir, imgPath);
      } else if (imgPath.startsWith('./') || imgPath.startsWith('../')) {
        // Relative path from component
        fullPath = path.resolve(path.dirname(file), imgPath);
      } else {
        // Might be an import from node_modules or a local module
        return;
      }

      // Check if the image exists
      if (!fileExists(fullPath)) {
        brokenImages.push({
          component: file,
          imagePath: imgPath,
          resolvedPath: fullPath
        });
      }
    });
  });

  return brokenImages;
}

// Run the check
const brokenImages = checkBrokenImages();

if (brokenImages.length > 0) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  console.log('Found broken image references:');
  brokenImages.forEach(img => {
    console.log(`\nComponent: ${path.relative(path.join(__dirname, '../..'), img.component)}`);
    console.log(`Image path: ${img.imagePath}`);
    console.log(`Resolved to: ${img.resolvedPath}`);
  });
  console.log(`\nTotal broken images: ${brokenImages.length}`);
} else {
  console.log('No broken image references found.');
}
