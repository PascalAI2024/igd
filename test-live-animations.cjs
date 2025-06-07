const puppeteer = require('puppeteer');

(async () => {
  console.log('Testing live site animations...\n');
  
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport for desktop
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Track console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    // Test homepage
    console.log('1. Testing Homepage...');
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    
    // Check for animation system
    const hasAnimationSystem = await page.evaluate(() => {
      return !!window.gsap && document.documentElement.innerHTML.includes('animation-wrapper');
    });
    console.log('   - Animation system loaded:', hasAnimationSystem);
    
    // Test service card hover
    const serviceCards = await page.$$('[class*="service-card"]');
    console.log('   - Service cards found:', serviceCards.length);
    
    if (serviceCards.length > 0) {
      const beforeHover = await serviceCards[0].evaluate(el => 
        window.getComputedStyle(el).transform
      );
      await serviceCards[0].hover();
      await page.waitForTimeout(300);
      const afterHover = await serviceCards[0].evaluate(el => 
        window.getComputedStyle(el).transform
      );
      console.log('   - Hover effect working:', beforeHover !== afterHover);
    }
    
    // Test mobile viewport
    console.log('\n2. Testing Mobile Performance...');
    await page.setViewport({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle0' });
    
    const canvasCount = await page.evaluate(() => 
      document.querySelectorAll('canvas').length
    );
    console.log('   - Canvas elements on mobile:', canvasCount);
    console.log('   - Mobile optimization:', canvasCount === 0 ? 'PASS' : 'FAIL');
    
    // Test specific service pages
    const servicesToTest = [
      { url: '/services/photography', name: 'Photography' },
      { url: '/services/business-automation', name: 'Business Automation' },
      { url: '/services/crm', name: 'CRM' }
    ];
    
    console.log('\n3. Testing Service Pages...');
    for (const service of servicesToTest) {
      await page.goto(`https://ingeniousdigital.com${service.url}`, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });
      
      const hasGSAP = await page.evaluate(() => !!window.gsap);
      const hasShowcase = await page.evaluate(() => 
        document.querySelector('[class*="showcase"]') !== null
      );
      
      console.log(`   - ${service.name}:`);
      console.log(`     • GSAP loaded: ${hasGSAP}`);
      console.log(`     • Showcase present: ${hasShowcase}`);
    }
    
    // Summary
    console.log('\n4. Summary:');
    console.log('   - Console errors:', errors.length);
    if (errors.length > 0) {
      errors.forEach(err => console.log(`     • ${err}`));
    }
    
    console.log('\n✅ Animation verification complete!');
    
  } catch (error) {
    console.error('Error during testing:', error.message);
  } finally {
    await browser.close();
  }
})();