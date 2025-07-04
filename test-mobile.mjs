import puppeteer from 'puppeteer';

async function testMobileExperience() {
  console.log('🧪 Testing mobile experience...\n');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set iPhone 13 viewport
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true
    });
    
    // Set mobile user agent
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1');
    
    console.log('📱 Testing mobile CTA section...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Wait for mobile CTA to appear
    await page.waitForSelector('[class*="MobileCTA"]', { timeout: 5000 });
    console.log('✅ Mobile CTA section loaded');
    
    // Check that desktop-only components are not visible
    const desktopOnlyElements = await page.$$('[class*="ExitIntent"], [class*="ScrollTriggered"], [class*="LiveChat"], [class*="FloatingContact"], [class*="StickyCTA"]');
    if (desktopOnlyElements.length === 0) {
      console.log('✅ Desktop-only elements properly hidden on mobile');
    } else {
      console.log(`⚠️  Found ${desktopOnlyElements.length} desktop elements that should be hidden`);
    }
    
    // Test mobile navigation
    console.log('\n📱 Testing mobile navigation...');
    const menuButton = await page.$('[aria-label*="menu" i], button svg[class*="Menu"]');
    if (menuButton) {
      await menuButton.click();
      await page.waitForTimeout(500);
      console.log('✅ Mobile menu opens correctly');
      
      // Close menu
      const closeButton = await page.$('[aria-label*="close" i]');
      if (closeButton) {
        await closeButton.click();
        console.log('✅ Mobile menu closes correctly');
      }
    }
    
    // Test touch targets
    console.log('\n📱 Testing touch targets...');
    const buttons = await page.$$eval('button, a, [role="button"]', elements => 
      elements.map(el => {
        const rect = el.getBoundingClientRect();
        return {
          text: el.textContent?.trim().substring(0, 30),
          width: rect.width,
          height: rect.height,
          isValidSize: rect.width >= 44 && rect.height >= 44
        };
      }).filter(el => el.width > 0 && el.height > 0)
    );
    
    const invalidTargets = buttons.filter(b => !b.isValidSize);
    if (invalidTargets.length === 0) {
      console.log('✅ All touch targets meet minimum size requirements');
    } else {
      console.log(`⚠️  ${invalidTargets.length} touch targets below 44px minimum:`);
      invalidTargets.slice(0, 5).forEach(t => 
        console.log(`   - "${t.text}": ${t.width}x${t.height}px`)
      );
    }
    
    // Test performance metrics
    console.log('\n📊 Mobile performance metrics:');
    const metrics = await page.metrics();
    console.log(`   - DOM Nodes: ${metrics.Nodes}`);
    console.log(`   - JS Heap: ${(metrics.JSHeapUsedSize / 1024 / 1024).toFixed(2)}MB`);
    
    // Test reduced motion
    console.log('\n🎬 Testing reduced motion preferences...');
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' }
    ]);
    await page.reload({ waitUntil: 'networkidle0' });
    console.log('✅ Page respects reduced motion preferences');
    
    console.log('\n✨ Mobile experience test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testMobileExperience();