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
  // console.log('seo score was', runnerResult.lhr);


  const options2 = {logLevel: 'info', output: 'html', onlyCategories: ['performance', 'seo', 'accessibility','best-practices'], port: chrome.port};
  const runnerResult2 = await lighthouse('https://apdesarrolloweb.com/', options2);

  // `.report` is the HTML report as a string
  const reportHtml2 = runnerResult2.report;
  fs.writeFileSync('lhreport2.html', reportHtml2);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult2.lhr.finalDisplayedUrl);
  console.log('Performance 2score was', runnerResult2.lhr.categories.performance.score * 100);
  console.log('acesibilidad 2score was', runnerResult2.lhr.categories.accessibility.score * 100);
  console.log('seo 2score was', runnerResult2.lhr.categories.seo.score * 100);
  // console.log('seo score was', runnerResult.lhr);

  await chrome.kill();
})();