var bunyan = require('bunyan');
var logger = bunyan.createLogger({
  name: 'uxboard',
  streams: [
    {
      //TODO: Change to info in production
      level: 'debug',
      stream: process.stdout
    },
    {
      type: 'rotating-file',
      level:'debug',
      path: "log/debug.log",
      period: '1d',   // daily rotation
      count: 3
    },
    {
      type: 'rotating-file',
      path: 'log/error.log',
      period: '1d',   // daily rotation
      count: 3 ,       // keep 3 back copies,
      level: 'error'
    }
  ]
});

var Scraper = require('../lib/Scraper.js');
var Article = require('../models/article');
var MetaBot = require("../lib/MetaBot.js");

var metaBot = new MetaBot();
Scraper.allScrapers().forEach(function (_Scraper) {
  var s = new _Scraper();
  s.scrape(function (articles) {
    logger.debug({articles:articles},"Scraped articels");
    articles.forEach(function (article) {
      //TODO: Check for article existance thru URL
      logger.debug({article:article},"Parsing meta data for article");
      metaBot.parseArticleMeta(article, function (image) {
        if(image!=null){
          article.image = image;
          var a = new Article(article);
          a.save(function (err) {
            if (err)
              logger.error({error:err},"Mongo error while saving");
            else
              logger.debug({article:article},"Saved article in MongoDB");

          });
        }
      });
    });
  })
});



