const puppeteer = require('puppeteer');

async function runScraper() {
  console.log('Starting Vahan Scraper...');
  
  // Launch non-headless browser so user can interact with Captcha/Login
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();
  
  try {
    console.log('Navigating to Parivahan login page...');
    await page.goto('https://vahan.parivahan.gov.in/vahan/vahan/ui/login/login.xhtml', {
      waitUntil: 'networkidle2'
    });

    console.log('==================================================');
    console.log('PLEASE LOG IN MANUALLY IN THE BROWSER WINDOW.');
    console.log('Solve the Captcha and complete the mobile OTP login.');
    console.log('==================================================');

    // Wait for the user to successfully log in and land on the dashboard or search page
    // We detect this by checking if the URL changes or a specific element appears
    // For now, we just wait for a long time or until the user closes the browser
    
    await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute for demo
    
    console.log('Time up or manual intervention completed.');
    
  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
}

runScraper();
