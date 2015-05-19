//TODO: Fix scraper because no meta image for its items
var ArticleScraper = require("./ArticleScraper.js");

function MuzliScraper() {
    this.source = "Muzli";
    ArticleScraper.call(this, "http://muz.li/landing.html", "a.post", "h2", "p.postDescrip");
}


MuzliScraper.prototype = new ArticleScraper();



module.exports = MuzliScraper;
