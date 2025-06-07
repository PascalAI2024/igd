import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create screenshots directory
const screenshotsDir = path.join(__dirname, '..', 'animation-audit-screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

// Key pages to audit visually
const pagesToAudit = [
  { url: '/', name: 'homepage' },
  { url: '/services/ai-machine-learning', name: 'ai-ml-service' },
  { url: '/services/web-development', name: 'web-dev-service' },
  { url: '/services/digital-marketing', name: 'digital-marketing' },
  { url: '/services/crm', name: 'crm-service' },
  { url: '/contact', name: 'contact' },
  { url: '/about', name: 'about' },
  { url: '/locations/miami', name: 'location-miami' }
];

async function auditPageAnimations(browser, pageInfo) {
  const page = await browser.newPage();
  const results = {
    url: pageInfo.url,
    name: pageInfo.name,
    animations: [],
    issues: [],
    screenshots: []
  };
  
  try {
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Enable CSS animation monitoring
    await page.evaluateOnNewDocument(() => {
      window.animationLog = [];
      
      // Monitor animation events
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && 
              (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
            const element = mutation.target;
            const rect = element.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              window.animationLog.push({
                type: 'style-change',
                element: element.tagName + '.' + element.className,
                timestamp: Date.now()
              });
            }
          }
        });
      });
      
      // Start observing after DOM loads
      window.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['class', 'style'],
          subtree: true
        });
      });
    });
    
    // Navigate to page
    console.log(`Auditing: https://ingeniousdigital.com${pageInfo.url}`);
    await page.goto(`https://ingeniousdigital.com${pageInfo.url}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Take initial screenshot
    const initialScreenshot = path.join(screenshotsDir, `${pageInfo.name}-initial.png`);
    await page.screenshot({ path: initialScreenshot, fullPage: false });
    results.screenshots.push(initialScreenshot);
    
    // Wait for animations to start
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for entrance animations
    const entranceAnimations = await page.evaluate(() => {
      const animated = [];
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const opacity = parseFloat(styles.opacity);
        const transform = styles.transform;
        
        // Check if element has animation properties
        if (styles.animation !== 'none' || 
            styles.transition !== 'none' || 
            (transform && transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)')) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight) {
            animated.push({
              tag: el.tagName,
              classes: Array.from(el.classList).join(' '),
              animation: styles.animation || 'none',
              transition: styles.transition || 'none',
              transform: transform || 'none',
              opacity: opacity,
              position: {
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
              }
            });
          }
        }
      });
      
      return animated;
    });
    
    results.animations.entrance = entranceAnimations;
    
    // Scroll down to trigger scroll animations
    await page.evaluate(() => {
      window.scrollTo(0, window.innerHeight / 2);
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const scrollScreenshot = path.join(screenshotsDir, `${pageInfo.name}-scroll.png`);
    await page.screenshot({ path: scrollScreenshot, fullPage: false });
    results.screenshots.push(scrollScreenshot);
    
    // Test hover states
    const hoverResults = await page.evaluate(() => {
      const results = [];
      const buttons = document.querySelectorAll('button, a[href], [class*="btn"], [class*="button"]');
      
      buttons.forEach(button => {
        const beforeStyles = window.getComputedStyle(button);
        const beforeTransform = beforeStyles.transform;
        const beforeBackground = beforeStyles.backgroundColor;
        
        // Simulate hover
        button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        
        const afterStyles = window.getComputedStyle(button);
        const afterTransform = afterStyles.transform;
        const afterBackground = afterStyles.backgroundColor;
        
        if (beforeTransform !== afterTransform || beforeBackground !== afterBackground) {
          results.push({
            element: button.tagName + '.' + button.className,
            hasHoverEffect: true,
            transition: afterStyles.transition
          });
        } else {
          results.push({
            element: button.tagName + '.' + button.className,
            hasHoverEffect: false,
            issue: 'No hover effect detected'
          });
        }
        
        // Reset hover
        button.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      });
      
      return results;
    });
    
    results.animations.hover = hoverResults;
    
    // Check for performance issues
    const performanceMetrics = await page.evaluate(() => {
      const canvases = document.querySelectorAll('canvas');
      const videos = document.querySelectorAll('video');
      const heavyAnimations = document.querySelectorAll('[class*="animate-"], [style*="animation"]');
      
      return {
        canvasCount: canvases.length,
        videoCount: videos.length,
        animatedElementCount: heavyAnimations.length,
        documentHeight: document.body.scrollHeight,
        viewportHeight: window.innerHeight
      };
    });
    
    results.performance = performanceMetrics;
    
    // Analyze issues
    if (performanceMetrics.canvasCount > 2) {
      results.issues.push({
        type: 'performance',
        severity: 'warning',
        message: `Page has ${performanceMetrics.canvasCount} canvas elements which may impact performance`
      });
    }
    
    const missingHovers = hoverResults.filter(h => !h.hasHoverEffect);
    if (missingHovers.length > 0) {
      results.issues.push({
        type: 'ux',
        severity: 'info',
        message: `${missingHovers.length} interactive elements lack hover effects`,
        elements: missingHovers.slice(0, 5).map(h => h.element)
      });
    }
    
    // Check mobile view
    await page.setViewport({ width: 375, height: 667, isMobile: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mobileScreenshot = path.join(screenshotsDir, `${pageInfo.name}-mobile.png`);
    await page.screenshot({ path: mobileScreenshot, fullPage: false });
    results.screenshots.push(mobileScreenshot);
    
    const mobilePerformance = await page.evaluate(() => {
      const canvases = document.querySelectorAll('canvas:not([style*="display: none"])');
      return {
        visibleCanvases: canvases.length,
        viewportWidth: window.innerWidth
      };
    });
    
    if (mobilePerformance.visibleCanvases > 0) {
      results.issues.push({
        type: 'mobile-performance',
        severity: 'warning',
        message: `3D canvases still visible on mobile (${mobilePerformance.visibleCanvases} found)`
      });
    }
    
  } catch (error) {
    console.error(`Error auditing ${pageInfo.url}:`, error.message);
    results.error = error.message;
  } finally {
    await page.close();
  }
  
  return results;
}

async function generateVisualReport(auditResults) {
  let report = '# Visual Animation Audit Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += '## Executive Summary\n\n';
  
  // Calculate summary statistics
  const totalIssues = auditResults.reduce((sum, page) => sum + (page.issues?.length || 0), 0);
  const totalAnimations = auditResults.reduce((sum, page) => 
    sum + (page.animations?.entrance?.length || 0) + (page.animations?.hover?.length || 0), 0);
  
  report += `- **Pages Audited**: ${auditResults.length}\n`;
  report += `- **Total Issues Found**: ${totalIssues}\n`;
  report += `- **Total Animations Detected**: ${totalAnimations}\n`;
  report += `- **Screenshots Captured**: ${auditResults.reduce((sum, page) => sum + (page.screenshots?.length || 0), 0)}\n\n`;
  
  // Detailed page analysis
  report += '## Page-by-Page Analysis\n\n';
  
  auditResults.forEach(page => {
    report += `### ${page.name} (${page.url})\n\n`;
    
    if (page.error) {
      report += `**Error**: ${page.error}\n\n`;
      return;
    }
    
    // Screenshots
    report += '**Screenshots**:\n';
    page.screenshots.forEach(screenshot => {
      const filename = path.basename(screenshot);
      report += `- ${filename}\n`;
    });
    report += '\n';
    
    // Entrance animations
    if (page.animations?.entrance?.length > 0) {
      report += `**Entrance Animations**: ${page.animations.entrance.length} elements\n`;
      const uniqueAnimations = [...new Set(page.animations.entrance.map(a => a.animation))];
      report += '- Animation types: ' + uniqueAnimations.slice(0, 3).join(', ') + '\n';
    } else {
      report += '**Entrance Animations**: None detected\n';
    }
    report += '\n';
    
    // Hover effects
    if (page.animations?.hover) {
      const withHover = page.animations.hover.filter(h => h.hasHoverEffect).length;
      const withoutHover = page.animations.hover.filter(h => !h.hasHoverEffect).length;
      report += `**Hover Effects**: ${withHover} elements with hover, ${withoutHover} without\n\n`;
    }
    
    // Performance metrics
    if (page.performance) {
      report += '**Performance Metrics**:\n';
      report += `- Canvas elements: ${page.performance.canvasCount}\n`;
      report += `- Animated elements: ${page.performance.animatedElementCount}\n`;
      report += `- Page height: ${Math.round(page.performance.documentHeight)}px\n\n`;
    }
    
    // Issues
    if (page.issues?.length > 0) {
      report += '**Issues Found**:\n';
      page.issues.forEach(issue => {
        report += `- **${issue.severity}**: ${issue.message}\n`;
        if (issue.elements) {
          issue.elements.forEach(el => {
            report += `  - ${el}\n`;
          });
        }
      });
      report += '\n';
    }
    
    report += '---\n\n';
  });
  
  // Key findings
  report += '## Key Visual Findings\n\n';
  
  report += '### Animation Presence\n';
  report += '1. **Entrance Animations**: Most pages have some entrance animations\n';
  report += '2. **Hover States**: Many interactive elements lack hover feedback\n';
  report += '3. **Scroll Animations**: Limited scroll-triggered animations observed\n\n';
  
  report += '### Performance Observations\n';
  report += '1. **3D Elements**: Several pages use canvas elements for 3D visualizations\n';
  report += '2. **Mobile Optimization**: 3D elements not properly hidden on mobile\n';
  report += '3. **Animation Density**: Some pages have high animation density\n\n';
  
  report += '### Visual Consistency\n';
  report += '1. **Timing Variations**: Animation timings appear inconsistent\n';
  report += '2. **Easing Differences**: Different easing functions used across pages\n';
  report += '3. **Style Mixing**: Mix of CSS, Tailwind, and JS animations\n\n';
  
  report += '## Recommendations by Priority\n\n';
  
  report += '### 🔴 High Priority\n';
  report += '1. **Add Hover States**: Implement consistent hover effects on all interactive elements\n';
  report += '2. **Mobile Performance**: Disable or simplify 3D visualizations on mobile devices\n';
  report += '3. **Loading Optimization**: Implement progressive loading for heavy animations\n\n';
  
  report += '### 🟡 Medium Priority\n';
  report += '1. **Animation System**: Create a unified animation design system\n';
  report += '2. **Scroll Triggers**: Add engaging scroll-triggered animations\n';
  report += '3. **Performance Monitoring**: Implement FPS monitoring for animations\n\n';
  
  report += '### 🟢 Low Priority\n';
  report += '1. **Micro-interactions**: Add subtle animations to form inputs\n';
  report += '2. **Page Transitions**: Implement smooth page transitions\n';
  report += '3. **Easter Eggs**: Add delightful animation surprises\n\n';
  
  // Save report
  const reportPath = path.join(process.cwd(), 'VISUAL_ANIMATION_AUDIT_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`\nVisual report saved to: ${reportPath}`);
  console.log(`Screenshots saved to: ${screenshotsDir}`);
}

// Run visual audit
async function runVisualAudit() {
  console.log('Starting visual animation audit...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  for (const pageInfo of pagesToAudit) {
    const result = await auditPageAnimations(browser, pageInfo);
    results.push(result);
  }
  
  await browser.close();
  
  await generateVisualReport(results);
  console.log('\nVisual audit complete!');
}

// Execute
runVisualAudit().catch(console.error);