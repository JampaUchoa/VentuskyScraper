const puppeteer = require('puppeteer');

var days = 365; // Ammount of days
var breaks = 4; // How many screenshots per day

var date = new Date();
date.setDate(date.getDate() - days); // Rewind the date

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 3000, height: 1280});

  for (var i = 0; i < days; i++) {

    for (var j = 0; j < breaks; j++) {
      var hour = j * Math.floor(24 / breaks);
      var dateFormat = ("" + date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()) + "/" + pad(hour)); // Format "YYYYMMDD/HH"
      await page.goto("https://www.ventusky.com/?p=19;18;1&l=temperature&t="+dateFormat+"&w=off", {waitUntil: 'networkidle2'});
      await page.evaluate("document.getElementById('x').style.display = 'none'"); // Removes searchbar
      var screenshotFile = date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "-" + pad(hour); // "YYYY-MM-DD-HH"
      await page.screenshot({path: "./screenshots/"+ screenshotFile +".png", clip: {x: 671, y: 0, width: 1600, height: 1080}});
      console.log("Got: "+ dateFormat);
    }
    date.setDate(date.getDate() + 1); // next day
  }

  await browser.close();
  console.log("Done");
})();

function pad(num){
  return ('0' + num).substr(-2);
}
