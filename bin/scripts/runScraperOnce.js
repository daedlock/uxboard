var Scraper = require('../../lib/Scraper.js');
var logger = require("../../lib/Logger.js");
var async = require("async");
var Article = require('../../models/article');
var MetaBot = require("../../lib/MetaBot.js");

//Runs all scrapers
module.exports = function () {
    var metaBot = new MetaBot();

    //TODO: Use Async
    //Main scraping tasks, a task for each provider (dribbble,medium..etc)
    var tasks = [];

    Scraper.allScrapers().forEach(function (_Scraper) {
        var s = new _Scraper();

        //Each task represents a provider
        tasks.push(function (callback) {
            return s.scrape(function (articles) {
                //Asynchronous subtasks for fetching image meta data
                var subTasks = [];

                //logger.debug({articles : articles}, "Scraped articles");
                articles.forEach(function (article) {

                    //subtask for each article.
                    //Find in mongo, then query meta image
                    subTasks.push(function (_callback) {
                        return Article.findOne({url : article.url}, function (err, _article) {
                            if (err) logger.error({error : err}, "Mongo error while finding article");

                            //Article doesn't exist
                            if (!_article) {
                                logger.debug({article : article}, "Parsing meta data for article");

                                //Each task represents a meta scraping for an article
                                metaBot.parseArticleMeta(article, function (image) {

                                    //Drop it if we can't get an image for it
                                    if (image != null) {
                                        article.image = image;
                                        var a = new Article(article);


                                        //Article can be safely inserted now
                                        a.save(function (err) {
                                            if (err)
                                                logger.error({error : err}, "Mongo error while saving");
                                            else
                                                logger.debug({article : article}, "Saved article in MongoDB");

                                            _callback();
                                            return;
                                        });

                                    }
                                    else {
                                        _callback();
                                        return;
                                    }
                                });

                            }
                            else {
                                logger.debug({article : article}, "Article already exists in MongoDB. Skipping.");
                                _callback();
                                return;
                            }

                        });
                    });


                });

                async.series(subTasks, function () {
                    //All meta sub tasks have finished, we can now safely finish the parent task
                    callback();
                })
            });
        });

    });

    async.parallel(tasks, function (err, results) {
        //All scraping tasks have finished

        if (err) {
            console.log("err");
            throw err
        }
        logger.info("Finished");
        process.exit(0);
    });


}

