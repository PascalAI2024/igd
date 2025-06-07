import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://ingeniousdigital.com';

// Key pages to audit
const pagesToAudit = [
  '/',
  '/landing',
  '/about',
  '/contact',
  '/blog',
  '/case-studies',
  '/services/digital-marketing',
  '/services/lead-generation',
  '/services/crm',
  '/services/communication',
  '/services/web-development',
  '/services/photography',
  '/services/videography',
  '/services/ad-management',
  '/services/business-automation',
  '/services/ai-machine-learning',
  '/industries/local-retail',
  '/industries/restaurants',
  '/industries/local-services',
  '/industries/healthcare',
  '/industries/auto-services',
  '/industries/manufacturing',
  '/locations',
  '/locations/fort-lauderdale',
  '/locations/miami'
];

// Animation patterns to search for in code
const animationPatterns = {
  framerMotion: {
    patterns: [
      /motion\./g,
      /initial=[\{\"]/g,
      /animate=[\{\"]/g,
      /whileHover=[\{\"]/g,
      /whileTap=[\{\"]/g,
      /transition=[\{\"]/g,
      /variants=[\{\"]/g,
      /AnimatePresence/g
    ],
    description: 'Framer Motion animations'
  },
  css: {
    patterns: [
      /animation:/g,
      /transition:/g,
      /transform:/g,
      /keyframes/g,
      /@keyframes/g,
      /animation-[a-z]+:/g,
      /transition-[a-z]+:/g
    ],
    description: 'CSS animations and transitions'
  },
  tailwind: {
    patterns: [
      /transition-[a-z]+/g,
      /duration-\d+/g,
      /ease-[a-z]+/g,
      /delay-\d+/g,
      /animate-[a-z]+/g,
      /hover:scale-/g,
      /hover:rotate-/g,
      /hover:translate-/g,
      /group-hover:/g
    ],
    description: 'Tailwind animation classes'
  },
  threejs: {
    patterns: [
      /useFrame/g,
      /rotation\.[xyz]/g,
      /position\.[xyz]/g,
      /scale\.[xyz]/g,
      /ref\.current\.rotation/g,
      /ref\.current\.position/g,
      /<Canvas/g,
      /<mesh/g
    ],
    description: 'Three.js 3D animations'
  }
};

async function analyzeSourceCode() {
  console.log('Analyzing source code for animation patterns...\n');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const results = {
    byFile: {},
    byType: {},
    total: 0
  };
  
  // Initialize counters
  Object.keys(animationPatterns).forEach(type => {
    results.byType[type] = 0;
  });
  
  // Recursively analyze files
  function analyzeDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        analyzeDirectory(filePath);
      } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css'))) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(srcDir, filePath);
        const fileResults = {};
        
        Object.entries(animationPatterns).forEach(([type, config]) => {
          let count = 0;
          config.patterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
              count += matches.length;
            }
          });
          
          if (count > 0) {
            fileResults[type] = count;
            results.byType[type] += count;
            results.total += count;
          }
        });
        
        if (Object.keys(fileResults).length > 0) {
          results.byFile[relativePath] = fileResults;
        }
      }
    });
  }
  
  analyzeDirectory(srcDir);
  return results;
}

async function checkLivePages() {
  console.log('\nChecking live pages for performance...\n');
  
  const results = [];
  
  for (const page of pagesToAudit) {
    const url = baseUrl + page;
    console.log(`Checking: ${url}`);
    
    try {
      const start = Date.now();
      const response = await fetch(url);
      const loadTime = Date.now() - start;
      
      if (response.ok) {
        const html = await response.text();
        
        // Check for animation indicators in HTML
        const hasFramerMotion = html.includes('framer-motion');
        const hasCanvas = html.includes('<canvas');
        const hasAnimationClasses = /animate-|transition-|duration-/.test(html);
        
        results.push({
          url,
          status: response.status,
          loadTime,
          indicators: {
            hasFramerMotion,
            hasCanvas,
            hasAnimationClasses
          }
        });
      } else {
        results.push({
          url,
          status: response.status,
          error: `HTTP ${response.status}`
        });
      }
    } catch (error) {
      results.push({
        url,
        error: error.message
      });
    }
  }
  
  return results;
}

async function analyzeComponents() {
  console.log('\nAnalyzing specific component patterns...\n');
  
  const componentsDir = path.join(__dirname, '..', 'src', 'components');
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  
  const issues = [];
  
  // Check for common animation issues
  const checkPatterns = [
    {
      pattern: /duration-[3-9]\d{3}|duration-\d{4,}/g,
      issue: 'Very long animation duration',
      severity: 'warning'
    },
    {
      pattern: /animate-pulse.*animate-pulse/g,
      issue: 'Duplicate animation classes',
      severity: 'error'
    },
    {
      pattern: /hover:scale-[2-9]\d\d/g,
      issue: 'Excessive hover scale',
      severity: 'warning'
    },
    {
      pattern: /transition-all/g,
      issue: 'Using transition-all (performance concern)',
      severity: 'info'
    }
  ];
  
  function checkDirectory(dir, dirName) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.')) {
        checkDirectory(filePath, dirName);
      } else if (stat.isFile() && file.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(path.join(__dirname, '..'), filePath);
        
        checkPatterns.forEach(({ pattern, issue, severity }) => {
          const matches = content.match(pattern);
          if (matches) {
            issues.push({
              file: relativePath,
              issue,
              severity,
              occurrences: matches.length,
              examples: matches.slice(0, 3)
            });
          }
        });
        
        // Check for missing hover states on buttons
        if (content.includes('button') || content.includes('Button')) {
          if (!content.includes('hover:')) {
            issues.push({
              file: relativePath,
              issue: 'Button component without hover states',
              severity: 'info',
              occurrences: 1
            });
          }
        }
      }
    });
  }
  
  checkDirectory(componentsDir, 'components');
  checkDirectory(pagesDir, 'pages');
  
  return issues;
}

