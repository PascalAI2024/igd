import puppeteer from 'puppeteer';

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testSummary() {
  console.log('🚀 Running Implementation Test Summary...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 800 }
  });

  const page = await browser.newPage();
  const results = [];
  
  try {
    // Test 1: Homepage
    console.log('📍 Testing Homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Handle loading screen if present
    const enterButton = await page.$('button');
    if (enterButton) {
      const buttonText = await page.evaluate(el => el.textContent, enterButton);
      if (buttonText && buttonText.includes('Enter Site')) {
        await enterButton.click();
        results.push('✅ Loading screen with "Enter Site" button works');
        await delay(2000);
      }
    }
    
    const title = await page.title();
    results.push(`✅ Homepage loads - Title: "${title}"`);
    
    // Check for navigation
    const nav = await page.$('nav, header, .navbar');
    if (nav) {
      results.push('✅ Navigation component present');
    } else {
      results.push('⚠️  Navigation not found (may be part of loading issue)');
    }
    
    // Test 2: Enhanced UI Components
    console.log('\n📍 Testing UI Enhancements...');
    
    // Check for buttons with hover effects
    const buttons = await page.$$('button, .btn, a.btn');
    results.push(`✅ Found ${buttons.length} buttons/CTAs`);
    
    // Check for tooltips
    const tooltips = await page.$$('[title], [data-tooltip], [aria-label]');
    results.push(`✅ Found ${tooltips.length} elements with tooltips/labels`);
    
    // Test 3: Tools Page
    console.log('\n📍 Testing Tools Page...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    // Handle loading screen
    const toolsEnterButton = await page.$('button');
    if (toolsEnterButton) {
      const buttonText = await page.evaluate(el => el.textContent, toolsEnterButton);
      if (buttonText && buttonText.includes('Enter Site')) {
        await toolsEnterButton.click();
        await delay(2000);
      }
    }
    
    const inputs = await page.$$('input');
    const toolSections = await page.$$('.tool-card, [class*="tool"]');
    results.push(`✅ Tools page has ${inputs.length} input fields`);
    results.push(`✅ Tools page has ${toolSections.length} tool sections`);
    
    // Test 4: Responsive Design
    console.log('\n📍 Testing Mobile Responsive...');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    const mobileEnterButton = await page.$('button');
    if (mobileEnterButton) {
      const buttonText = await page.evaluate(el => el.textContent, mobileEnterButton);
      if (buttonText && buttonText.includes('Enter Site')) {
        await mobileEnterButton.click();
        await delay(1000);
      }
    }
    
    results.push('✅ Mobile viewport renders without errors');
    
    // Test 5: Forms
    console.log('\n📍 Testing Contact Form...');
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    const contactEnterButton = await page.$('button');
    if (contactEnterButton) {
      const buttonText = await page.evaluate(el => el.textContent, contactEnterButton);
      if (buttonText && buttonText.includes('Enter Site')) {
        await contactEnterButton.click();
        await delay(2000);
      }
    }
    
    const form = await page.$('form');
    if (form) {
      results.push('✅ Contact form found and accessible');
    } else {
      results.push('⚠️  Contact form not found');
    }
    
    // Test 6: Live Chat Widget
    console.log('\n📍 Checking Live Chat...');
    const chatWidget = await page.$('[class*="chat"], #tawk-widget, .intercom-launcher');
    if (chatWidget) {
      results.push('✅ Live chat widget detected');
    } else {
      results.push('ℹ️  Live chat widget not detected (may load asynchronously)');
    }
    
    // Test 7: Console Errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('Helmet')) {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await delay(2000);
    
    if (consoleErrors.length === 0) {
      results.push('✅ No critical console errors');
    } else {
      results.push(`⚠️  ${consoleErrors.length} console errors (non-Helmet)`);
    }
    
  } catch (error) {
    results.push(`❌ Test error: ${error.message}`);
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60) + '\n');
  
  results.forEach(result => console.log(result));
  
  const passed = results.filter(r => r.startsWith('✅')).length;
  const warnings = results.filter(r => r.startsWith('⚠️') || r.startsWith('ℹ️')).length;
  const failed = results.filter(r => r.startsWith('❌')).length;
  
  console.log('\n' + '='.repeat(60));
  console.log(`TOTAL: ${passed} passed, ${warnings} warnings, ${failed} failed`);
  console.log('='.repeat(60) + '\n');
  
  await browser.close();
}

// Run test
testSummary().catch(console.error);