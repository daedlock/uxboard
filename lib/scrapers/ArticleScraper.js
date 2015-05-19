var S = require("string");
var request = require("request");
var cheerio = require('cheerio');
var logger = require("../Logger.js");

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
    return S(str).stripTags().replace(/(\t|\n)/g, "").replace(/&#?.+?;/g, "").trim().s
};


ArticleScraper.prototype.scrape = function (cb) {
    this.callback = cb;
    var self = this;
    logger.info({scraper : this}, "Scraping")
    request({
        uri      : self.url,
        encoding : "utf8",
        gzip     : true
    }, self.parse());
};


/* Parse the scraped results */
ArticleScraper.prototype.parse = function () {
    var self = this;
    return function (error, response, body) {
        if (error) {
            logger.error({error : error}, "Error in ArticleScraper.parse");
        }
        global.$ = cheerio.load(body);
        try {
            $(self.postSelector).each(function (i, el) {
                self.articles.push({
                    title       : self.normalizeString($(el).find(self.titleSelector).html()),
                    url         : self.getUrlJQuerySelector(el),
                    description : self.normalizeString($(el).find(self.descriptionSelector).html()),
                    source      : self.source || "n/a"
                });
            });
        }
        catch (x) {
            logger.error({error : x, scraper : self}, "Error while parsing")
        }


        if (self.articles.length == 0) {
            logger.error({scraper : self}, "No articles were parsed")
        }
        self.clean();

        //TODO: Get article image here instead of main
        self.callback(self.articles);
    }
};


ArticleScraper.prototype.getUrlJQuerySelector = function (el) {
    try {
        return $(el).find(this.titleSelector).parent("[href]").attr("href") || $(el).find(this.titleSelector).attr("href");

    }
    catch (x) {
        logger.error({error : x, element : el}, "Error while parsing article URL");
        return "";
    }
}
/* Called after articles has been scraped and parsed. Used for cleaning up data*/
ArticleScraper.prototype.clean = function () {
};

module.exports = ArticleScraper;
