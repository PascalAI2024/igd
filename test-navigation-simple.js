import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Go to the local preview server
    console.log('Testing navigation on local build...');
    await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    // Wait a bit for React to render
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check for navigation links
    console.log('\nChecking navigation structure...');
    
    // Get all links in the navigation
    const navLinks = await page.evaluate(() => {
      const links = [];
      const navElement = document.querySelector('nav');
      if (navElement) {
        const allLinks = navElement.querySelectorAll('a');
        allLinks.forEach(link => {
          links.push({
            href: link.href,
            text: link.textContent.trim(),
            className: link.className
          });
        });
      }
      return links;
    });
    
    console.log(`\nFound ${navLinks.length} navigation links:`);
    navLinks.forEach(link => {
      console.log(`- ${link.text}: ${link.href}`);
    });
    
    // Try to find and click Case Studies link
    const caseStudiesLink = await page.evaluate(() => {
      const links = document.querySelectorAll('a');
      for (const link of links) {
        if (link.textContent.includes('Case Studies')) {
          return {
            found: true,
            href: link.href,
            tagName: link.tagName
          };
        }
      }
      return { found: false };
    });
    
    if (caseStudiesLink.found) {
      console.log(`\n✓ Found Case Studies link: ${caseStudiesLink.href} (${caseStudiesLink.tagName})`);
      
      // Click it
      await page.evaluate(() => {
        const links = document.querySelectorAll('a');
        for (const link of links) {
          if (link.textContent.includes('Case Studies')) {
            link.click();
            break;
          }
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newUrl = page.url();
      console.log(`After click, URL is: ${newUrl}`);
      
      if (newUrl.includes('/case-studies')) {
        console.log('✓ Navigation successful!');
      } else {
        console.log('✗ Navigation failed!');
      }
    } else {
      console.log('\n✗ Case Studies link not found!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();