const puppeteer = require('puppeteer');

async function testMobileArtifacts() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport({
    width: 375,
    height: 667,
    isMobile: true,
    hasTouch: true
  });

  // Navigate to the site
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  
  // Wait for page to fully load
  await page.waitForTimeout(3000);

  // Take screenshot of initial state
  await page.screenshot({ path: 'mobile-initial.png', fullPage: true });

  // Test scrolling
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'mobile-scrolled.png', fullPage: true });

  // Check for overlapping elements
  const overlappingElements = await page.evaluate(() => {
    const fixedElements = document.querySelectorAll('[class*="fixed"]');
    const overlaps = [];
    
    for (let i = 0; i < fixedElements.length; i++) {
      for (let j = i + 1; j < fixedElements.length; j++) {
        const rect1 = fixedElements[i].getBoundingClientRect();
        const rect2 = fixedElements[j].getBoundingClientRect();
        
        // Check if elements overlap
        if (!(rect1.right < rect2.left || 
              rect2.right < rect1.left || 
              rect1.bottom < rect2.top || 
              rect2.bottom < rect1.top)) {
          overlaps.push({
            element1: fixedElements[i].className,
            element2: fixedElements[j].className,
            rect1,
            rect2
          });
        }
      }
    }
    
    return overlaps;
  });

  console.log('Overlapping elements found:', overlappingElements);

  // Check z-index conflicts
  const zIndexElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('[class*="z-"]');
    return Array.from(elements).map(el => ({
      className: el.className,
      zIndex: window.getComputedStyle(el).zIndex,
      position: window.getComputedStyle(el).position,
      rect: el.getBoundingClientRect()
    })).filter(el => el.zIndex !== 'auto' && el.position === 'fixed');
  });

  console.log('Fixed elements with z-index:', zIndexElements);

  // Test CTA button expansion
  const ctaButton = await page.$('[class*="MobileTouchButton"]');
  if (ctaButton) {
    await ctaButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'mobile-cta-expanded.png', fullPage: true });
  }

  await browser.close();
}

testMobileArtifacts().catch(console.error);