//TODO: Fix scraper because no meta image for its items
var ArticleScraper = require("./ArticleScraper.js");

function CSSWinnerScraper() {
    this.source = "CSSWinner";
    ArticleScraper.call(this, "http://www.csswinner.com", ".templateWinner.thecombo", ".WWrap h3 a", "dummy");
}


CSSWinnerScraper.prototype = new ArticleScraper();



module.exports = CSSWinnerScraper;
