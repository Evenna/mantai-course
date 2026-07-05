const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless:'new', args:['--no-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({width:1600, height:900, deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:8127/index.html', {waitUntil:'networkidle0'});
  for (let n=1;n<=16;n++){
    await page.evaluate((i)=>window.show(i-1), n);
    await new Promise(r=>setTimeout(r, 800));
    await page.screenshot({path:`/root/mantai-course/ppt/shot-${String(n).padStart(2,'0')}.png`});
  }
  await browser.close();
  console.log('done 12');
})();