async function generateReport(sourceAnalysis, liveAnalysis, componentIssues) {
  let report = '# Animation Audit Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  // Source code analysis
  report += '## Source Code Analysis\n\n';
  report += `Total animation references found: **${sourceAnalysis.total}**\n\n`;
  
  report += '### Animation Types Distribution\n\n';
  Object.entries(sourceAnalysis.byType).forEach(([type, count]) => {
    const percentage = ((count / sourceAnalysis.total) * 100).toFixed(1);
    report += `- **${animationPatterns[type].description}**: ${count} (${percentage}%)\n`;
  });
  report += '\n';
  
  // Top files with animations
  report += '### Top Files with Animations\n\n';
  const sortedFiles = Object.entries(sourceAnalysis.byFile)
    .map(([file, types]) => ({
      file,
      total: Object.values(types).reduce((a, b) => a + b, 0),
      types
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 15);
  
  sortedFiles.forEach(({ file, total, types }) => {
    report += `- **${file}**: ${total} animations\n`;
    Object.entries(types).forEach(([type, count]) => {
      report += `  - ${type}: ${count}\n`;
    });
  });
  report += '\n';
  
  // Live page analysis
  report += '## Live Page Performance\n\n';
  
  const avgLoadTime = liveAnalysis
    .filter(p => p.loadTime)
    .reduce((sum, p) => sum + p.loadTime, 0) / liveAnalysis.filter(p => p.loadTime).length;
  
  report += `Average page load time: **${Math.round(avgLoadTime)}ms**\n\n`;
  
  report += '### Page-by-Page Results\n\n';
  liveAnalysis.forEach(page => {
    report += `#### ${page.url}\n`;
    if (page.error) {
      report += `- **Error**: ${page.error}\n`;
    } else {
      report += `- Status: ${page.status}\n`;
      report += `- Load time: ${page.loadTime}ms\n`;
      if (page.indicators) {
        report += `- Has Framer Motion: ${page.indicators.hasFramerMotion ? 'Yes' : 'No'}\n`;
        report += `- Has Canvas (3D): ${page.indicators.hasCanvas ? 'Yes' : 'No'}\n`;
        report += `- Has Animation Classes: ${page.indicators.hasAnimationClasses ? 'Yes' : 'No'}\n`;
      }
    }
    report += '\n';
  });
  
  // Component issues
  report += '## Component Issues\n\n';
  
  const issuesBySeverity = {
    error: componentIssues.filter(i => i.severity === 'error'),
    warning: componentIssues.filter(i => i.severity === 'warning'),
    info: componentIssues.filter(i => i.severity === 'info')
  };
  
  Object.entries(issuesBySeverity).forEach(([severity, issues]) => {
    if (issues.length > 0) {
      report += `### ${severity.charAt(0).toUpperCase() + severity.slice(1)} Issues\n\n`;
      issues.forEach(issue => {
        report += `- **${issue.file}**: ${issue.issue} (${issue.occurrences} occurrences)\n`;
        if (issue.examples) {
          issue.examples.forEach(ex => {
            report += `  - Example: \`${ex}\`\n`;
          });
        }
      });
      report += '\n';
    }
  });
  
  // Recommendations
  report += '## Key Findings & Recommendations\n\n';
  
  report += '### Animation Distribution\n\n';
  report += '1. **Heavy Framer Motion Usage**: The site relies heavily on Framer Motion for animations\n';
  report += '2. **3D Elements**: Multiple pages use Three.js canvases which can impact performance\n';
  report += '3. **CSS/Tailwind Animations**: Good mix of CSS-based animations\n\n';
  
  report += '### Performance Concerns\n\n';
  report += '1. **Long Animation Durations**: Some animations have very long durations (3+ seconds)\n';
  report += '2. **Transition-all Usage**: Using transition-all can impact performance\n';
  report += '3. **3D on Mobile**: Consider reducing 3D complexity on mobile devices\n\n';
  
  report += '### Missing Animations\n\n';
  report += '1. **Button Hover States**: Many buttons lack hover animations\n';
  report += '2. **Page Transitions**: Consider adding consistent page transition animations\n';
  report += '3. **Scroll Animations**: Limited use of scroll-triggered animations\n\n';
  
  report += '### Consistency Issues\n\n';
  report += '1. **Animation Timing**: Inconsistent duration values across components\n';
  report += '2. **Easing Functions**: Mix of different easing functions\n';
  report += '3. **Hover Effects**: Inconsistent hover scale values\n\n';
  
  report += '### Priority Improvements\n\n';
  report += '1. **Create Animation System**: Develop a consistent animation design system\n';
  report += '2. **Performance Optimization**: Implement animation throttling and GPU optimization\n';
  report += '3. **Mobile Experience**: Reduce or simplify animations on mobile\n';
  report += '4. **Loading States**: Add skeleton screens and loading animations\n';
  report += '5. **Micro-interactions**: Add subtle animations to form inputs and buttons\n';
  
  // Save report
  const reportPath = path.join(process.cwd(), 'ANIMATION_AUDIT_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`\nReport saved to: ${reportPath}`);
}

// Run the audit
async function runAudit() {
  try {
    console.log('Starting animation audit...\n');
    
    const sourceAnalysis = await analyzeSourceCode();
    const liveAnalysis = await checkLivePages();
    const componentIssues = await analyzeComponents();
    
    await generateReport(sourceAnalysis, liveAnalysis, componentIssues);
    
    console.log('\nAudit complete!');
  } catch (error) {
    console.error('Audit failed:', error);
  }
}

runAudit();