import puppeteer from 'puppeteer';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testBypassLoading() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();

    console.log('\n🔍 Attempting to bypass loading screen...');
    
    await page.goto('https://ingeniousdigital.com', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    await wait(2000);

    // Try multiple ways to find and click skip button
    console.log('\n🔘 Looking for skip button...');
    
    const skipMethods = [
      () => page.$('button'),
      () => page.$('.skip-button'),
      () => page.$('[class*="skip"]'),
      () => page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(btn => btn.innerText.toLowerCase().includes('skip'));
      })
    ];

    let skipButton = null;
    for (const method of skipMethods) {
      try {
        skipButton = await method();
        if (skipButton) {
          console.log('✅ Found skip button!');
          break;
        }
      } catch (e) {
        // Continue trying
      }
    }

    if (skipButton) {
      console.log('Clicking skip button...');
      await skipButton.click();
      await wait(3000);
      
      const afterSkip = await page.evaluate(() => {
        return {
          url: window.location.href,
          hasLoadingScreen: !!document.querySelector('.loading-sequence, [class*="loading"]'),
          hasMainContent: !!document.querySelector('main, .hero-section, .services'),
          bodyText: document.body.innerText.substring(0, 200)
        };
      });
      
      console.log('\nAfter skip:', afterSkip);
    }

    // Try programmatic navigation
    console.log('\n🔧 Trying programmatic skip...');
    
    const programmaticSkip = await page.evaluate(() => {
      // Check if there's a loading state manager
      const hasLoadingManager = !!window.loadingComplete || !!window.skipLoading;
      
      // Try to find React component
      const reactFiber = document.querySelector('#root')?._reactRootContainer;
      
      // Force loading complete
      if (window.localStorage) {
        localStorage.setItem('skipLoading', 'true');
        localStorage.setItem('hasSeenLoading', 'true');
      }
      
      // Dispatch custom events
      window.dispatchEvent(new Event('loadingComplete'));
      document.dispatchEvent(new Event('DOMContentLoaded'));
      
      return {
        hasLoadingManager,
        localStorageSet: !!window.localStorage,
        reactFound: !!reactFiber
      };
    });
    
    console.log('Programmatic skip result:', programmaticSkip);
    
    // Reload to see if localStorage helps
    console.log('\n🔄 Reloading page...');
    await page.reload({ waitUntil: 'networkidle0' });
    await wait(3000);
    
    const afterReload = await page.evaluate(() => {
      return {
        hasLoadingScreen: !!document.querySelector('.loading-sequence, [class*="loading"]'),
        hasMainContent: !!document.querySelector('main, .hero-section, .services'),
        sections: document.querySelectorAll('section').length,
        bodyPreview: document.body.innerText.substring(0, 200)
      };
    });
    
    console.log('\nAfter reload:', afterReload);

    // Check the app's routing
    console.log('\n🗺️ Checking React Router...');
    
    const routerInfo = await page.evaluate(() => {
      // Try to access React Router
      const scripts = Array.from(document.querySelectorAll('script')).map(s => s.src);
      const hasRouter = scripts.some(src => src.includes('react-router'));
      
      return {
        scripts: scripts.filter(s => s),
        hasRouter,
        pathname: window.location.pathname,
        routes: window.__reactRouterRoutes || 'Not accessible'
      };
    });
    
    console.log('\nRouter info:', routerInfo);

    // Try direct component manipulation
    console.log('\n🎯 Attempting direct navigation...');
    
    await page.evaluate(() => {
      // Try to find and click any skip elements
      const skipElements = document.querySelectorAll('button, [class*="skip"], [onclick*="skip"]');
      skipElements.forEach(el => {
        if (el.click) el.click();
      });
    });
    
    await wait(2000);
    
    // Final state check
    const finalState = await page.evaluate(() => {
      return {
        title: document.title,
        hasCanvas: document.querySelectorAll('canvas').length,
        buttons: document.querySelectorAll('button').length,
        sections: document.querySelectorAll('section').length,
        mainContent: !!document.querySelector('main'),
        bodyLength: document.body.innerText.length,
        isStillLoading: document.body.innerText.includes('Skip')
      };
    });
    
    console.log('\n📊 Final state:', finalState);
    
    // Take a screenshot
    await page.screenshot({ 
      path: 'loading-issue-screenshot.png',
      fullPage: true
    });
    console.log('\n📸 Screenshot saved to loading-issue-screenshot.png');

  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await browser.close();
  }
}

// Run the test
testBypassLoading().catch(console.error);