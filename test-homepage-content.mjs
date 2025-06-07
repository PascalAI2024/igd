import puppeteer from 'puppeteer';
import fs from 'fs';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testHomepageContent() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();

    // Capture console messages
    const consoleLogs = [];
    page.on('console', msg => {
      consoleLogs.push({
        type: msg.type(),
        text: msg.text()
      });
    });

    console.log('\n🏠 Loading Homepage...');
    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    await wait(3000);

    // Get page content
    const pageContent = await page.evaluate(() => {
      const body = document.body;
      
      return {
        title: document.title,
        url: window.location.href,
        bodyClasses: body.className,
        bodyText: body.innerText.substring(0, 500),
        mainContent: document.querySelector('main')?.innerText.substring(0, 500) || 'No main element',
        hasError: body.innerText.includes('error') || body.innerText.includes('Error'),
        errorMessage: document.querySelector('.text-red-500, [class*="error"]')?.innerText || null,
        sections: Array.from(document.querySelectorAll('section')).map(s => ({
          classes: s.className,
          childCount: s.children.length,
          text: s.innerText.substring(0, 100)
        })),
        scripts: Array.from(document.querySelectorAll('script')).map(s => s.src).filter(src => src),
        canvasCount: document.querySelectorAll('canvas').length,
        isReactApp: !!document.querySelector('#root') || !!document.querySelector('[data-reactroot]')
      };
    });

    // Take a screenshot
    await page.screenshot({ 
      path: 'homepage-screenshot.png',
      fullPage: true
    });

    // Test navigation
    const navTest = await page.evaluate(() => {
      const navLinks = document.querySelectorAll('nav a, header a');
      return {
        navCount: navLinks.length,
        navItems: Array.from(navLinks).map(link => ({
          text: link.innerText,
          href: link.href
        }))
      };
    });

    // Check React Router
    const routerCheck = await page.evaluate(() => {
      return {
        hasRouter: !!window.React || !!window.ReactDOM,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      };
    });

    // Generate report
    console.log('\n' + '='.repeat(60));
    console.log('HOMEPAGE CONTENT ANALYSIS');
    console.log('='.repeat(60));
    
    console.log('\n📄 PAGE DETAILS:');
    console.log(`Title: ${pageContent.title}`);
    console.log(`URL: ${pageContent.url}`);
    console.log(`Has Error: ${pageContent.hasError}`);
    if (pageContent.errorMessage) {
      console.log(`Error Message: ${pageContent.errorMessage}`);
    }
    
    console.log('\n📝 BODY CONTENT (first 500 chars):');
    console.log(pageContent.bodyText);
    
    console.log('\n🔗 NAVIGATION:');
    console.log(`Nav Links: ${navTest.navCount}`);
    navTest.navItems.forEach(item => {
      console.log(`  - ${item.text}: ${item.href}`);
    });
    
    console.log('\n📦 SECTIONS:');
    pageContent.sections.forEach((section, i) => {
      console.log(`Section ${i + 1}: ${section.childCount} children`);
      console.log(`  Classes: ${section.classes}`);
      console.log(`  Text: ${section.text.substring(0, 50)}...`);
    });
    
    console.log('\n🎯 TECHNICAL DETAILS:');
    console.log(`React App: ${pageContent.isReactApp}`);
    console.log(`Canvas Elements: ${pageContent.canvasCount}`);
    console.log(`Scripts Loaded: ${pageContent.scripts.length}`);
    
    console.log('\n💬 CONSOLE LOGS:');
    consoleLogs.forEach(log => {
      console.log(`[${log.type}] ${log.text}`);
    });

    console.log('\n📸 Screenshot saved to homepage-screenshot.png');

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      pageContent,
      navTest,
      routerCheck,
      consoleLogs
    };
    
    fs.writeFileSync('homepage-content-report.json', JSON.stringify(report, null, 2));
    console.log('📄 Detailed report saved to homepage-content-report.json');

  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testHomepageContent().catch(console.error);