var S = require("string");
var request = require("request");
var cheerio = require('cheerio');

/* Constructor */
function ArticleScraper(url, postSelector, titleSelector, descriptionSelector) {
  this.url = url;
  this.postSelector = postSelector;
  this.titleSelector = titleSelector;
  this.descriptionSelector = descriptionSelector;
  this.articles = [];

}

/* Helpers */
ArticleScraper.prototype.normalizeString = function (str) {
  if (str == null)
    return "";
  return S(str).stripTags().replace(/(\t|\n)/g, "").replace(/&#?.+?;/g,"").trim()
};


ArticleScraper.prototype.scrape = function (cb) {
  this.callback = cb;
  var self = this;
  request({
    uri: self.url,
    encoding: "utf8",
    gzip: true
  }, self.parse());
};


/* Parse the scraped results */
ArticleScraper.prototype.parse = function () {
  var self = this;
  return function (error, response, body) {
    var $ = cheerio.load(body);
    $(self.postSelector).each(function (i, el) {
      self.articles.push({
        title: self.normalizeString($(el).find(self.titleSelector).html()),
        url: $(el).find(self.titleSelector).attr("href"),
        description: self.normalizeString($(el).find(self.descriptionSelector).html()),
        source: self.source || "n/a"
      });
    });

    self.clean();
    self.callback(self.articles);
  }
};


/* Called after articles has been scraped and parsed. Used for cleaning up data*/
ArticleScraper.prototype.clean = function () {
};

module.exports = ArticleScraper;
