import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Set session storage to bypass loading screen
    await page.evaluateOnNewDocument(() => {
      sessionStorage.setItem('has_loaded_before', 'true');
    });
    
    // Go to the local preview server
    console.log('Testing navigation with loading screen bypassed...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for navigation to be visible
    await page.waitForSelector('nav', { timeout: 10000 });
    console.log('✓ Navigation loaded!');
    
    // Get all navigation links
    const navLinks = await page.evaluate(() => {
      const links = [];
      const navElement = document.querySelector('nav');
      if (navElement) {
        const allLinks = navElement.querySelectorAll('a');
        allLinks.forEach(link => {
          links.push({
            href: link.href,
            text: link.textContent.trim(),
            tagName: link.tagName
          });
        });
      }
      return links;
    });
    
    console.log(`\nFound ${navLinks.length} navigation links:`);
    navLinks.forEach(link => {
      console.log(`- ${link.text}: ${link.href} (${link.tagName})`);
    });
    
    // Test clicking Case Studies
    const caseStudiesLink = navLinks.find(link => link.text.includes('Case Studies'));
    if (caseStudiesLink) {
      console.log(`\n✓ Found Case Studies link, clicking...`);
      
      await page.click(`a[href="/case-studies"]`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newUrl = page.url();
      console.log(`After click, URL is: ${newUrl}`);
      
      if (newUrl.includes('/case-studies')) {
        console.log('✓ Navigation successful!');
        
        // Check page content
        const pageTitle = await page.title();
        const hasContent = await page.evaluate(() => {
          return document.querySelector('main')?.textContent?.includes('Case Studies');
        });
        
        console.log(`Page title: ${pageTitle}`);
        console.log(`Has Case Studies content: ${hasContent}`);
      } else {
        console.log('✗ Navigation failed!');
      }
    } else {
      console.log('\n✗ Case Studies link not found!');
    }
    
    // Test another link - About
    console.log('\nTesting About link...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await page.waitForSelector('nav');
    
    await page.click('a[href="/about"]');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aboutUrl = page.url();
    if (aboutUrl.includes('/about')) {
      console.log('✓ About navigation successful!');
    } else {
      console.log('✗ About navigation failed!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('\nTest complete. Browser will close in 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
  }
})();