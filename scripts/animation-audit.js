import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract URLs from sitemap
const sitemapUrls = [
  // Main Pages
  'https://ingeniousdigital.com/',
  'https://ingeniousdigital.com/landing',
  'https://ingeniousdigital.com/about',
  'https://ingeniousdigital.com/contact',
  'https://ingeniousdigital.com/blog',
  'https://ingeniousdigital.com/case-studies',
  
  // Service Pages
  'https://ingeniousdigital.com/services/digital-marketing',
  'https://ingeniousdigital.com/services/lead-generation',
  'https://ingeniousdigital.com/services/crm',
  'https://ingeniousdigital.com/services/communication',
  'https://ingeniousdigital.com/services/web-development',
  'https://ingeniousdigital.com/services/photography',
  'https://ingeniousdigital.com/services/videography',
  'https://ingeniousdigital.com/services/ad-management',
  'https://ingeniousdigital.com/services/business-automation',
  'https://ingeniousdigital.com/services/ai-machine-learning',
  
  // Industry Pages
  'https://ingeniousdigital.com/industries/local-retail',
  'https://ingeniousdigital.com/industries/restaurants',
  'https://ingeniousdigital.com/industries/local-services',
  'https://ingeniousdigital.com/industries/healthcare',
  'https://ingeniousdigital.com/industries/auto-services',
  'https://ingeniousdigital.com/industries/manufacturing',
  
  // Sample Location Pages (testing a few key ones)
  'https://ingeniousdigital.com/locations',
  'https://ingeniousdigital.com/locations/fort-lauderdale',
  'https://ingeniousdigital.com/locations/miami',
  
  // Sample Case Studies
  'https://ingeniousdigital.com/case-studies/ai-analytics',
  'https://ingeniousdigital.com/case-studies/cybersecurity-platform',
  
  // Sample Blog Posts
  'https://ingeniousdigital.com/blog/ai-powered-marketing',
  'https://ingeniousdigital.com/blog/local-seo-strategies',
  
  // Legal Pages
  'https://ingeniousdigital.com/privacy',
  'https://ingeniousdigital.com/terms'
];

