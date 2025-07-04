import puppeteer from 'puppeteer';

async function debugTests() {
  console.log('🔍 Running debug tests...\n');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080'],
    devtools: true
  });

  const page = await browser.newPage();
  
  // Detailed error tracking
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.error('Page Error:', error.message);
  });

  try {
    // Test 1: Check homepage structure
    console.log('📍 Checking Homepage Structure...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Take screenshot
    await page.screenshot({ path: 'homepage-debug.png', fullPage: true });
    console.log('  📸 Screenshot saved as homepage-debug.png');
    
    // Get page HTML structure
    const bodyHTML = await page.evaluate(() => {
      const body = document.body;
      return {
        innerHTML: body.innerHTML.substring(0, 500),
        childCount: body.children.length,
        classList: Array.from(body.classList)
      };
    });
    
    console.log('  Body child elements:', bodyHTML.childCount);
    console.log('  Body classes:', bodyHTML.classList);
    
    // Check for main elements
    const elements = await page.evaluate(() => {
      return {
        header: !!document.querySelector('header'),
        nav: !!document.querySelector('nav'),
        main: !!document.querySelector('main'),
        hero: !!document.querySelector('[class*="hero"]'),
        buttons: document.querySelectorAll('button').length,
        links: document.querySelectorAll('a').length,
        forms: document.querySelectorAll('form').length
      };
    });
    
    console.log('\n  Page elements found:');
    Object.entries(elements).forEach(([key, value]) => {
      console.log(`    ${key}: ${value}`);
    });
    
    // Test 2: Check Tools page
    console.log('\n📍 Checking Tools Page...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'tools-debug.png', fullPage: true });
    console.log('  📸 Screenshot saved as tools-debug.png');
    
    const toolsContent = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const tools = document.querySelectorAll('[class*="tool"]');
      const inputs = document.querySelectorAll('input');
      
      return {
        title: h1 ? h1.textContent : 'No H1 found',
        toolElements: tools.length,
        inputElements: inputs.length,
        hasContent: document.body.textContent.length > 100
      };
    });
    
    console.log('\n  Tools page analysis:');
    Object.entries(toolsContent).forEach(([key, value]) => {
      console.log(`    ${key}: ${value}`);
    });
    
    // Test 3: Check React Helmet issue
    console.log('\n📍 Checking React Helmet Issue...');
    const helmetIssue = await page.evaluate(() => {
      // Check if Symbol is being used incorrectly
      try {
        const metaTags = document.querySelectorAll('meta');
        return {
          metaCount: metaTags.length,
          hasHelmet: !!window.Helmet,
          reactVersion: window.React ? window.React.version : 'Unknown'
        };
      } catch (e) {
        return { error: e.message };
      }
    });
    
    console.log('\n  Helmet/Meta analysis:');
    Object.entries(helmetIssue).forEach(([key, value]) => {
      console.log(`    ${key}: ${value}`);
    });
    
    console.log('\n✅ Debug complete. Check homepage-debug.png and tools-debug.png');
    
  } catch (error) {
    console.error('\n❌ Debug Error:', error.message);
  }
  
  // Keep browser open for manual inspection
  console.log('\n⏸️  Browser kept open for manual inspection. Close it when done.');
}

// Run debug
debugTests().catch(console.error);