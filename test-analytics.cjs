const puppeteer = require('puppeteer');

async function testAnalytics() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set up console log monitoring
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  // Monitor network requests
  const analyticsRequests = [];
  page.on('request', request => {
    const url = request.url();
    if (url.includes('google-analytics.com') || 
        url.includes('googletagmanager.com') || 
        url.includes('analytics.google.com') ||
        url.includes('gtag')) {
      analyticsRequests.push({
        url: url,
        method: request.method(),
        headers: request.headers()
      });
    }
  });

  // Monitor JavaScript errors
  const jsErrors = [];
  page.on('pageerror', error => {
    jsErrors.push(error.toString());
  });

  try {
    console.log('🔍 Testing Analytics Implementation...\n');
    
    // Navigate to the development server
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait a bit for analytics to initialize
    await page.waitForTimeout(3000);
    
    // Check if gtag is defined
    const gtagExists = await page.evaluate(() => {
      return typeof window.gtag !== 'undefined';
    });
    
    // Check if dataLayer exists
    const dataLayerExists = await page.evaluate(() => {
      return typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer);
    });
    
    // Check localStorage for consent
    const consentStatus = await page.evaluate(() => {
      return localStorage.getItem('analytics-consent');
    });
    
    // Check if GA script is loaded
    const gaScriptLoaded = await page.evaluate(() => {
      const scripts = Array.from(document.scripts);
      return scripts.some(script => 
        script.src.includes('googletagmanager.com/gtag/js')
      );
    });
    
    // Get dataLayer contents
    const dataLayerContents = await page.evaluate(() => {
      if (window.dataLayer) {
        return window.dataLayer.slice(0, 10); // First 10 items
      }
      return null;
    });
    
    // Report findings
    console.log('✅ Analytics Check Results:');
    console.log('─'.repeat(50));
    console.log(`• gtag function exists: ${gtagExists ? '✓' : '✗'}`);
    console.log(`• dataLayer exists: ${dataLayerExists ? '✓' : '✗'}`);
    console.log(`• GA script loaded: ${gaScriptLoaded ? '✓' : '✗'}`);
    console.log(`• User consent status: ${consentStatus || 'Not set'}`);
    console.log(`• Analytics requests captured: ${analyticsRequests.length}`);
    
    if (jsErrors.length > 0) {
      console.log(`\n⚠️  JavaScript Errors Found (${jsErrors.length}):`);
      jsErrors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (analyticsRequests.length > 0) {
      console.log('\n📊 Analytics Requests:');
      analyticsRequests.forEach((req, i) => {
        console.log(`  ${i + 1}. ${req.method} ${req.url.substring(0, 100)}...`);
      });
    }
    
    if (dataLayerContents && dataLayerContents.length > 0) {
      console.log('\n📦 DataLayer Contents (first 10 items):');
      dataLayerContents.forEach((item, i) => {
        console.log(`  ${i + 1}. ${JSON.stringify(item).substring(0, 100)}...`);
      });
    }
    
    // Test with consent accepted
    console.log('\n🔄 Testing with consent accepted...');
    await page.evaluate(() => {
      localStorage.setItem('analytics-consent', 'true');
    });
    
    // Reload the page
    await page.reload({ waitUntil: 'networkidle2' });
    await page.waitForTimeout(3000);
    
    // Check again after consent
    const requestsAfterConsent = analyticsRequests.length;
    console.log(`• Analytics requests after consent: ${requestsAfterConsent}`);
    
    // Check if tracking.js is loaded
    const trackingJsLoaded = await page.evaluate(() => {
      const scripts = Array.from(document.scripts);
      return scripts.some(script => 
        script.src.includes('/tracking.js')
      );
    });
    console.log(`• tracking.js loaded: ${trackingJsLoaded ? '✓' : '✗'}`);
    
  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testAnalytics().catch(console.error);