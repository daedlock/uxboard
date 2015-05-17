var ArticleScraper = require("./ArticleScraper.js");

function DribbbleScraper() {
  this.source = "Dribbble";
  ArticleScraper.call(this, "https://dribbble.com", ".dribbble-shot", "strong", "span.comment");
}



DribbbleScraper.prototype = new ArticleScraper();

DribbbleScraper.prototype.clean = function () {
  ArticleScraper.call(this.clean,null);

  //Because dribbble href attributes are relative, we fix them after being parsed by the ArticleScraper
  this.articles.forEach(function (article) {
    article.url = "https://dribbble.com" + article.url;
  })
}



module.exports = DribbbleScraper;
