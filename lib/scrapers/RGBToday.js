var ArticleScraper = require("./ArticleScraper.js");

/*
 *  RGB.today
 */
function RGBTodayScraper() {
  this.source = "RGBToday";
  ArticleScraper.call(this, "http://rgb.today", ".reddit-post", ".title", ".description");
}
RGBTodayScraper.prototype = new ArticleScraper();

module.exports = RGBTodayScraper;

