var ArticleScraper = require("./ArticleScraper.js");
var S = require("string");


function SmashingMagazineScraper() {
    this.source = "SmashingMagazine";
    ArticleScraper.call(this, "http://smashingmagazine.com", "article.post", "h2 a[property]", "p");
};
SmashingMagazineScraper.prototype = new ArticleScraper();


/* Override clean method */
SmashingMagazineScraper.prototype.clean = function () {
    this.articles.forEach(function (article, idx) {
        article.title = article.title;
        article.description = S(article.description).unescapeHTML().stripTags().s;
    });
};

module.exports = SmashingMagazineScraper;
