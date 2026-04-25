import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

(async () => {
  const downloadPath = path.resolve('./');
  console.log('Downloading to:', downloadPath);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const client = await page.target().createCDPSession();
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });

  await page.goto('http://localhost:5173/');
  
  // Wait for the button
  await page.waitForSelector('::-p-text(Load Sample)');
  
  // Click Load Sample
  const loadBtn = await page.$('::-p-text(Load Sample)');
  await loadBtn.click();
  
  // Give it a second to render
  await new Promise(r => setTimeout(r, 1000));
  
  // Click Download PDF
  await page.waitForSelector('::-p-text(Download PDF)');
  const dlBtn = await page.$('::-p-text(Download PDF)');
  await dlBtn.click();
  
  // Wait for download
  await new Promise(r => setTimeout(r, 4000));
  
  await browser.close();
  console.log('Test completed. Files in directory:');
  console.log(fs.readdirSync(downloadPath).filter(f => f.endsWith('.pdf')));
})();
