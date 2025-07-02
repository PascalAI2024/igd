const puppeteer = require('puppeteer');

const pages = [
  // Main Pages
  { url: '/', name: 'Home' },
  { url: '/landing', name: 'Landing' },
  { url: '/about', name: 'About' },
  { url: '/contact', name: 'Contact' },
  { url: '/blog', name: 'Blog' },
  { url: '/case-studies', name: 'Case Studies' },
  
  // Solution Pages
  { url: '/solutions', name: 'Solutions Index' },
  { url: '/solutions/digital-growth', name: 'Digital Growth Solution' },
  { url: '/solutions/automation', name: 'Automation Solution' },
  { url: '/solutions/local-business', name: 'Local Business Solution' },
  { url: '/solutions/enterprise', name: 'Enterprise Solution' },
  
  // Service Index
  { url: '/services', name: 'Services Index' },
  
  // Service Pages
  { url: '/services/digital-marketing', name: 'Digital Marketing Service' },
  { url: '/services/lead-generation', name: 'Lead Generation Service' },
  { url: '/services/crm', name: 'CRM Service' },
  { url: '/services/communication', name: 'Communication Service' },
  { url: '/services/web-development', name: 'Web Development Service' },
  { url: '/services/photography', name: 'Photography Service' },
  { url: '/services/videography', name: 'Videography Service' },
  { url: '/services/ad-management', name: 'Ad Management Service' },
  { url: '/services/business-automation', name: 'Business Automation Service' },
  { url: '/services/ai-machine-learning', name: 'AI Machine Learning Service' },
  { url: '/services/system-integration', name: 'System Integration Service' },
  
  // Industry Index
  { url: '/industries', name: 'Industries Index' },
  
  // Industry Pages
  { url: '/industries/local-retail', name: 'Local Retail Industry' },
  { url: '/industries/retail', name: 'Retail Industry' },
  { url: '/industries/restaurants', name: 'Restaurants Industry' },
  { url: '/industries/local-services', name: 'Local Services Industry' },
  { url: '/industries/healthcare', name: 'Healthcare Industry' },
  { url: '/industries/auto-services', name: 'Auto Services Industry' },
  { url: '/industries/manufacturing', name: 'Manufacturing Industry' },
  
  // Location Pages
  { url: '/locations', name: 'Locations Index' },
  
  // Legal Pages
  { url: '/privacy', name: 'Privacy Policy' },
  { url: '/terms', name: 'Terms of Service' },
  { url: '/cookie', name: 'Cookie Policy' },
  { url: '/gdpr', name: 'GDPR' },
];

async function testPages() {
  const browser = await puppeteer.launch({ headless: true });
  const results = {
    successful: [],
    failures: [],
    warnings: []
  };

  for (const page of pages) {
    const pageInstance = await browser.newPage();
    const errors = [];
    const warnings = [];
    
    // Capture console errors and warnings
    pageInstance.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      } else if (msg.type() === 'warning') {
        warnings.push(msg.text());
      }
    });
    
    // Capture page errors
    pageInstance.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Capture failed requests
    pageInstance.on('requestfailed', request => {
      errors.push(`Failed request: ${request.url()} - ${request.failure().errorText}`);
    });
    
    try {
      console.log(`Testing ${page.name} (${page.url})...`);
      
      // Navigate with timeout
      const response = await pageInstance.goto(`http://localhost:3000${page.url}?skip_loading=true`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Check response status
      if (!response.ok()) {
        errors.push(`HTTP ${response.status()} ${response.statusText()}`);
      }
      
      // Wait a bit for any async errors
      await pageInstance.waitForTimeout(2000);
      
      // Get page title
      const title = await pageInstance.title();
      
      if (errors.length > 0) {
        results.failures.push({
          page: page.name,
          url: page.url,
          errors,
          warnings
        });
      } else if (warnings.length > 0) {
        results.warnings.push({
          page: page.name,
          url: page.url,
          warnings
        });
        results.successful.push({
          page: page.name,
          url: page.url,
          title
        });
      } else {
        results.successful.push({
          page: page.name,
          url: page.url,
          title
        });
      }
      
    } catch (error) {
      results.failures.push({
        page: page.name,
        url: page.url,
        errors: [error.message],
        warnings
      });
    }
    
    await pageInstance.close();
  }
  
  await browser.close();
  
  // Print results
  console.log('\n=== TEST RESULTS ===\n');
  
  console.log(`✅ Successful Pages (${results.successful.length}/${pages.length}):`);
  results.successful.forEach(r => {
    console.log(`  - ${r.page}: "${r.title}"`);
  });
  
  if (results.warnings.length > 0) {
    console.log(`\n⚠️ Pages with Warnings (${results.warnings.length}):`);
    results.warnings.forEach(r => {
      console.log(`  - ${r.page}:`);
      r.warnings.forEach(w => console.log(`    ⚠️ ${w}`));
    });
  }
  
  if (results.failures.length > 0) {
    console.log(`\n❌ Failed Pages (${results.failures.length}):`);
    results.failures.forEach(r => {
      console.log(`  - ${r.page}:`);
      r.errors.forEach(e => console.log(`    ❌ ${e}`));
      if (r.warnings.length > 0) {
        r.warnings.forEach(w => console.log(`    ⚠️ ${w}`));
      }
    });
  }
}

testPages().catch(console.error);