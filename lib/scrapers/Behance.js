var ArticleScraper = require("./ArticleScraper.js");

function BehanceScraper() {
    this.source = "Behance";
    ArticleScraper.call(this, global.UXBoard.sources.behance);
}


BehanceScraper.prototype = new ArticleScraper();



module.exports = BehanceScraper;
