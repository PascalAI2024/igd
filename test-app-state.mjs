import puppeteer from 'puppeteer';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testAppState() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();

    // Enable detailed console logging
    page.on('console', msg => {
      console.log(`[${msg.type()}] ${msg.text()}`);
    });

    page.on('error', err => {
      console.error('Page error:', err);
    });

    page.on('pageerror', err => {
      console.error('Page error:', err);
    });

    console.log('\n🔍 Testing app loading state...');
    
    // Go to page with longer timeout
    await page.goto('https://ingeniousdigital.com', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait and check if loading completes
    console.log('\n⏳ Waiting for app to load...');
    
    for (let i = 0; i < 10; i++) {
      await wait(1000);
      
      const state = await page.evaluate((iteration) => {
        const loadingText = document.body.innerText;
        const hasLoadingAnimation = !!document.querySelector('.loading-sequence, [class*="loading"]');
        const hasMainContent = !!document.querySelector('.hero-section, .services, main > section');
        
        return {
          iteration: iteration,
          bodyText: loadingText.substring(0, 100),
          hasLoadingAnimation,
          hasMainContent,
          documentReady: document.readyState,
          reactRoot: !!document.querySelector('#root'),
          sections: document.querySelectorAll('section').length
        };
      }, i);
      
      console.log(`\nCheck ${i + 1}:`, JSON.stringify(state, null, 2));
      
      if (state.hasMainContent) {
        console.log('✅ Main content loaded!');
        break;
      }
    }

    // Try clicking skip button if present
    console.log('\n🔘 Checking for skip button...');
    const skipButton = await page.$('button:has-text("Skip"), button:contains("Skip"), .skip-button');
    if (skipButton) {
      console.log('Found skip button, clicking...');
      await skipButton.click();
      await wait(2000);
      
      const afterSkip = await page.evaluate(() => {
        return {
          url: window.location.href,
          bodyText: document.body.innerText.substring(0, 200),
          hasHero: !!document.querySelector('.hero-section, [class*="hero"]'),
          sections: document.querySelectorAll('section').length
        };
      });
      
      console.log('\nAfter skip:', JSON.stringify(afterSkip, null, 2));
    }

    // Try direct navigation to About page
    console.log('\n🔄 Testing direct navigation to /about...');
    await page.goto('https://ingeniousdigital.com/about', { waitUntil: 'networkidle0' });
    await wait(2000);
    
    const aboutPage = await page.evaluate(() => {
      return {
        url: window.location.href,
        title: document.title,
        hasContent: document.body.innerText.length > 100,
        bodyPreview: document.body.innerText.substring(0, 200)
      };
    });
    
    console.log('\nAbout page:', JSON.stringify(aboutPage, null, 2));

    // Check network requests
    console.log('\n🌐 Monitoring network requests...');
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure()
      });
    });

    await page.goto('https://ingeniousdigital.com', { waitUntil: 'networkidle0' });
    await wait(3000);
    
    if (failedRequests.length > 0) {
      console.log('\n❌ Failed requests:');
      failedRequests.forEach(req => {
        console.log(`  - ${req.method} ${req.url}: ${req.failure.errorText}`);
      });
    }

    // Check for JavaScript errors
    const jsErrors = await page.evaluate(() => {
      return window.__errors || [];
    });
    
    if (jsErrors.length > 0) {
      console.log('\n❌ JavaScript errors:', jsErrors);
    }

  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testAppState().catch(console.error);