var ArticleScraper = require("./ArticleScraper.js");

function BehanceScraper() {
    this.source = "Behance";
    ArticleScraper.call(this, "https://www.behance.net/search?field=132&content=projects&sort=appreciations&time=week", ".js-item", ".cover-name a", "dummy");
}


BehanceScraper.prototype = new ArticleScraper();



module.exports = BehanceScraper;
