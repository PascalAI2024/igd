const puppeteer = require('puppeteer');

(async () => {
  console.log('Testing live navigation on ingeniousdigital.com...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, // Show browser for debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Go to homepage
    console.log('1. Loading homepage...');
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    
    // Test clicking Case Studies
    console.log('\n2. Testing Case Studies link...');
    try {
      // Try to find and click Case Studies link
      const caseStudiesLink = await page.$('a[href="/case-studies"]');
      if (caseStudiesLink) {
        console.log('   - Found Case Studies link');
        await caseStudiesLink.click();
        await page.waitForTimeout(2000);
        console.log('   - Current URL:', page.url());
        console.log('   - Did navigation work?', page.url().includes('case-studies'));
      } else {
        console.log('   - ERROR: Case Studies link not found!');
      }
    } catch (error) {
      console.log('   - ERROR clicking Case Studies:', error.message);
    }
    
    // Go back to homepage
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    
    // Test Services dropdown
    console.log('\n3. Testing Services dropdown...');
    try {
      // Look for Services button
      const servicesButton = await page.$('button:has-text("Services")');
      if (servicesButton) {
        console.log('   - Found Services button');
        await servicesButton.click();
        await page.waitForTimeout(1000);
        
        // Check if dropdown opened
        const dropdownVisible = await page.$('a[href="/services/web-development"]');
        console.log('   - Dropdown visible?', !!dropdownVisible);
        
        if (dropdownVisible) {
          await dropdownVisible.click();
          await page.waitForTimeout(2000);
          console.log('   - Clicked Web Development');
          console.log('   - Current URL:', page.url());
        }
      } else {
        console.log('   - ERROR: Services button not found!');
      }
    } catch (error) {
      console.log('   - ERROR with Services dropdown:', error.message);
    }
    
    // Test all main nav links
    console.log('\n4. Checking all navigation links...');
    const navLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav a'));
      return links.map(link => ({
        text: link.textContent,
        href: link.href,
        onclick: link.onclick ? 'has onclick' : 'no onclick'
      }));
    });
    
    console.log('   Found navigation links:');
    navLinks.forEach(link => {
      console.log(`   - ${link.text}: ${link.href} (${link.onclick})`);
    });
    
    // Check for NavigationButton components
    console.log('\n5. Checking for custom navigation components...');
    const hasNavigationButton = await page.evaluate(() => {
      return document.querySelector('[data-navigation-button]') !== null;
    });
    console.log('   - Has NavigationButton components?', hasNavigationButton);
    
    // Check console errors
    console.log('\n6. Console errors:');
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('   - ERROR:', msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
})();