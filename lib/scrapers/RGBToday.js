var ArticleScraper = require("./ArticleScraper.js");

/*
 *  RGB.today
 */
function RGBTodayScraper() {
    this.source = "RGBToday";
    ArticleScraper.call(this, global.UXBoard.sources.rgbToday);
}
RGBTodayScraper.prototype = new ArticleScraper();

module.exports = RGBTodayScraper;

