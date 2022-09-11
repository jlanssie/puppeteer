const puppeteer = require('puppeteer');
const URL = require('url');
const fs = require('fs');

(async function main() {
  // Open Browser
  const browser = await puppeteer.launch({ headless: false, dumpio: false, env: { DISPLAY: ":10"} });
  const [page] = await browser.pages();
  page.setDefaultNavigationTimeout(0);
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({'Accept-Language': 'en-US'});
  await page.setViewport({ width: 1280, height: 800 });

  const version = await page.browser().version();
  console.log(version.toUpperCase() + '\n----');

  await page.goto('https://www.jeremylanssiers.com', { waitUntil: 'networkidle2' });
  await page.screenshot({path: 'screenshot.png', fullPage: true});

  try {
    await page.waitForSelector('input[type="text"]');
    await page.type('input[type="text"]', 'hello');
    await page.click('[type="submit"]');
  } catch (err) {
    console.log(err);
  }

  // Close browser
  await browser.close();
})()