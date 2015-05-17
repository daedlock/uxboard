
//Logging
var logger = require("../lib/Logger.js");


var Scraper = require('../lib/Scraper.js');
var Article = require('../models/article');
var MetaBot = require("../lib/MetaBot.js");

var metaBot = new MetaBot();
Scraper.allScrapers().forEach(function (_Scraper) {
  var s = new _Scraper();
  s.scrape(function (articles) {
    logger.debug({articles: articles}, "Scraped articels");
    articles.forEach(function (article) {
      //TODO: Check for article existance thru URL
      logger.debug({article: article}, "Parsing meta data for article");
      metaBot.parseArticleMeta(article, function (image) {
        if (image != null) {
          article.image = image;
          var a = new Article(article);

          //Insert only if it doesn't exist
          Article.findOne({url: article.url}, function (err, _article) {

            if (err) logger.error({error: err}, "Mongo error while finding article");

            if (!_article) {
              //Article can be safely inserted now
              a.save(function (err) {
                if (err)
                  logger.error({error: err}, "Mongo error while saving");
                else
                  logger.debug({article: article}, "Saved article in MongoDB");
              });
            }
            else {
              logger.debug({article: article}, "Article already exists in MongoDB, skipping save operation.")
            }
          })

        }
      });
    });
  })
});



