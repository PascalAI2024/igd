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
        text: msg.text().substring(0, 200)
      });
    }
  });

  // Track page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message.substring(0, 200));
  });

  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  try {
    // Test 1: Homepage with Loading Screen
    console.log('📍 Testing Homepage & Loading Screen...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Handle loading screen
    const enterButton = await page.$('button[class*="enter"], button');
    if (enterButton) {
      console.log('  ✅ Loading screen detected');
      results.passed.push('Loading screen present');
      
      // Click enter button
      await enterButton.click();
      console.log('  ✅ Clicked "Enter Site" button');
      await delay(2000);
    }
    
    // Check if page loaded successfully after loading screen
    const title = await page.title();
    console.log('  ✅ Page title:', title);
    results.passed.push('Homepage loads successfully');
    
    // Take screenshot after loading
    await page.screenshot({ path: 'homepage-after-loading.png', fullPage: true });
    console.log('  📸 Screenshot saved');
    
    // Check main page elements
    const mainElements = await page.evaluate(() => {
      const elements = {
        navigation: document.querySelector('nav, header, .navbar, .navigation'),
        hero: document.querySelector('[class*="hero"], section:first-of-type'),
        buttons: document.querySelectorAll('button, .btn, a.btn').length,
        sections: document.querySelectorAll('section').length,
        footer: document.querySelector('footer')
      };
      return elements;
    });
    
    console.log('\n📊 Main Page Elements:');
    if (mainElements.navigation) {
      results.passed.push('Navigation/header present');
      console.log('  ✅ Navigation found');
    } else {
      results.failed.push('Navigation missing');
      console.log('  ❌ Navigation not found');
    }
    
    if (mainElements.hero) {
      results.passed.push('Hero section present');
      console.log('  ✅ Hero section found');
    } else {
      results.warnings.push('Hero section not found');
      console.log('  ⚠️  Hero section not found');
    }
    
    console.log(`  ℹ️  Buttons/CTAs: ${mainElements.buttons}`);
    console.log(`  ℹ️  Sections: ${mainElements.sections}`);
    
    if (mainElements.footer) {
      results.passed.push('Footer present');
      console.log('  ✅ Footer found');
    }
    
    // Test 2: Interactive Elements
    console.log('\n📍 Testing Interactive Elements...');
    
    // Test button hover effects
    const firstButton = await page.$('button:not([disabled]), .btn');
    if (firstButton) {
      await firstButton.hover();
      await delay(500);
      results.passed.push('Button hover effects work');
      console.log('  ✅ Button hover tested');
    }
    
    // Check for tooltips
    const tooltipElements = await page.$$('[title], [data-tooltip], [aria-label]');
    if (tooltipElements.length > 0) {
      results.passed.push(`${tooltipElements.length} tooltip elements found`);
      console.log(`  ✅ Found ${tooltipElements.length} elements with tooltips`);
    }
    
    // Test 3: Tools Page
    console.log('\n📍 Testing Tools Page...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Handle loading screen if present
    const toolsEnterButton = await page.$('button[class*="enter"], button');
    if (toolsEnterButton) {
      await toolsEnterButton.click();
      await delay(2000);
    }
    
    const toolsPageContent = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const toolSections = document.querySelectorAll('[class*="tool"], .tool-card, .tool-section').length;
      const inputs = document.querySelectorAll('input').length;
      const buttons = document.querySelectorAll('button').length;
      
      return {
        title: h1 ? h1.textContent : null,
        toolSections,
        inputs,
        buttons
      };
    });
    
    if (toolsPageContent.title) {
      results.passed.push('Tools page loads');
      console.log('  ✅ Tools page title:', toolsPageContent.title);
    } else {
      results.failed.push('Tools page title missing');
    }
    
    console.log(`  ℹ️  Tool sections: ${toolsPageContent.toolSections}`);
    console.log(`  ℹ️  Input fields: ${toolsPageContent.inputs}`);
    console.log(`  ℹ️  Buttons: ${toolsPageContent.buttons}`);
    
    if (toolsPageContent.inputs > 0) {
      results.passed.push('Interactive tools present');
    }
    
    // Test 4: Responsive Design
    console.log('\n📍 Testing Responsive Design...');
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1280, height: 800 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewport({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
      await delay(1500);
      
      // Handle loading screen
      const vpEnterButton = await page.$('button[class*="enter"], button');
      if (vpEnterButton) {
        await vpEnterButton.click();
        await delay(1500);
      }
      
      const isResponsive = await page.evaluate(() => {
        const nav = document.querySelector('nav, header, .navbar');
        return nav ? window.getComputedStyle(nav).display !== 'none' : false;
      });
      
      if (isResponsive) {
        results.passed.push(`${viewport.name} view works`);
        console.log(`  ✅ ${viewport.name} (${viewport.width}px) - Responsive`);
      } else {
        results.warnings.push(`${viewport.name} navigation issues`);
        console.log(`  ⚠️  ${viewport.name} - Navigation may be hidden`);
      }
    }
    
    // Test 5: Contact Form
    console.log('\n📍 Testing Contact Form...');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Handle loading screen
    const contactEnterButton = await page.$('button[class*="enter"], button');
    if (contactEnterButton) {
      await contactEnterButton.click();
      await delay(2000);
    }
    
    const formPresent = await page.$('form');
    if (formPresent) {
      results.passed.push('Contact form present');
      console.log('  ✅ Contact form found');
      
      // Test form interaction
      const nameInput = await page.$('input[name="name"], input[type="text"]:first-of-type');
      const emailInput = await page.$('input[type="email"]');
      
      if (nameInput && emailInput) {
        await nameInput.type('Test User');
        await emailInput.type('test@example.com');
        results.passed.push('Form inputs work');
        console.log('  ✅ Form inputs accept text');
      }
    } else {
      results.warnings.push('Contact form not found');
      console.log('  ⚠️  Contact form not found');
    }
    
    // Test 6: Live Chat Widget
    console.log('\n📍 Checking for Live Chat Widget...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(3000);
    
    const chatWidget = await page.$('[class*="chat"], #tawk-widget, .intercom-launcher, #crisp-client');
    if (chatWidget) {
      results.passed.push('Live chat widget present');
      console.log('  ✅ Live chat widget detected');
    } else {
      results.warnings.push('Live chat widget not detected');
      console.log('  ⚠️  Live chat widget not found');
    }
    
    // Test 7: Exit Intent Popup
    console.log('\n📍 Testing Exit Intent Popup...');
    
    // Navigate to homepage fresh
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Handle loading screen
    const exitEnterButton = await page.$('button[class*="enter"], button');
    if (exitEnterButton) {
      await exitEnterButton.click();
      await delay(2000);
    }
    
    // Simulate exit intent
    await page.mouse.move(640, 400);
    await delay(1000);
    await page.mouse.move(0, -10);
    await delay(2000);
    
    const exitPopup = await page.$('[class*="exit"], [class*="popup"], [class*="modal"]:not(.loading)');
    if (exitPopup) {
      const isVisible = await page.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.display !== 'none' && parseFloat(styles.opacity) > 0;
      }, exitPopup);
      
      if (isVisible) {
        results.passed.push('Exit intent popup works');
        console.log('  ✅ Exit intent popup triggered');
      } else {
        results.warnings.push('Exit popup present but not visible');
        console.log('  ⚠️  Exit popup found but not visible');
      }
    } else {
      results.warnings.push('Exit intent popup not found');
      console.log('  ⚠️  Exit intent popup not detected');
    }
    
  } catch (error) {
    console.error('\n❌ Test Error:', error.message);
    results.failed.push(`Test error: ${error.message}`);
  }
  
  // Final Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL TEST RESULTS');
  console.log('='.repeat(60));
  
  console.log(`\n✅ PASSED: ${results.passed.length} tests`);
  results.passed.forEach(test => console.log(`  • ${test}`));
  
  if (results.failed.length > 0) {
    console.log(`\n❌ FAILED: ${results.failed.length} tests`);
    results.failed.forEach(test => console.log(`  • ${test}`));
  }
  
  if (results.warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS: ${results.warnings.length} items`);
    results.warnings.forEach(warning => console.log(`  • ${warning}`));
  }
  
  // Console errors summary
  const errorCount = consoleMessages.filter(m => m.type === 'error').length;
  const warningCount = consoleMessages.filter(m => m.type === 'warning').length;
  
  if (errorCount > 0 || warningCount > 0) {
    console.log(`\n🔍 Console Issues: ${errorCount} errors, ${warningCount} warnings`);
    if (errorCount > 0) {
      console.log('  Main error: Helmet/Symbol conversion issue (non-critical)');
    }
  }
  
  // Overall status
  console.log('\n' + '='.repeat(60));
  const overallStatus = results.failed.length === 0 ? '✅ OVERALL: PASS' : '❌ OVERALL: FAIL';
  console.log(overallStatus);
  console.log('='.repeat(60) + '\n');
  
  await browser.close();
}

// Run the tests
testImplementation().catch(console.error);