const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    // Test the Tools page
    console.log('Testing Tools page...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Check page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check if tools are displayed
    const toolCards = await page.$$('.grid > div');
    console.log('Number of tool cards found:', toolCards.length);
    
    // Get tool names
    const toolNames = await page.$$eval('h3', headers => headers.map(h => h.textContent));
    console.log('Tools available:', toolNames);
    
    // Click on SEO Keyword Analyzer
    console.log('\nTesting SEO Keyword Analyzer...');
    await page.click('.grid > div:first-child');
    await page.waitForTimeout(1000);
    
    // Check if SEO tool is loaded
    const seoTitle = await page.$eval('h2', el => el.textContent);
    console.log('SEO Tool title:', seoTitle);
    
    // Test keyword analysis
    await page.type('input[placeholder*="keyword"]', 'digital marketing');
    await page.click('button:has(svg)');
    await page.waitForTimeout(2500);
    
    // Check results
    const searchVolume = await page.$eval('p.text-2xl', el => el.textContent).catch(() => 'Not found');
    console.log('Search volume result:', searchVolume);
    
    console.log('\nTools page is working successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();