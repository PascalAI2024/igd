import puppeteer from 'puppeteer';
import fs from 'fs';

// Helper function to wait
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testLiveAnimations() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  const results = {
    timestamp: new Date().toISOString(),
    siteUrl: 'https://ingeniousdigital.com',
    tests: []
  };

  try {
    const page = await browser.newPage();

    // Set up console logging
    const consoleLogs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleLogs.push({
          type: 'error',
          text: msg.text(),
          location: msg.location()
        });
      }
    });

    // Test 1: Homepage animations and hover effects
    console.log('\n🏠 Testing Homepage...');
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    await wait(2000);

    // Check service card hover effects
    const serviceCards = await page.$$('.service-card, [class*="service"]');
    console.log(`Found ${serviceCards.length} service cards`);

    if (serviceCards.length > 0) {
      // Test hover on first service card
      const firstCard = serviceCards[0];
      const boundingBox = await firstCard.boundingBox();
      if (boundingBox) {
        await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
        await wait(500);
        
        // Check for transform changes
        const hasHoverEffect = await page.evaluate(() => {
          const cards = document.querySelectorAll('.service-card, [class*="service"]');
          if (cards.length > 0) {
            const styles = window.getComputedStyle(cards[0]);
            return styles.transform !== 'none' || styles.scale !== 'none';
          }
          return false;
        });

        results.tests.push({
          name: 'Homepage Service Card Hover',
          passed: hasHoverEffect,
          details: hasHoverEffect ? 'Hover effects working' : 'No hover transform detected'
        });
      }
    }

    // Check hero animations
    const heroAnimations = await page.evaluate(() => {
      const hero = document.querySelector('[class*="hero"], .hero-section');
      if (hero) {
        const elements = hero.querySelectorAll('[class*="animate"], [style*="animation"], [style*="transform"]');
        return elements.length > 0;
      }
      return false;
    });

    results.tests.push({
      name: 'Homepage Hero Animations',
      passed: heroAnimations,
      details: heroAnimations ? 'Hero animations present' : 'No hero animations detected'
    });

    // Test scroll animations
    await page.evaluate(() => window.scrollBy(0, 500));
    await wait(1000);

    const scrollAnimations = await page.evaluate(() => {
      const animatedElements = document.querySelectorAll('[class*="aos"], [class*="fade"], [class*="slide"], [data-aos]');
      return animatedElements.length > 0;
    });

    results.tests.push({
      name: 'Scroll Animations',
      passed: scrollAnimations,
      details: scrollAnimations ? 'Scroll animations detected' : 'No scroll animations found'
    });

    // Test 2: Mobile viewport for 3D performance
    console.log('\n📱 Testing Mobile Performance...');
    await page.setViewport({ width: 375, height: 667, isMobile: true });
    await page.reload({ waitUntil: 'networkidle0' });
    await wait(2000);

    const mobile3DPerformance = await page.evaluate(() => {
      const canvasElements = document.querySelectorAll('canvas');
      const has3D = canvasElements.length > 0;
      
      // Check if animations are running smoothly
      let fps = 0;
      if (has3D) {
        return new Promise(resolve => {
          let frameCount = 0;
          const startTime = performance.now();
          
          function checkFrame() {
            frameCount++;
            if (performance.now() - startTime >= 1000) {
              fps = frameCount;
              resolve({ has3D, fps, smooth: fps >= 30 });
            } else {
              requestAnimationFrame(checkFrame);
            }
          }
          requestAnimationFrame(checkFrame);
        });
      }
      return { has3D, fps: 0, smooth: false };
    });

    results.tests.push({
      name: 'Mobile 3D Performance',
      passed: mobile3DPerformance.smooth || !mobile3DPerformance.has3D,
      details: mobile3DPerformance.has3D 
        ? `3D running at ${mobile3DPerformance.fps} FPS` 
        : 'No 3D elements on mobile'
    });

    // Reset to desktop viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Test 3: Photography page GSAP animations
    console.log('\n📸 Testing Photography Page...');
    await page.goto('https://ingeniousdigital.com/services/photography', { waitUntil: 'networkidle0' });
    await wait(2000);

    const photographyGSAP = await page.evaluate(() => {
      // Check for GSAP presence
      const hasGSAP = typeof gsap !== 'undefined';
      const portfolioElements = document.querySelectorAll('[class*="portfolio"], [class*="showcase"]');
      return {
        hasGSAP,
        portfolioCount: portfolioElements.length,
        hasAnimations: hasGSAP || portfolioElements.length > 0
      };
    });

    results.tests.push({
      name: 'Photography GSAP Showcase',
      passed: photographyGSAP.hasAnimations,
      details: `GSAP: ${photographyGSAP.hasGSAP}, Portfolio items: ${photographyGSAP.portfolioCount}`
    });

    // Test 4: Business Automation workflow
    console.log('\n🤖 Testing Business Automation Page...');
    await page.goto('https://ingeniousdigital.com/services/business-automation', { waitUntil: 'networkidle0' });
    await wait(2000);

    const workflowBuilder = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      const workflowElements = document.querySelectorAll('[class*="workflow"], [class*="process"]');
      return {
        hasCanvas: !!canvas,
        workflowCount: workflowElements.length,
        hasInteractivity: !!canvas || workflowElements.length > 0
      };
    });

    results.tests.push({
      name: 'Business Automation Workflow',
      passed: workflowBuilder.hasInteractivity,
      details: `Canvas: ${workflowBuilder.hasCanvas}, Workflow elements: ${workflowBuilder.workflowCount}`
    });

    // Test 5: CRM data flow
    console.log('\n💼 Testing CRM Page...');
    await page.goto('https://ingeniousdigital.com/services/crm', { waitUntil: 'networkidle0' });
    await wait(2000);

    const crmDataFlow = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      const dataElements = document.querySelectorAll('[class*="data"], [class*="flow"], [class*="dashboard"]');
      return {
        hasCanvas: !!canvas,
        dataElementCount: dataElements.length,
        hasVisualization: !!canvas || dataElements.length > 0
      };
    });

    results.tests.push({
      name: 'CRM Data Flow Visualization',
      passed: crmDataFlow.hasVisualization,
      details: `Canvas: ${crmDataFlow.hasCanvas}, Data elements: ${crmDataFlow.dataElementCount}`
    });

    // Test 6: System Integration network diagram
    console.log('\n🔌 Testing System Integration Page...');
    await page.goto('https://ingeniousdigital.com/services/system-integration', { waitUntil: 'networkidle0' });
    await wait(2000);

    const networkDiagram = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      const networkElements = document.querySelectorAll('[class*="network"], [class*="system"], [class*="integration"]');
      return {
        hasCanvas: !!canvas,
        networkCount: networkElements.length,
        hasDiagram: !!canvas || networkElements.length > 0
      };
    });

    results.tests.push({
      name: 'System Integration Network',
      passed: networkDiagram.hasDiagram,
      details: `Canvas: ${networkDiagram.hasCanvas}, Network elements: ${networkDiagram.networkCount}`
    });

    // Test button hover effects across the site
    console.log('\n🔘 Testing Button Hover Effects...');
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    
    const buttonHoverTest = await page.evaluate(async () => {
      const buttons = document.querySelectorAll('button, a[class*="btn"], [class*="button"]');
      if (buttons.length === 0) return { hasButtons: false, hoverWorks: false };

      const firstButton = buttons[0];
      const initialStyles = window.getComputedStyle(firstButton);
      const initialTransform = initialStyles.transform;
      const initialBackground = initialStyles.backgroundColor;

      // Simulate hover
      firstButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 100));

      const hoverStyles = window.getComputedStyle(firstButton);
      const hasChange = hoverStyles.transform !== initialTransform || 
                       hoverStyles.backgroundColor !== initialBackground ||
                       hoverStyles.scale !== 'none';

      return {
        hasButtons: true,
        hoverWorks: hasChange,
        buttonCount: buttons.length
      };
    });

    results.tests.push({
      name: 'Button Hover Effects',
      passed: buttonHoverTest.hoverWorks,
      details: `${buttonHoverTest.buttonCount} buttons found, hover effects: ${buttonHoverTest.hoverWorks ? 'working' : 'not detected'}`
    });

    // Check for console errors
    results.consoleErrors = consoleLogs;
    results.tests.push({
      name: 'Console Errors',
      passed: consoleLogs.length === 0,
      details: consoleLogs.length === 0 ? 'No console errors' : `${consoleLogs.length} console errors found`
    });

    // Performance check
    const performanceMetrics = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
        loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart
      };
    });

    results.performance = performanceMetrics;

  } catch (error) {
    console.error('Test error:', error);
    results.error = error.message;
  } finally {
    await browser.close();
  }

  // Generate report
  console.log('\n' + '='.repeat(60));
  console.log('ANIMATION VERIFICATION REPORT');
  console.log('='.repeat(60));
  console.log(`Site: ${results.siteUrl}`);
  console.log(`Tested: ${results.timestamp}`);
  console.log('='.repeat(60));

  console.log('\n📊 TEST RESULTS:\n');
  
  let passedTests = 0;
  results.tests.forEach(test => {
    const status = test.passed ? '✅' : '❌';
    console.log(`${status} ${test.name}`);
    console.log(`   ${test.details}\n`);
    if (test.passed) passedTests++;
  });

  console.log('='.repeat(60));
  console.log(`SUMMARY: ${passedTests}/${results.tests.length} tests passed`);
  
  if (results.consoleErrors && results.consoleErrors.length > 0) {
    console.log('\n⚠️  CONSOLE ERRORS:');
    results.consoleErrors.forEach(err => {
      console.log(`   ${err.text}`);
    });
  }

  if (results.performance) {
    console.log('\n⚡ PERFORMANCE METRICS:');
    console.log(`   First Paint: ${results.performance.firstPaint?.toFixed(0)}ms`);
    console.log(`   First Contentful Paint: ${results.performance.firstContentfulPaint?.toFixed(0)}ms`);
    console.log(`   DOM Content Loaded: ${results.performance.domContentLoaded?.toFixed(0)}ms`);
    console.log(`   Page Load Complete: ${results.performance.loadComplete?.toFixed(0)}ms`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // Save detailed report
  fs.writeFileSync('animation-test-report.json', JSON.stringify(results, null, 2));
  console.log('📄 Detailed report saved to animation-test-report.json');

  return results;
}

// Run the tests
testLiveAnimations().catch(console.error);