import puppeteer from 'puppeteer';

async function verifyMobileFix() {
  console.log('🔍 Verifying mobile artifact fixes...\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport({
    width: 375,
    height: 667,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2
  });

  try {
    // Navigate to the live site
    console.log('📱 Loading mobile site...');
    await page.goto('https://ingeniousdigital.com/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait a bit for any animations
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check if loading screen is gone
    const loadingScreen = await page.$('.fixed.inset-0.bg-black.z-50');
    if (loadingScreen) {
      console.log('⚠️  Loading screen still visible after 5 seconds');
    } else {
      console.log('✅ Loading screen properly removed');
    }

    // Check for MobileCTASection
    const mobileCTA = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.className.includes('rounded-full') && 
            button.className.includes('w-14') && 
            button.className.includes('h-14')) {
          return true;
        }
      }
      return false;
    });
    
    console.log(`📱 Mobile CTA button: ${mobileCTA ? '✅ Found' : '❌ Not found'}`);

    // Check for overlapping fixed elements
    const fixedElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('.fixed');
      return Array.from(elements).map(el => ({
        className: el.className,
        position: {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        },
        visible: el.offsetWidth > 0 && el.offsetHeight > 0
      })).filter(el => el.visible);
    });

    console.log(`\n📊 Visible fixed elements: ${fixedElements.length}`);
    fixedElements.forEach((el, i) => {
      console.log(`  ${i + 1}. ${el.className.substring(0, 50)}...`);
    });

    // Test scrolling
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('\n✅ Mobile artifact verification complete!');
    
  } catch (error) {
    console.error('❌ Error during verification:', error.message);
  } finally {
    await browser.close();
  }
}

verifyMobileFix().catch(console.error);