import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

export const checkLinks = async () => {
  const brokenLinks = [];
  const srcDir = path.join(projectRoot, 'src');
  const publicDir = path.join(projectRoot, 'public');

  // Function to check if a file exists
  const fileExists = async (filePath) => {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  };

  // Function to check if a route exists
  const routeExists = async (route) => {
    // Root path is always valid
    if (route === '/') return true;

    // Remove hash from route
    const cleanRoute = route.split('#')[0];
    if (cleanRoute === '') return true;

    // Check if there's a matching page component
    const possiblePaths = [
      path.join(srcDir, 'pages', `${cleanRoute}.tsx`),
      path.join(srcDir, 'pages', cleanRoute, 'index.tsx'),
      path.join(srcDir, 'pages', `${cleanRoute}/index.tsx`),
      // Check in nested service pages
      path.join(srcDir, 'pages/services', `${cleanRoute.replace('/services/', '')}.tsx`),
      // Check in nested industry pages
      path.join(srcDir, 'pages/industries', `${cleanRoute.replace('/industries/', '')}.tsx`)
    ];

    const exists = await Promise.all(possiblePaths.map(fileExists));
    return exists.some(Boolean);
  };

  // Function to scan a file for image paths and links
  const scanFile = async (filePath) => {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Check for image paths
      const imgRegex = /src=["'](\/[^"']+)["']/g;
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        const imgPath = match[1];
        const fullPath = path.join(publicDir, imgPath);
        if (!(await fileExists(fullPath))) {
          brokenLinks.push({
            type: 'image',
            path: imgPath,
            location: filePath,
            error: 'Image file not found'
          });
        }
      }

      // Check for navigation links
      const linkRegex = /to=["']([^"']+)["']/g;
      while ((match = linkRegex.exec(content)) !== null) {
        const linkPath = match[1];
        if (!linkPath.startsWith('http') && !(await routeExists(linkPath))) {
          brokenLinks.push({
            type: 'navigation',
            path: linkPath,
            location: filePath,
            error: 'No matching route or page component found'
          });
        }
      }

      // Check for component imports
      const importRegex = /import\s+.*\s+from\s+["'](\.\/[^"']+)["']/g;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const fullPath = path.resolve(path.dirname(filePath), importPath);
        const possibleExtensions = ['.tsx', '.ts', '.js', '.jsx'];
        const exists = await Promise.all(
          possibleExtensions.map(ext => 
            fileExists(fullPath + ext) || fileExists(fullPath + '/index' + ext)
          )
        );
        if (!exists.some(Boolean)) {
          brokenLinks.push({
            type: 'component',
            path: importPath,
            location: filePath,
            error: 'Imported component not found'
          });
        }
      }
    } catch (error) {
      console.error(`Error scanning file ${filePath}:`, error);
    }
  };

  // Recursively scan all files in src directory
  const scanDirectory = async (dir) => {
    const files = await fs.readdir(dir);
    await Promise.all(files.map(async (file) => {
      const fullPath = path.join(dir, file);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (file.match(/\.(tsx?|jsx?)$/)) {
        await scanFile(fullPath);
      }
    }));
  };

  // Start scanning from src directory
  await scanDirectory(srcDir);

  // Return results
  return {
    brokenLinks,
    summary: {
      total: brokenLinks.length,
      byType: {
        route: brokenLinks.filter(l => l.type === 'route').length,
        image: brokenLinks.filter(l => l.type === 'image').length,
        component: brokenLinks.filter(l => l.type === 'component').length,
        navigation: brokenLinks.filter(l => l.type === 'navigation').length
      }
    }
  };
};

export const runLinkCheck = async () => {
  console.log('Starting link check...');
  const results = await checkLinks();
  
  console.log('\nLink Check Results:');
  console.log('===================');
  console.log(`Total broken links found: ${results.summary.total}`);
  console.log('\nBreakdown by type:');
  Object.entries(results.summary.byType).forEach(([type, count]) => {
    console.log(`${type}: ${count}`);
  });

  if (results.brokenLinks.length > 0) {
    console.log('\nDetailed findings:');
    results.brokenLinks.forEach((link, index) => {
      console.log(`\n${index + 1}. ${link.type.toUpperCase()} ISSUE`);
      console.log(`   Path: ${link.path}`);
      console.log(`   Location: ${link.location}`);
      console.log(`   Error: ${link.error}`);
    });
  } else {
    console.log('\nNo broken links found! 🎉');
  }
};
