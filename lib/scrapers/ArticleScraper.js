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
  return S(str).stripTags().replace(/(\t|\n)/g, "").replace(/&#?.+?;/g,"").trim().s
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
    global.$ = cheerio.load(body);
    $(self.postSelector).each(function (i, el) {
      self.articles.push({
        title: self.normalizeString($(el).find(self.titleSelector).html()),
        url: self.getUrlJQuerySelector(el),
        description: self.normalizeString($(el).find(self.descriptionSelector).html()),
        source: self.source || "n/a"
      });
    });

    self.clean();
    self.callback(self.articles);
  }
};


ArticleScraper.prototype.getUrlJQuerySelector = function (el) {
  try {
    return $(el).find(this.titleSelector).parent("[href]").attr("href") || $(el).find(this.titleSelector).attr("href");

  }
  catch(x){
    return "";
  }
}
/* Called after articles has been scraped and parsed. Used for cleaning up data*/
ArticleScraper.prototype.clean = function () {
};

module.exports = ArticleScraper;
