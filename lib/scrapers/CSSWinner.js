//TODO: Fix scraper because no meta image for its items
var ArticleScraper = require("./ArticleScraper.js");

function CSSWinnerScraper() {
    this.source = "CSSWinner";
    ArticleScraper.call(this, global.UXBoard.sources.cssWinner);
}


CSSWinnerScraper.prototype = new ArticleScraper();



module.exports = CSSWinnerScraper;
