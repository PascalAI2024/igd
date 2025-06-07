import puppeteer from 'puppeteer';
import fs from 'fs';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testLiveDetailed() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  const results = {
    timestamp: new Date().toISOString(),
    siteUrl: 'https://ingeniousdigital.com',
    detailedTests: []
  };

  try {
    const page = await browser.newPage();

    // Test 1: Homepage Detailed Analysis
    console.log('\n🏠 DETAILED HOMEPAGE ANALYSIS...');
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    await wait(3000);

    // Check for specific animations
    const homepageAnalysis = await page.evaluate(() => {
      const results = {
        heroSection: {},
        serviceCards: {},
        buttons: {},
        animations: {},
        cursor: {}
      };

      // Hero section analysis
      const hero = document.querySelector('.hero-section, .text-center.mb-20, section:first-child');
      if (hero) {
        results.heroSection = {
          found: true,
          hasTransform: window.getComputedStyle(hero).transform !== 'none',
          opacity: window.getComputedStyle(hero).opacity,
          children: hero.children.length
        };
      }

      // Service cards analysis
      const cards = document.querySelectorAll('.group.relative.overflow-hidden, .backdrop-blur-lg');
      results.serviceCards = {
        count: cards.length,
        classes: cards.length > 0 ? cards[0].className : 'none',
        hasHoverClass: Array.from(cards).some(card => card.className.includes('hover'))
      };

      // Button analysis
      const buttons = document.querySelectorAll('button, [role="button"], .btn, a[href]');
      const primaryButtons = Array.from(buttons).filter(btn => 
        btn.className.includes('bg-gradient') || 
        btn.className.includes('primary') ||
        btn.className.includes('blue')
      );
      
      results.buttons = {
        total: buttons.length,
        primary: primaryButtons.length,
        firstButtonClass: buttons[0]?.className || 'none'
      };

      // Animation classes check
      const animatedElements = document.querySelectorAll(
        '[class*="animate"], [class*="transition"], [class*="duration"], [class*="delay"]'
      );
      results.animations = {
        count: animatedElements.length,
        hasFramerMotion: !!document.querySelector('[style*="transform"]'),
        hasTransitions: animatedElements.length > 0
      };

      // Custom cursor check
      const cursor = document.querySelector('.custom-cursor, [class*="cursor"]');
      results.cursor = {
        found: !!cursor,
        className: cursor?.className || 'none'
      };

      return results;
    });

    results.detailedTests.push({
      page: 'Homepage',
      analysis: homepageAnalysis
    });

    // Test hover interaction
    console.log('\n🖱️ TESTING HOVER INTERACTIONS...');
    
    // Find and hover over a service card
    const hoverTest = await page.evaluate(async () => {
      const cards = document.querySelectorAll('.group.relative.overflow-hidden, .backdrop-blur-lg');
      if (cards.length === 0) return { noCards: true };

      const firstCard = cards[0];
      const rect = firstCard.getBoundingClientRect();
      
      // Get initial state
      const initialTransform = window.getComputedStyle(firstCard).transform;
      const initialScale = window.getComputedStyle(firstCard).scale;
      
      // Simulate hover
      const event = new MouseEvent('mouseenter', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      });
      firstCard.dispatchEvent(event);
      
      // Wait for transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get hover state
      const hoverTransform = window.getComputedStyle(firstCard).transform;
      const hoverScale = window.getComputedStyle(firstCard).scale;
      
      return {
        cardFound: true,
        initialTransform,
        hoverTransform,
        transformChanged: initialTransform !== hoverTransform,
        scaleChanged: initialScale !== hoverScale,
        cardClasses: firstCard.className
      };
    });

    results.detailedTests.push({
      test: 'Hover Interaction',
      result: hoverTest
    });

    // Test specific service pages
    const servicePages = [
      { url: '/services/photography', name: 'Photography' },
      { url: '/services/business-automation', name: 'Business Automation' },
      { url: '/services/crm', name: 'CRM' },
      { url: '/services/system-integration', name: 'System Integration' }
    ];

    for (const service of servicePages) {
      console.log(`\n📄 Testing ${service.name}...`);
      await page.goto(`https://ingeniousdigital.com${service.url}`, { waitUntil: 'networkidle0' });
      await wait(2000);

      const serviceAnalysis = await page.evaluate(() => {
        return {
          canvas: !!document.querySelector('canvas'),
          animations: document.querySelectorAll('[class*="animate"]').length,
          transitions: document.querySelectorAll('[class*="transition"]').length,
          gsap: typeof gsap !== 'undefined',
          framerMotion: !!document.querySelector('[style*="transform-origin"]'),
          threejs: !!window.THREE || !!document.querySelector('canvas')
        };
      });

      results.detailedTests.push({
        page: service.name,
        features: serviceAnalysis
      });
    }

    // Check mobile responsiveness
    console.log('\n📱 TESTING MOBILE VIEW...');
    await page.setViewport({ width: 375, height: 667, isMobile: true });
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    await wait(2000);

    const mobileAnalysis = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      return {
        hasCanvas: !!canvas,
        canvasDisplay: canvas ? window.getComputedStyle(canvas).display : 'none',
        responsiveElements: document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"]').length
      };
    });

    results.detailedTests.push({
      test: 'Mobile View',
      result: mobileAnalysis
    });

  } catch (error) {
    console.error('Test error:', error);
    results.error = error.message;
  } finally {
    await browser.close();
  }

  // Generate detailed report
  console.log('\n' + '='.repeat(60));
  console.log('DETAILED ANIMATION ANALYSIS REPORT');
  console.log('='.repeat(60));
  console.log(`Site: ${results.siteUrl}`);
  console.log(`Tested: ${results.timestamp}`);
  console.log('='.repeat(60));

  results.detailedTests.forEach(test => {
    console.log(`\n${test.page || test.test}:`);
    console.log(JSON.stringify(test, null, 2));
  });

  console.log('\n' + '='.repeat(60));

  // Save report
  fs.writeFileSync('detailed-animation-report.json', JSON.stringify(results, null, 2));
  console.log('\n📄 Detailed report saved to detailed-animation-report.json');

  return results;
}

// Run the tests
testLiveDetailed().catch(console.error);