async function auditAnimations() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  for (const url of sitemapUrls) {
    console.log(`\nAuditing: ${url}`);
    const page = await browser.newPage();
    
    // Set viewport to desktop size
    await page.setViewport({ width: 1920, height: 1080 });
    
    try {
      // Enable performance monitoring
      await page.evaluateOnNewDocument(() => {
        window.animationAudit = {
          transitions: [],
          animations: [],
          transforms: [],
          performanceMetrics: {},
          issues: []
        };
        
        // Override CSS animation/transition events
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
          if (type === 'animationstart' || type === 'transitionstart') {
            window.animationAudit.animations.push({
              type,
              element: this.tagName + (this.className ? '.' + this.className : ''),
              timestamp: Date.now()
            });
          }
          return originalAddEventListener.call(this, type, listener, options);
        };
      });
      
      // Navigate to page
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for animations to load
      await page.waitForTimeout(3000);
      
      // Scroll to trigger scroll animations
      await autoScroll(page);
      
      // Analyze animations
      const pageAudit = await page.evaluate(() => {
        const audit = {
          url: window.location.href,
          animations: [],
          issues: [],
          performance: {},
          recommendations: []
        };
        
        // Find all animated elements
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
          const styles = window.getComputedStyle(element);
          const classList = Array.from(element.classList);
          
          // Check for CSS animations
          if (styles.animationName !== 'none') {
            audit.animations.push({
              type: 'css-animation',
              element: element.tagName + (element.className ? '.' + element.className.split(' ').join('.') : ''),
              animationName: styles.animationName,
              duration: styles.animationDuration,
              timing: styles.animationTimingFunction,
              delay: styles.animationDelay,
              iterationCount: styles.animationIterationCount
            });
          }
          
          // Check for CSS transitions
          if (styles.transition !== 'all 0s ease 0s' && styles.transition !== 'none') {
            audit.animations.push({
              type: 'css-transition',
              element: element.tagName + (element.className ? '.' + element.className.split(' ').join('.') : ''),
              transition: styles.transition,
              duration: styles.transitionDuration,
              timing: styles.transitionTimingFunction,
              delay: styles.transitionDelay
            });
          }
          
          // Check for transforms
          if (styles.transform !== 'none') {
            audit.animations.push({
              type: 'transform',
              element: element.tagName + (element.className ? '.' + element.className.split(' ').join('.') : ''),
              transform: styles.transform
            });
          }
          
          // Check for Framer Motion animations
          if (element.hasAttribute('style') && element.style.transform) {
            audit.animations.push({
              type: 'framer-motion',
              element: element.tagName + (element.className ? '.' + element.className.split(' ').join('.') : ''),
              transform: element.style.transform,
              opacity: element.style.opacity
            });
          }
          
          // Check for potential issues
          // 1. Very long animation durations
          if (styles.animationDuration && parseFloat(styles.animationDuration) > 3) {
            audit.issues.push({
              type: 'long-duration',
              element: element.tagName + '.' + element.className,
              duration: styles.animationDuration,
              message: 'Animation duration exceeds 3 seconds, may feel sluggish'
            });
          }
          
          // 2. No easing function
          if (styles.animationTimingFunction === 'linear' || styles.transitionTimingFunction === 'linear') {
            audit.issues.push({
              type: 'linear-timing',
              element: element.tagName + '.' + element.className,
              message: 'Linear timing function detected, consider using easing for smoother animation'
            });
          }
          
          // 3. Opacity animations without will-change
          if ((styles.animationName && styles.animationName.includes('fade')) || 
              (styles.transition && styles.transition.includes('opacity'))) {
            if (styles.willChange === 'auto') {
              audit.issues.push({
                type: 'missing-will-change',
                element: element.tagName + '.' + element.className,
                message: 'Opacity animation without will-change property'
              });
            }
          }
        });
        
        // Check for 3D elements (Three.js canvases)
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
          audit.animations.push({
            type: '3d-canvas',
            element: 'canvas',
            width: canvas.width,
            height: canvas.height,
            parent: canvas.parentElement?.className || 'unknown'
          });
        });
        
        // Performance metrics
        if (window.performance && window.performance.timing) {
          const timing = window.performance.timing;
          audit.performance = {
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            loadComplete: timing.loadEventEnd - timing.navigationStart,
            firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
          };
        }
        
        // Check for missing animations on key elements
        const heroSection = document.querySelector('.hero, [class*="hero"]');
        if (heroSection) {
          const heroAnimated = Array.from(heroSection.querySelectorAll('*')).some(el => {
            const styles = window.getComputedStyle(el);
            return styles.animationName !== 'none' || styles.transition !== 'none';
          });
          if (!heroAnimated) {
            audit.issues.push({
              type: 'missing-animation',
              element: 'hero-section',
              message: 'Hero section lacks entrance animations'
            });
          }
        }
        
        // Check CTAs for hover animations
        const ctaButtons = document.querySelectorAll('button, .btn, [class*="button"], [class*="cta"]');
        ctaButtons.forEach(button => {
          const styles = window.getComputedStyle(button);
          if (!styles.transition || styles.transition === 'none') {
            audit.issues.push({
              type: 'missing-hover',
              element: button.tagName + '.' + button.className,
              message: 'CTA button lacks hover transition'
            });
          }
        });
        
        return audit;
      });
      
      // Test mobile viewport
      await page.setViewport({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      
      const mobilePerformance = await page.evaluate(() => {
        const canvases = document.querySelectorAll('canvas');
        return {
          has3D: canvases.length > 0,
          canvasCount: canvases.length,
          viewportWidth: window.innerWidth
        };
      });
      
      pageAudit.mobilePerformance = mobilePerformance;
      
      results.push(pageAudit);
      
    } catch (error) {
      console.error(`Error auditing ${url}:`, error.message);
      results.push({
        url,
        error: error.message,
        animations: [],
        issues: [],
        performance: {}
      });
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
  
  // Generate report
  generateReport(results);
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
}

function generateReport(results) {
  let report = '# Animation Audit Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `Total Pages Audited: ${results.length}\n\n`;
  
  // Summary of issues
  const allIssues = results.flatMap(r => r.issues || []);
  const issueTypes = {};
  allIssues.forEach(issue => {
    issueTypes[issue.type] = (issueTypes[issue.type] || 0) + 1;
  });
  
  report += '## Summary of Issues\n\n';
  Object.entries(issueTypes).forEach(([type, count]) => {
    report += `- **${type}**: ${count} occurrences\n`;
  });
  report += '\n';
  
  // Detailed page analysis
  report += '## Page-by-Page Analysis\n\n';
  
  results.forEach(page => {
    report += `### ${page.url}\n\n`;
    
    if (page.error) {
      report += `**Error**: ${page.error}\n\n`;
      return;
    }
    
    // Animations found
    report += `**Animations Found**: ${page.animations.length}\n`;
    const animationTypes = {};
    page.animations.forEach(anim => {
      animationTypes[anim.type] = (animationTypes[anim.type] || 0) + 1;
    });
    Object.entries(animationTypes).forEach(([type, count]) => {
      report += `- ${type}: ${count}\n`;
    });
    report += '\n';
    
    // Performance metrics
    if (page.performance.domContentLoaded) {
      report += '**Performance Metrics**:\n';
      report += `- DOM Content Loaded: ${page.performance.domContentLoaded}ms\n`;
      report += `- Page Load Complete: ${page.performance.loadComplete}ms\n`;
      report += `- First Paint: ${Math.round(page.performance.firstPaint)}ms\n\n`;
    }
    
    // Mobile performance
    if (page.mobilePerformance) {
      report += '**Mobile Performance**:\n';
      report += `- Has 3D Elements: ${page.mobilePerformance.has3D ? 'Yes' : 'No'}\n`;
      if (page.mobilePerformance.has3D) {
        report += `- Canvas Count: ${page.mobilePerformance.canvasCount}\n`;
      }
      report += '\n';
    }
    
    // Issues
    if (page.issues.length > 0) {
      report += '**Issues Found**:\n';
      page.issues.forEach(issue => {
        report += `- **${issue.type}** on \`${issue.element}\`: ${issue.message}\n`;
      });
      report += '\n';
    }
    
    // Specific animation details
    if (page.animations.length > 0) {
      report += '**Animation Details**:\n';
      page.animations.slice(0, 5).forEach(anim => {
        report += `- ${anim.type} on \`${anim.element}\``;
        if (anim.duration) report += ` (${anim.duration})`;
        report += '\n';
      });
      if (page.animations.length > 5) {
        report += `- ... and ${page.animations.length - 5} more\n`;
      }
      report += '\n';
    }
    
    report += '---\n\n';
  });
  
  // Recommendations
  report += '## Global Recommendations\n\n';
  report += '### High Priority Issues\n\n';
  report += '1. **Missing Hover States**: Many CTA buttons lack hover transitions\n';
  report += '2. **Long Animation Durations**: Several animations exceed 3 seconds\n';
  report += '3. **Linear Timing Functions**: Consider using easing functions for smoother animations\n';
  report += '4. **Missing Will-Change**: Opacity animations should use will-change for better performance\n';
  report += '5. **Hero Sections**: Many pages lack entrance animations on hero content\n\n';
  
  report += '### Performance Optimizations\n\n';
  report += '1. **3D on Mobile**: Consider reducing or disabling 3D visualizations on mobile devices\n';
  report += '2. **Animation Throttling**: Implement FPS limiting for better battery life\n';
  report += '3. **Lazy Loading**: Defer animation initialization until elements are in viewport\n\n';
  
  report += '### Design Consistency\n\n';
  report += '1. **Standardize Timing**: Use consistent animation durations across similar elements\n';
  report += '2. **Unified Easing**: Adopt a standard set of easing functions\n';
  report += '3. **Animation Library**: Consider creating reusable animation components\n';
  
  // Save report
  const reportPath = path.join(process.cwd(), 'ANIMATION_AUDIT_REPORT.md');
  fs.writeFileSync(reportPath, report);
  console.log(`\nReport saved to: ${reportPath}`);
}

// Run the audit
auditAnimations().catch(console.error);