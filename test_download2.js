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
  
  // Give it 2 seconds to render
  await new Promise(r => setTimeout(r, 2000));
  
  // Click Load Sample (assuming it's the second button on the page: first is maybe dark mode, second is Load Sample, third is Reset, 4th is DL PDF, 5th is DL DOCX)
  // Let's use evaluate to find by text
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const loadBtn = buttons.find(b => b.textContent && b.textContent.includes('Load Sample'));
    if (loadBtn) loadBtn.click();
  });
  
  // Give it 1 second to render the loaded data
  await new Promise(r => setTimeout(r, 1000));
  
  // Click Download PDF
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const dlBtn = buttons.find(b => b.textContent && b.textContent.includes('Download PDF'));
    if (dlBtn) dlBtn.click();
  });
  
  // Wait 4 seconds for download
  await new Promise(r => setTimeout(r, 4000));
  
  await browser.close();
  
  const files = fs.readdirSync(downloadPath).filter(f => f.endsWith('.pdf'));
  console.log('Test completed. PDF Files downloaded:', files);
})();
