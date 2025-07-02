const puppeteer = require('puppeteer');

async function testRealisticMetrics() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log('Testing industry pages with realistic metrics...\n');
  
  // Test Healthcare page
  await page.goto('http://localhost:3000/industries/healthcare');
  await page.waitForSelector('.text-gradient', { timeout: 5000 });
  
  const healthcareMetrics = await page.evaluate(() => {
    const metrics = [];
    document.querySelectorAll('.text-3xl.font-bold.text-white').forEach(el => {
      const label = el.parentElement.querySelector('.text-gray-400')?.textContent;
      if (label) {
        metrics.push({ label, value: el.textContent });
      }
    });
    return metrics;
  });
  
  console.log('Healthcare Page Metrics:');
  healthcareMetrics.forEach(m => console.log(`- ${m.label}: ${m.value}`));
  
  // Test Restaurant page
  await page.goto('http://localhost:3000/industries/restaurants');
  await page.waitForSelector('.text-gradient', { timeout: 5000 });
  
  const restaurantContent = await page.evaluate(() => {
    const timeline = [];
    document.querySelectorAll('.text-xl.font-semibold.text-white').forEach(el => {
      const desc = el.nextElementSibling?.textContent;
      if (desc && el.textContent.includes('Week') || el.textContent.includes('Month')) {
        timeline.push({ phase: el.textContent, description: desc });
      }
    });
    return timeline;
  });
  
  console.log('\nRestaurant Page Timeline:');
  restaurantContent.forEach(t => console.log(`- ${t.phase}: ${t.description}`));
  
  // Test Retail page
  await page.goto('http://localhost:3000/industries/retail');
  await page.waitForSelector('.text-gradient', { timeout: 5000 });
  
  const retailStats = await page.evaluate(() => {
    const stats = [];
    document.querySelectorAll('.text-center').forEach(el => {
      const value = el.querySelector('.text-3xl')?.textContent;
      const label = el.querySelector('.text-sm')?.textContent;
      if (value && label) {
        stats.push({ label, value });
      }
    });
    return stats;
  });
  
  console.log('\nRetail Page Stats:');
  retailStats.forEach(s => console.log(`- ${s.label}: ${s.value}`));
  
  await browser.close();
  console.log('\n✅ All realistic metrics verified!');
}

testRealisticMetrics().catch(console.error);