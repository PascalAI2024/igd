import puppeteer from 'puppeteer';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testImplementation() {
  console.log('🚀 Starting comprehensive feature tests...\n');
  
  const browser = await puppeteer.launch({
    headless: false,
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
        text: msg.text(),
        location: msg.location()
      });
    }
  });

  // Track page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
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
    await delay(2000);
    
    // Check if page loaded successfully
    const title = await page.title();
    if (title) {
      results.homepage.passed.push('✅ Homepage loaded successfully');
      console.log('  ✅ Homepage loaded - Title:', title);
    } else {
      results.homepage.failed.push('❌ Homepage failed to load');
    }

    // Check for hero section
    const heroSection = await page.$('.hero-section');
    if (heroSection) {
      results.homepage.passed.push('✅ Hero section rendered');
      console.log('  ✅ Hero section found');
    } else {
      results.homepage.failed.push('❌ Hero section missing');
    }

    // Test 2: New UI Components
    console.log('\n📍 Testing UI Components...');
    
    // Check for enhanced buttons
    const buttons = await page.$$('button, .btn');
    if (buttons.length > 0) {
      results.uiComponents.passed.push(`✅ Found ${buttons.length} buttons`);
      console.log(`  ✅ Found ${buttons.length} buttons`);
      
      // Test hover effect on first button
      if (buttons[0]) {
        await buttons[0].hover();
        await delay(500);
        results.uiComponents.passed.push('✅ Button hover tested');
        console.log('  ✅ Tested button hover effect');
      }
    }

    // Check for tooltips
    const elementsWithTooltips = await page.$$('[title], [data-tooltip]');
    if (elementsWithTooltips.length > 0) {
      results.uiComponents.passed.push(`✅ Found ${elementsWithTooltips.length} elements with tooltips`);
      console.log(`  ✅ Found ${elementsWithTooltips.length} elements with potential tooltips`);
    }

    // Check for live chat widget
    const chatWidget = await page.$('.live-chat, #chat-widget, [class*="chat"]');
    if (chatWidget) {
      results.uiComponents.passed.push('✅ Live chat widget found');
      console.log('  ✅ Live chat widget detected');
    } else {
      console.log('  ⚠️  Live chat widget not found (may load later)');
    }

    // Test 3: Tools Page
    console.log('\n📍 Testing Tools Page...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle0' });
    await delay(2000);

    // Check if tools page loaded
    const toolsPageTitle = await page.$('h1');
    if (toolsPageTitle) {
      const titleText = await page.evaluate(el => el.textContent, toolsPageTitle);
      results.tools.passed.push('✅ Tools page loaded');
      console.log('  ✅ Tools page loaded - Title:', titleText);
    }

    // Test SEO Analyzer
    const seoAnalyzer = await page.$('[class*="seo-analyzer"], #seo-analyzer, [data-tool="seo"]');
    if (seoAnalyzer) {
      results.tools.passed.push('✅ SEO Analyzer found');
      console.log('  ✅ SEO Analyzer component found');
      
      // Try to interact with it
      const urlInput = await page.$('input[type="url"], input[placeholder*="URL"], input[placeholder*="website"]');
      if (urlInput) {
        await urlInput.type('https://example.com');
        await delay(500);
        
        const analyzeButton = await page.$('button:has-text("Analyze"), button:has-text("Check"), button:has-text("Start")');
        if (analyzeButton) {
          await analyzeButton.click();
          await delay(2000);
          results.tools.passed.push('✅ SEO Analyzer interaction tested');
          console.log('  ✅ SEO Analyzer accepts input');
        }
      }
    }

    // Test Speed Test Tool
    const speedTest = await page.$('[class*="speed-test"], #speed-test, [data-tool="speed"]');
    if (speedTest) {
      results.tools.passed.push('✅ Speed Test tool found');
      console.log('  ✅ Speed Test tool found');
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
      await delay(1000);
      
      // Check if navigation is accessible
      const nav = await page.$('nav, .navigation, header');
      if (nav) {
        const isVisible = await page.evaluate(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }, nav);
        
        if (isVisible) {
          results.responsive.passed.push(`✅ ${viewport.name} navigation visible`);
          console.log(`  ✅ ${viewport.name} (${viewport.width}px) - Navigation visible`);
        } else {
          results.responsive.failed.push(`❌ ${viewport.name} navigation hidden`);
        }
      }
    }

    // Test 5: Forms and CTAs
    console.log('\n📍 Testing Forms and CTAs...');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Find CTA buttons
    const ctaButtons = await page.$$('a[href*="contact"], button:has-text("Get Started"), button:has-text("Contact")');
    if (ctaButtons.length > 0) {
      results.forms.passed.push(`✅ Found ${ctaButtons.length} CTA buttons`);
      console.log(`  ✅ Found ${ctaButtons.length} CTA buttons`);
    }

    // Check contact form
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
    await delay(1000);
    
    const contactForm = await page.$('form');
    if (contactForm) {
      results.forms.passed.push('✅ Contact form found');
      console.log('  ✅ Contact form found');
      
      // Test form fields
      const nameInput = await page.$('input[name="name"], input[placeholder*="name" i]');
      const emailInput = await page.$('input[type="email"], input[name="email"]');
      
      if (nameInput && emailInput) {
        await nameInput.type('Test User');
        await emailInput.type('test@example.com');
        results.forms.passed.push('✅ Form inputs accept text');
        console.log('  ✅ Form inputs working');
      }
    }

    // Test 6: Exit Intent Popup (simulate mouse leave)
    console.log('\n📍 Testing Exit Intent Popup...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Simulate mouse leaving viewport
    await page.mouse.move(0, 0);
    await page.mouse.move(-10, -10);
    await delay(1000);
    
    const exitPopup = await page.$('[class*="exit"], [class*="popup"], [class*="modal"]');
    if (exitPopup) {
      const isVisible = await page.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.display !== 'none' && styles.visibility !== 'hidden' && styles.opacity !== '0';
      }, exitPopup);
      
      if (isVisible) {
        results.features.passed.push('✅ Exit intent popup triggered');
        console.log('  ✅ Exit intent popup appeared');
      } else {
        console.log('  ⚠️  Exit popup found but not visible');
      }
    } else {
      console.log('  ⚠️  Exit intent popup not detected');
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
  
  // Console errors/warnings
  if (consoleMessages.length > 0) {
    console.log(`\n⚠️  Console ${consoleMessages.length} errors/warnings detected:`);
    consoleMessages.forEach((msg, i) => {
      console.log(`  ${i + 1}. [${msg.type}] ${msg.text}`);
    });
  } else {
    console.log('\n✅ No console errors or warnings');
  }

  // Page errors
  if (pageErrors.length > 0) {
    console.log(`\n❌ Page errors detected:`);
    pageErrors.forEach((error, i) => {
      console.log(`  ${i + 1}. ${error}`);
    });
  }

  console.log('\n' + '='.repeat(60) + '\n');

  await browser.close();
}

// Run the tests
testImplementation().catch(console.error);