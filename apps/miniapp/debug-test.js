import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Capture all logs and errors before navigation
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url()));
  
  // Add TMA mock
  await page.addInitScript(() => {
    window.Telegram = {
      WebApp: {
        ready: () => console.log('TMA: ready'),
        expand: () => console.log('TMA: expand'),
        BackButton: {
          show: () => console.log('TMA: BackButton.show'),
          hide: () => console.log('TMA: BackButton.hide'),
          onClick: (callback) => console.log('TMA: BackButton.onClick')
        },
        initDataUnsafe: {},
        version: '6.0'
      }
    }
  });
  
  console.log('Navigating to page...');
  await page.goto('http://127.0.0.1:5173/');
  
  console.log('Waiting for React to render...');
  // Wait a bit for React to render
  await page.waitForTimeout(5000);
  
  // Check what's in the root div
  const rootContent = await page.locator('#root').innerHTML();
  console.log('=== ROOT DIV CONTENT ===');
  console.log(rootContent);
  
  await browser.close();
})();