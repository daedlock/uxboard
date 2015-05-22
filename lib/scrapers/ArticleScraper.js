var S = require("string");
var request = require("request");
var cheerio = require('cheerio');
var logger = require("../Logger.js");

/* Constructor */
function ArticleScraper(source) {
    if (source) {
        this.source = source;
    }

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
        uri : self.source.url,
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
            $(self.source.articleSelector).each(function (i, el) {
                self.articles.push({
                    title       : self.normalizeString($(el).find(self.source.titleSelector).html()),
                    url         : self.getUrlJQuerySelector(el),
                    description : self.normalizeString($(el).find(self.source.descriptionSelector).html()),
                    source      : {
                        title : self.source.title,
                        url   : self.source.url
                    } || "n/a"
                });
            });
        }
        catch (x) {
            logger.error({error : x, scraper : self}, "Error while parsing")
        }


        if (self.articles.length == 0) {
            logger.error({scraper : self}, "No articles were parsed: Make sure the response is as expected.")
        }
        self.clean();

        //TODO: Get article image here instead of main
        self.callback(self.articles);
    }
};


ArticleScraper.prototype.getUrlJQuerySelector = function (el) {
    try {
        return $(el).find(this.source.titleSelector).parent("[href]").attr("href") || $(el).find(this.source.titleSelector).attr("href");

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
