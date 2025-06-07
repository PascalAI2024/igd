import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Enable console logging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    // Go to the local preview server
    console.log('Testing navigation on local build...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for React to render
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Get page content
    const pageContent = await page.evaluate(() => {
      return {
        title: document.title,
        hasNav: !!document.querySelector('nav'),
        navHTML: document.querySelector('nav')?.innerHTML || 'No nav found',
        allLinks: Array.from(document.querySelectorAll('a')).map(a => ({
          text: a.textContent.trim(),
          href: a.href,
          parent: a.parentElement?.tagName
        })),
        bodyClasses: document.body.className,
        rootHTML: document.getElementById('root')?.innerHTML?.substring(0, 500) || 'No root found'
      };
    });
    
    console.log('\nPage Analysis:');
    console.log('Title:', pageContent.title);
    console.log('Has Nav:', pageContent.hasNav);
    console.log('Body Classes:', pageContent.bodyClasses);
    console.log('\nAll Links Found:', pageContent.allLinks.length);
    pageContent.allLinks.forEach(link => {
      console.log(`- ${link.text} (${link.href}) in ${link.parent}`);
    });
    
    if (pageContent.hasNav) {
      console.log('\nNav HTML preview:');
      console.log(pageContent.navHTML.substring(0, 500));
    } else {
      console.log('\nRoot HTML preview:');
      console.log(pageContent.rootHTML);
    }
    
    // Check if loading screen is stuck
    const loadingElement = await page.$('.loading-container, .loading-sequence');
    if (loadingElement) {
      console.log('\n⚠️  Loading screen is still visible!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Keep browser open for manual inspection
    console.log('\nKeeping browser open for inspection. Close manually when done.');
    // await browser.close();
  }
})();