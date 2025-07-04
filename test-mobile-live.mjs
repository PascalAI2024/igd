import puppeteer from 'puppeteer';

async function testMobileArtifactsLive() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport({
    width: 375,
    height: 667,
    isMobile: true,
    hasTouch: true
  });

  // Navigate to the live site
  await page.goto('https://ingeniousdigital.com/', { waitUntil: 'networkidle2' });
  
  // Wait for page to fully load
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('=== MOBILE ARTIFACT TEST RESULTS ===\n');

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
            rect1: {
              top: rect1.top,
              bottom: rect1.bottom,
              left: rect1.left,
              right: rect1.right
            },
            rect2: {
              top: rect2.top,
              bottom: rect2.bottom,
              left: rect2.left,
              right: rect2.right
            }
          });
        }
      }
    }
    
    return overlaps;
  });

  if (overlappingElements.length > 0) {
    console.log('❌ OVERLAPPING ELEMENTS FOUND:');
    overlappingElements.forEach((overlap, index) => {
      console.log(`\n  ${index + 1}. Overlap detected:`);
      console.log(`     Element 1: ${overlap.element1}`);
      console.log(`     Element 2: ${overlap.element2}`);
    });
  } else {
    console.log('✅ No overlapping fixed elements found');
  }

  // Check z-index conflicts
  const zIndexElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('[class*="z-"]');
    return Array.from(elements).map(el => ({
      className: el.className,
      zIndex: window.getComputedStyle(el).zIndex,
      position: window.getComputedStyle(el).position
    })).filter(el => el.zIndex !== 'auto' && el.position === 'fixed');
  });

  console.log('\n📊 FIXED ELEMENTS WITH Z-INDEX:');
  zIndexElements.forEach(el => {
    console.log(`  - ${el.className.substring(0, 50)}... (z-index: ${el.zIndex})`);
  });

  // Check for multiple CTAs at same position
  const bottomRightElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('[class*="bottom-"][class*="right-"]');
    return Array.from(elements).filter(el => {
      const style = window.getComputedStyle(el);
      return style.position === 'fixed';
    }).map(el => ({
      className: el.className,
      rect: el.getBoundingClientRect()
    }));
  });

  console.log(`\n🎯 Fixed elements at bottom-right: ${bottomRightElements.length}`);
  if (bottomRightElements.length > 1) {
    console.log('⚠️  Multiple elements found at bottom-right position');
  }

  // Test scrolling behavior
  await page.evaluate(() => window.scrollBy(0, 500));
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const scrollArtifacts = await page.evaluate(() => {
    const elements = document.querySelectorAll('[class*="transform"]');
    const artifacts = [];
    
    elements.forEach(el => {
      const transform = window.getComputedStyle(el).transform;
      if (transform && transform !== 'none' && transform.includes('matrix3d')) {
        artifacts.push({
          className: el.className,
          transform: transform
        });
      }
    });
    
    return artifacts;
  });

  console.log(`\n🔄 Transform artifacts found: ${scrollArtifacts.length}`);

  // Check mobile CTA visibility
  const mobileCTA = await page.$('[class*="MobileCTASection"]');
  console.log(`\n📱 Mobile CTA Section: ${mobileCTA ? '✅ Present' : '❌ Not found'}`);

  // Check for desktop components on mobile
  const desktopOnlyComponents = await page.evaluate(() => {
    const components = [];
    
    // Check for ExitIntentPopup
    if (document.querySelector('[class*="ExitIntentPopup"]')) {
      components.push('ExitIntentPopup');
    }
    
    // Check for ScrollTriggeredCTA
    if (document.querySelector('[class*="ScrollTriggeredCTA"]')) {
      components.push('ScrollTriggeredCTA');
    }
    
    // Check for LiveChatWidget
    if (document.querySelector('[class*="LiveChatWidget"]')) {
      components.push('LiveChatWidget');
    }
    
    return components;
  });

  if (desktopOnlyComponents.length > 0) {
    console.log('\n⚠️  DESKTOP COMPONENTS FOUND ON MOBILE:');
    desktopOnlyComponents.forEach(comp => console.log(`  - ${comp}`));
  } else {
    console.log('\n✅ No desktop-only components found on mobile');
  }

  console.log('\n=== TEST COMPLETE ===');

  await browser.close();
}

testMobileArtifactsLive().catch(console.error);