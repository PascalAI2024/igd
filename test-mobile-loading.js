import puppeteer from 'puppeteer';

async function testMobileLoading() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: {
      width: 375,  // iPhone size
      height: 812,
      isMobile: true,
      hasTouch: true
    }
  });
  
  const page = await browser.newPage();
  
  // Clear session storage to ensure loading screen shows
  await page.evaluateOnNewDocument(() => {
    sessionStorage.clear();
  });
  
  // Go to homepage which triggers loading
  await page.goto('http://localhost:3000/', { 
    waitUntil: 'networkidle0' 
  });
  
  // Wait a moment to see the loading screen
  await page.waitForTimeout(5000);
  
  await browser.close();
}

testMobileLoading().catch(console.error);