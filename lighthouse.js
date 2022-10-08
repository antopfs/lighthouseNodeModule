const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance', 'seo', 'accessibility','best-practices'], port: chrome.port, device:'desktop'};
  const runnerResult = await lighthouse('https://apdesarrolloweb.com/', options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lhreport.html', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
  console.log('acesibilidad score was', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('seo score was', runnerResult.lhr.categories.seo.score * 100);
  // console.log('best score was', runnerResult.lhr.categories.best-practices.score * 100);
  console.log('seo score was', runnerResult.lhr);


 await chrome.kill();
})();