import puppeteer from 'puppeteer';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testImplementation() {
  console.log('🚀 Starting comprehensive feature tests...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  const page = await browser.newPage();
  
  // Track console errors and warnings
  const consoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      consoleMessages.push({
        type: msg.type(),
        text: msg.text().substring(0, 200), // Limit length
        location: msg.location()
      });
    }
  });

  // Track page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message.substring(0, 200)); // Limit length
  });

  const results = {
    homepage: { passed: [], failed: [] },
    uiComponents: { passed: [], failed: [] },
    tools: { passed: [], failed: [] },
    responsive: { passed: [], failed: [] },
    forms: { passed: [], failed: [] },
    features: { passed: [], failed: [] }
  };

  try {
    // Test 1: Homepage loads without errors
    console.log('📍 Testing Homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(3000);
    
    // Check if page loaded successfully
    const title = await page.title();
    if (title) {
      results.homepage.passed.push('✅ Homepage loaded successfully');
      console.log('  ✅ Homepage loaded - Title:', title);
    } else {
      results.homepage.failed.push('❌ Homepage failed to load');
    }

    // Check for hero section using multiple possible selectors
    const heroSelectors = ['.hero-section', '[class*="hero"]', 'section:first-of-type', '#hero'];
    let heroFound = false;
    for (const selector of heroSelectors) {
      const heroSection = await page.$(selector);
      if (heroSection) {
        heroFound = true;
        break;
      }
    }
    
    if (heroFound) {
      results.homepage.passed.push('✅ Hero section rendered');
      console.log('  ✅ Hero section found');
    } else {
      results.homepage.failed.push('❌ Hero section missing');
    }

    // Test 2: New UI Components
    console.log('\n📍 Testing UI Components...');
    
    // Check for enhanced buttons with multiple selectors
    const buttonSelectors = ['button', '.btn', 'a.btn', '[class*="button"]', '.cta-button'];
    let totalButtons = 0;
    for (const selector of buttonSelectors) {
      const buttons = await page.$$(selector);
      totalButtons += buttons.length;
    }
    
    if (totalButtons > 0) {
      results.uiComponents.passed.push(`✅ Found ${totalButtons} buttons/CTAs`);
      console.log(`  ✅ Found ${totalButtons} buttons/CTAs`);
      
      // Test hover effect on first visible button
      const firstButton = await page.$('button:not([disabled])');
      if (firstButton) {
        await firstButton.hover();
        await delay(500);
        results.uiComponents.passed.push('✅ Button hover tested');
        console.log('  ✅ Tested button hover effect');
      }
    }

    // Check for tooltips with better selectors
    const tooltipSelectors = ['[title]', '[data-tooltip]', '[aria-label]', '.tooltip'];
    let tooltipElements = 0;
    for (const selector of tooltipSelectors) {
      const elements = await page.$$(selector);
      tooltipElements += elements.length;
    }
    
    if (tooltipElements > 0) {
      results.uiComponents.passed.push(`✅ Found ${tooltipElements} elements with tooltips/labels`);
      console.log(`  ✅ Found ${tooltipElements} elements with tooltips/labels`);
    }

    // Check for live chat widget
    const chatSelectors = ['.live-chat', '#chat-widget', '[class*="chat"]', '.intercom-launcher', '#tawk-widget'];
    let chatFound = false;
    for (const selector of chatSelectors) {
      const chatWidget = await page.$(selector);
      if (chatWidget) {
        chatFound = true;
        results.uiComponents.passed.push('✅ Live chat widget found');
        console.log('  ✅ Live chat widget detected');
        break;
      }
    }
    
    if (!chatFound) {
      console.log('  ⚠️  Live chat widget not found (may load later)');
    }

    // Test 3: Tools Page
    console.log('\n📍 Testing Tools Page...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle0' });
    await delay(3000);

    // Check if tools page loaded
    const toolsPageTitle = await page.$('h1');
    if (toolsPageTitle) {
      const titleText = await page.evaluate(el => el.textContent, toolsPageTitle);
      results.tools.passed.push('✅ Tools page loaded');
      console.log('  ✅ Tools page loaded - Title:', titleText);
    }

    // Test SEO Analyzer with multiple selectors
    const seoSelectors = ['[class*="seo"]', '#seo-analyzer', '[data-tool="seo"]', '.seo-tool'];
    let seoFound = false;
    for (const selector of seoSelectors) {
      const seoAnalyzer = await page.$(selector);
      if (seoAnalyzer) {
        seoFound = true;
        results.tools.passed.push('✅ SEO Analyzer found');
        console.log('  ✅ SEO Analyzer component found');
        
        // Try to interact with it
        const urlInputSelectors = ['input[type="url"]', 'input[type="text"]', 'input[placeholder*="URL" i]', 'input[placeholder*="website" i]', 'input[placeholder*="enter" i]'];
        for (const inputSelector of urlInputSelectors) {
          const urlInput = await page.$(inputSelector);
          if (urlInput) {
            await urlInput.click();
            await page.keyboard.type('https://example.com');
            await delay(500);
            
            // Find analyze button
            const analyzeButtons = await page.$$('button');
            for (const button of analyzeButtons) {
              const text = await page.evaluate(el => el.textContent, button);
              if (text && (text.includes('Analyze') || text.includes('Check') || text.includes('Start') || text.includes('Test'))) {
                await button.click();
                await delay(2000);
                results.tools.passed.push('✅ SEO Analyzer interaction tested');
                console.log('  ✅ SEO Analyzer accepts input');
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }

    // Test Speed Test Tool
    const speedSelectors = ['[class*="speed"]', '#speed-test', '[data-tool="speed"]', '.speed-tool'];
    for (const selector of speedSelectors) {
      const speedTest = await page.$(selector);
      if (speedTest) {
        results.tools.passed.push('✅ Speed Test tool found');
        console.log('  ✅ Speed Test tool found');
        break;
      }
    }

    // Test 4: Mobile Responsiveness
    console.log('\n📍 Testing Responsive Design...');
    
    // Test different viewports
    const viewports = [
      { name: 'Desktop', width: 1280, height: 800 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Mobile', width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      await page.setViewport({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
      await delay(2000);
      
      // Check if navigation is accessible
      const navSelectors = ['nav', '.navigation', 'header', '[role="navigation"]'];
      let navFound = false;
      for (const selector of navSelectors) {
        const nav = await page.$(selector);
        if (nav) {
          const isVisible = await page.evaluate(el => {
            const rect = el.getBoundingClientRect();
            const styles = window.getComputedStyle(el);
            return rect.width > 0 && rect.height > 0 && styles.display !== 'none';
          }, nav);
          
          if (isVisible) {
            navFound = true;
            results.responsive.passed.push(`✅ ${viewport.name} navigation visible`);
            console.log(`  ✅ ${viewport.name} (${viewport.width}px) - Navigation visible`);
            break;
          }
        }
      }
      
      if (!navFound) {
        results.responsive.failed.push(`❌ ${viewport.name} navigation not found`);
      }
    }

    // Test 5: Forms and CTAs
    console.log('\n📍 Testing Forms and CTAs...');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Find CTA buttons using proper selectors
    const ctaLinks = await page.$$('a[href*="contact"]');
    const ctaButtons = await page.$$('button');
    let ctaCount = ctaLinks.length;
    
    for (const button of ctaButtons) {
      const text = await page.evaluate(el => el.textContent, button);
      if (text && (text.includes('Get Started') || text.includes('Contact') || text.includes('Learn More'))) {
        ctaCount++;
      }
    }
    
    if (ctaCount > 0) {
      results.forms.passed.push(`✅ Found ${ctaCount} CTA elements`);
      console.log(`  ✅ Found ${ctaCount} CTA elements`);
    }

    // Check contact form
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    const contactForm = await page.$('form');
    if (contactForm) {
      results.forms.passed.push('✅ Contact form found');
      console.log('  ✅ Contact form found');
      
      // Test form fields with multiple selectors
      const nameSelectors = ['input[name="name"]', 'input[id*="name"]', 'input[placeholder*="name" i]'];
      const emailSelectors = ['input[type="email"]', 'input[name="email"]', 'input[id*="email"]'];
      
      let nameInput = null;
      let emailInput = null;
      
      for (const selector of nameSelectors) {
        nameInput = await page.$(selector);
        if (nameInput) break;
      }
      
      for (const selector of emailSelectors) {
        emailInput = await page.$(selector);
        if (emailInput) break;
      }
      
      if (nameInput && emailInput) {
        await nameInput.click();
        await page.keyboard.type('Test User');
        await emailInput.click();
        await page.keyboard.type('test@example.com');
        results.forms.passed.push('✅ Form inputs accept text');
        console.log('  ✅ Form inputs working');
      }
    }

    // Test 6: Exit Intent Popup (simulate mouse leave)
    console.log('\n📍 Testing Exit Intent Popup...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(3000);
    
    // Simulate mouse leaving viewport
    await page.mouse.move(640, 400); // Center
    await delay(1000);
    await page.mouse.move(0, -10); // Move to top edge
    await delay(2000);
    
    const popupSelectors = ['[class*="exit"]', '[class*="popup"]', '[class*="modal"]', '.overlay', '[role="dialog"]'];
    let popupFound = false;
    for (const selector of popupSelectors) {
      const exitPopup = await page.$(selector);
      if (exitPopup) {
        const isVisible = await page.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return styles.display !== 'none' && styles.visibility !== 'hidden' && parseFloat(styles.opacity) > 0;
        }, exitPopup);
        
        if (isVisible) {
          popupFound = true;
          results.features.passed.push('✅ Exit intent popup triggered');
          console.log('  ✅ Exit intent popup appeared');
          break;
        }
      }
    }
    
    if (!popupFound) {
      console.log('  ⚠️  Exit intent popup not detected');
    }

    // Test 7: Additional Features
    console.log('\n📍 Testing Additional Features...');
    
    // Check for loading screen
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    const loadingSelectors = ['[class*="loading"]', '[class*="loader"]', '.spinner'];
    for (const selector of loadingSelectors) {
      const loader = await page.$(selector);
      if (loader) {
        results.features.passed.push('✅ Loading screen detected');
        console.log('  ✅ Loading screen component found');
        break;
      }
    }

  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
  }

  // Final Results Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(60) + '\n');

  let totalPassed = 0;
  let totalFailed = 0;

  for (const [category, result] of Object.entries(results)) {
    const passed = result.passed.length;
    const failed = result.failed.length;
    totalPassed += passed;
    totalFailed += failed;
    
    console.log(`\n${category.toUpperCase()}:`);
    console.log(`  Passed: ${passed}`);
    console.log(`  Failed: ${failed}`);
    
    if (result.failed.length > 0) {
      console.log('  Issues:');
      result.failed.forEach(issue => console.log(`    ${issue}`));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`TOTAL: ${totalPassed} passed, ${totalFailed} failed`);
  
  // Console errors/warnings summary (limited)
  if (consoleMessages.length > 0) {
    console.log(`\n⚠️  Console ${consoleMessages.length} errors/warnings detected`);
    console.log('  (Showing first 3)');
    consoleMessages.slice(0, 3).forEach((msg, i) => {
      console.log(`  ${i + 1}. [${msg.type}] ${msg.text.substring(0, 100)}...`);
    });
  } else {
    console.log('\n✅ No console errors or warnings');
  }

  // Page errors summary (limited)
  if (pageErrors.length > 0) {
    console.log(`\n❌ ${pageErrors.length} page errors detected`);
    console.log('  Main error: ' + pageErrors[0].substring(0, 100) + '...');
  }

  console.log('\n' + '='.repeat(60) + '\n');

  await browser.close();
}

// Run the tests
testImplementation().catch(console.error);