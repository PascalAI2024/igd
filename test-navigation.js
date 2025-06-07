import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Go to the local preview server
  console.log('Testing navigation on local build...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  
  // Wait for navigation to load
  await page.waitForSelector('nav', { timeout: 5000 });
  
  // Test Case Studies link
  console.log('\nTesting Case Studies navigation...');
  const caseStudiesLink = await page.$('a[href="/case-studies"]');
  if (caseStudiesLink) {
    console.log('✓ Found Case Studies link');
    await caseStudiesLink.click();
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    if (currentUrl.includes('/case-studies')) {
      console.log('✓ Successfully navigated to Case Studies:', currentUrl);
    } else {
      console.log('✗ Navigation failed! Still on:', currentUrl);
    }
  } else {
    console.log('✗ Case Studies link not found!');
  }
  
  // Test About link
  console.log('\nTesting About navigation...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('nav', { timeout: 5000 });
  
  const aboutLink = await page.$('a[href="/about"]');
  if (aboutLink) {
    console.log('✓ Found About link');
    await aboutLink.click();
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    if (currentUrl.includes('/about')) {
      console.log('✓ Successfully navigated to About:', currentUrl);
    } else {
      console.log('✗ Navigation failed! Still on:', currentUrl);
    }
  } else {
    console.log('✗ About link not found!');
  }
  
  // Test Services dropdown
  console.log('\nTesting Services dropdown...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('nav', { timeout: 5000 });
  
  const servicesButton = await page.$('button:has-text("Services")');
  if (servicesButton) {
    console.log('✓ Found Services dropdown button');
    await servicesButton.click();
    await page.waitForTimeout(1000);
    
    // Try clicking a service link
    const digitalMarketingLink = await page.$('a[href="/services/digital-marketing"]');
    if (digitalMarketingLink) {
      console.log('✓ Found Digital Marketing link in dropdown');
      await digitalMarketingLink.click();
      await page.waitForTimeout(2000);
      
      const currentUrl = page.url();
      if (currentUrl.includes('/services/digital-marketing')) {
        console.log('✓ Successfully navigated to Digital Marketing:', currentUrl);
      } else {
        console.log('✗ Navigation failed! Still on:', currentUrl);
      }
    } else {
      console.log('✗ Digital Marketing link not found in dropdown!');
    }
  } else {
    console.log('✗ Services dropdown button not found!');
  }
  
  await browser.close();
})();