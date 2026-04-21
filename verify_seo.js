const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Start the vite server
  const { exec } = require('child_process');
  const server = exec('npm run dev');

  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    await page.goto('http://localhost:8080/');
    const scripts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => JSON.parse(s.text));
    });
    console.log('LD+JSON count:', scripts.length);
    console.log(JSON.stringify(scripts, null, 2));

    // Check Home zigzag
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.screenshot({ path: 'home_verify.png', fullPage: false });

  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
    server.kill();
  }
})();
