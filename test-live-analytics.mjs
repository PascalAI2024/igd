import puppeteer from 'puppeteer';

async function testLiveAnalytics() {
  console.log('🔍 Testing Live Site Analytics Implementation...\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Enable request interception
    await page.setRequestInterception(true);
    
    const analyticsRequests = [];
    const errors = [];
    
    // Monitor network requests
    page.on('request', request => {
      const url = request.url();
      
      // Continue all requests
      request.continue();
      
      // Track analytics requests
      if (url.includes('google-analytics.com') || 
          url.includes('googletagmanager.com') || 
          url.includes('analytics.google.com') ||
          url.includes('/collect') ||
          url.includes('gtag/js')) {
        analyticsRequests.push({
          url: url,
          method: request.method(),
          timestamp: new Date().toISOString()
        });
      }
    });
    
    // Monitor console logs
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Monitor JavaScript errors
    page.on('pageerror', error => {
      errors.push(`JS Error: ${error.toString()}`);
    });
    
    // Test 1: Initial page load without consent
    console.log('📋 Test 1: Initial page load (no consent)');
    await page.goto('https://ingeniousdigital.com', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await page.waitForTimeout(3000);
    
    const initialRequests = analyticsRequests.length;
    console.log(`  • Analytics requests before consent: ${initialRequests}`);
    
    // Check if consent banner appears
    const consentBannerVisible = await page.evaluate(() => {
      const banner = document.querySelector('[class*="cookie"], [class*="consent"]');
      return banner ? true : false;
    });
    console.log(`  • Consent banner visible: ${consentBannerVisible ? '✓' : '✗'}`);
    
    // Test 2: Accept consent and check if analytics initializes
    console.log('\n📋 Test 2: After accepting consent');
    
    // Try to click accept button
    try {
      await page.click('button:has-text("Accept All"), button:has-text("Accept"), button:has-text("OK")', { timeout: 5000 });
      console.log('  • Clicked consent accept button');
    } catch (e) {
      console.log('  • No consent button found or already accepted');
    }
    
    // Set consent in localStorage directly as backup
    await page.evaluate(() => {
      localStorage.setItem('analytics-consent', 'true');
    });
    
    // Reload to trigger analytics with consent
    await page.reload({ waitUntil: 'networkidle2' });
    await page.waitForTimeout(3000);
    
    const requestsAfterConsent = analyticsRequests.length;
    console.log(`  • Analytics requests after consent: ${requestsAfterConsent}`);
    console.log(`  • New requests after consent: ${requestsAfterConsent - initialRequests}`);
    
    // Check gtag and dataLayer
    const analyticsState = await page.evaluate(() => {
      return {
        gtagExists: typeof window.gtag !== 'undefined',
        dataLayerExists: typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer),
        dataLayerLength: window.dataLayer ? window.dataLayer.length : 0,
        gaScriptLoaded: Array.from(document.scripts).some(s => s.src.includes('googletagmanager.com')),
        consent: localStorage.getItem('analytics-consent')
      };
    });
    
    console.log('\n📊 Analytics State:');
    console.log(`  • gtag function exists: ${analyticsState.gtagExists ? '✓' : '✗'}`);
    console.log(`  • dataLayer exists: ${analyticsState.dataLayerExists ? '✓' : '✗'}`);
    console.log(`  • dataLayer entries: ${analyticsState.dataLayerLength}`);
    console.log(`  • GA script loaded: ${analyticsState.gaScriptLoaded ? '✓' : '✗'}`);
    console.log(`  • Consent status: ${analyticsState.consent}`);
    
    // Test 3: Navigate to another page
    console.log('\n📋 Test 3: Page navigation tracking');
    const requestsBeforeNav = analyticsRequests.length;
    
    await page.goto('https://ingeniousdigital.com/services/digital-marketing', {
      waitUntil: 'networkidle2'
    });
    await page.waitForTimeout(2000);
    
    const requestsAfterNav = analyticsRequests.length;
    console.log(`  • New requests after navigation: ${requestsAfterNav - requestsBeforeNav}`);
    
    // Display all analytics requests
    if (analyticsRequests.length > 0) {
      console.log('\n📈 All Analytics Requests:');
      analyticsRequests.forEach((req, i) => {
        console.log(`  ${i + 1}. [${req.method}] ${req.url.substring(0, 100)}...`);
      });
    } else {
      console.log('\n⚠️  No analytics requests detected!');
    }
    
    // Display errors if any
    if (errors.length > 0) {
      console.log('\n❌ Errors detected:');
      errors.forEach(err => console.log(`  • ${err}`));
    }
    
    // Final diagnosis
    console.log('\n🔍 Diagnosis:');
    if (analyticsRequests.length === 0) {
      console.log('  ⚠️  Analytics is NOT firing properly');
      console.log('  Possible issues:');
      console.log('  - Cookie consent blocking analytics');
      console.log('  - Analytics script not loading');
      console.log('  - JavaScript errors preventing initialization');
    } else if (requestsAfterConsent <= initialRequests) {
      console.log('  ⚠️  Analytics may not be respecting consent properly');
    } else {
      console.log('  ✅ Analytics appears to be working correctly');
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testLiveAnalytics().catch(console.error);