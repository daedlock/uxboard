//Logging
var logger = require("../lib/Logger.js");
var async = require("async");

var Scraper = require('../lib/Scraper.js');
var Article = require('../models/article');
var MetaBot = require("../lib/MetaBot.js");

var metaBot = new MetaBot();

//TODO: Use Async
async.eachSeries(Scraper.allScrapers(), function (_Scraper, callback) {
    var s = new _Scraper();
    s.scrape(function (articles) {
        logger.debug({articles : articles}, "Scraped articels");
        articles.forEach(function (article) {
            logger.debug({article : article}, "Parsing meta data for article");
            metaBot.parseArticleMeta(article, function (image) {
                if (image != null) {
                    article.image = image;
                    var a = new Article(article);

                    //Insert only if it doesn't exist
                    Article.findOne({url : article.url}, function (err, _article) {
                        if (err) logger.error({error : err}, "Mongo error while finding article");
                        if (!_article) {
                            //Article can be safely inserted now
                            a.save(function (err) {
                                if (err)
                                    logger.error({error : err}, "Mongo error while saving");
                                else
                                    logger.debug({article : article}, "Saved article in MongoDB");

                                callback();
                            });
                        }
                        else {
                            logger.debug({article : article}, "Article already exists in MongoDB, skipping save operation.")
                            callback();
                        }
                    })

                }
                else {
                    callback();
                }
            });
        });
    });
}, function () {
    logger.info("Finished!");
})



