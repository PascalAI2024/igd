const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('Testing cursor visibility...');
  
  await page.goto('http://localhost:5173');
  
  // Check if cursor is visible by checking computed styles
  const cursorStyle = await page.evaluate(() => {
    return window.getComputedStyle(document.body).cursor;
  });
  
  console.log('Body cursor style:', cursorStyle);
  
  // Wait for loading to complete
  await page.waitForTimeout(4000);
  
  // Check cursor after loading
  const cursorAfterLoading = await page.evaluate(() => {
    return window.getComputedStyle(document.body).cursor;
  });
  
  console.log('Cursor after loading:', cursorAfterLoading);
  
  // Test hovering over interactive elements
  const buttonCursor = await page.evaluate(() => {
    const button = document.querySelector('button');
    if (button) {
      return window.getComputedStyle(button).cursor;
    }
    return 'No button found';
  });
  
  console.log('Button cursor style:', buttonCursor);
  
  await browser.close();
  
  if (cursorStyle === 'none' || cursorAfterLoading === 'none') {
    console.error('❌ CURSOR HIDDEN - Users cannot see their mouse!');
    process.exit(1);
  } else {
    console.log('✅ Cursor is visible');
  }
})();